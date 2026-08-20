/**
 * ponytail: contact intake must email, never fake-success; hi@ not hello@.
 * Run: node scripts/check-contact-email.mjs
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (p) => readFileSync(join(root, p), "utf8");

const files = {
  email: read("src/lib/email.ts"),
  contact: read("src/app/api/contact/route.ts"),
  form: read("src/components/ContactForm.tsx"),
  support: read("src/lib/content/loupkids-support.ts"),
  footer: read("src/lib/content/loupkids-support.ts"),
};

const checks = [
  [/formatContactEmail/, files.email, "formatContactEmail missing"],
  [/sendResendEmail/, files.contact, "contact route must send Resend"],
  [/console\.log\("\[contact\]"/, files.contact, "contact must not log-and-ok without sending"],
  [/SITE\.email/, files.form, "contact form error must use SITE.email"],
  [/hello@loupkids\.com/, files.form + files.support, "stale hello@loupkids.com"],
  [/label: "Waitlist"/, files.footer, "footer must not still say Waitlist"],
  [/href: "\/legal\/warranty"/, files.support, "warranty help must link /legal/warranty"],
  [/href: "\/legal\/shipping"/, files.support, "warranty help must link /legal/shipping"],
];

let failed = 0;
for (const [re, hay, msg] of checks) {
  const mustNot = msg.includes("must not") || msg.startsWith("stale");
  const hit = re.test(hay);
  if (mustNot ? hit : !hit) {
    console.error("FAIL:", msg);
    failed++;
  }
}

if (failed) {
  console.error(`${failed} check(s) failed`);
  process.exit(1);
}
console.log("Contact + support link checks passed");
