/**
 * ponytail: homepage DTC arc + price/offer blockers.
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
const site = readFileSync(join(root, "src/lib/content/loupkids-site.ts"), "utf8");
const accordion = site.slice(site.indexOf("LOUPKIDS_ACCORDION"), site.indexOf("LOUPKIDS_NOTHING"));

const checks = [
  [/price:\s*129/, siteConfig, "SITE.price must be 129"],
  [/Order Loup — \$129/, conversion, "CTA must say Order Loup — $129"],
  [/First 500/, conversion, "First 500 offer missing"],
  [/Their first phone\. Safe from day one\./, arc, "Hero H1 missing from home arc"],
  [/Total security for you, real connection for them/, arc, "Hero subline missing"],
  [/You aren't alone in feeling frustrated/, arc, "Relevancy header missing"],
  [/Built for connection, not the scroll/, arc, "Story brief missing"],
  [/Everything you need\. Nothing you don't\./, arc, "Features headline missing"],
  [/App to Phone Pager/, accordion, "Accordion must say App to Phone Pager"],
  [/Emergency/, accordion, "Accordion must not include Emergency"],
  [/Designed kid-first/, arc, "Fun gallery missing"],
  [/LoupkidsStatsSection/, home, "Relevancy section missing"],
  [/LoupkidsFeaturePlay/, home, "Feature play missing"],
  [/LoupkidsFunGallery/, home, "Fun gallery component missing"],
  [/LoupkidsHowItWorksStrip/, home, "How-it-works missing"],
  [/LoupkidsLaunchOfferSection/, home, "Launch offer missing"],
  [/LoupkidsWhyNotJustSection/, faq, "Why Not Just must live on FAQ"],
  [/your child/, arc, "Home arc must not say your child"],
  [/Kids stay reachable/, conversion, "PDP value must say Kids"],
];

let failed = 0;
for (const [re, hay, msg] of checks) {
  const shouldMatch =
    !String(msg).includes("must be removed") &&
    !String(msg).includes("must not") &&
    !String(msg).includes("must leave");
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
console.log("DTC homepage arc checks passed");
