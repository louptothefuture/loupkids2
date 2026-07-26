/**
 * ponytail: homepage arc + price/offer blockers.
 * Run: node scripts/check-audit-p0.mjs
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const conversion = readFileSync(join(root, "src/lib/content/loupkids-conversion.ts"), "utf8");
const siteConfig = readFileSync(join(root, "src/lib/site.ts"), "utf8");
const home = readFileSync(join(root, "src/components/loupkids/LoupkidsHomeClient.tsx"), "utf8");
const arc = readFileSync(join(root, "src/lib/content/loupkids-home-arc.ts"), "utf8");
const faq = readFileSync(join(root, "src/app/faq/page.tsx"), "utf8");

const checks = [
  [/price:\s*149/, siteConfig, "SITE.price must be 149"],
  [/Pre-order Loup — \$149/, conversion, "CTA must say Pre-order Loup — $149"],
  [/Their first phone\. Not their first feed\./, arc, "Hero H1 missing from home arc"],
  [/Parent-approved Wi-Fi calling for kids/, arc, "Hero subline missing"],
  [/You aren't alone in feeling frustrated/, arc, "Act 2 header missing"],
  [/We built a rolodex for the age of independence/, arc, "Manifesto line missing"],
  [/LoupkidsStatsSection/, home, "Act 2 stats missing"],
  [/LoupkidsManifestoSection/, home, "Act 3 manifesto missing"],
  [/LoupkidsHowItWorksStrip/, home, "Act 4 how-it-works missing"],
  [/LoupkidsHardwarePillars/, home, "Act 4 pillars missing"],
  [/LoupkidsLaunchOfferSection/, home, "Act 5 launch offer missing"],
  [/ObjectionStrip|LOUPKIDS_OBJECTIONS/, home, "Objection strip must be removed from homepage"],
  [/Join cellular waitlist|Need cellular later/, home, "Cellular waitlist must be removed from homepage"],
  [/LoupkidsCallingPricingSection/, home, "Subscription pricing table must leave homepage"],
  [/LoupkidsWhyNotJustSection/, faq, "Why Not Just must live on FAQ"],
  [/your child/, arc, "Home arc must not say your child"],
  [/Kids stay reachable/, conversion, "PDP value must say Kids (not Your kid)"],
  [/your kid/, conversion, "Conversion copy must not say your kid"],
];

let failed = 0;
for (const [re, hay, msg] of checks) {
  const shouldMatch = !String(msg).includes("must be removed") && !String(msg).includes("must not") && !String(msg).includes("must leave");
  const hit = re.test(hay);
  if (shouldMatch ? !hit : hit) {
    console.error("FAIL:", msg);
    failed++;
  }
}

if (failed) {
  console.error(`${failed} check(s) failed`);
  process.exit(1);
}
console.log("Homepage arc checks passed");
