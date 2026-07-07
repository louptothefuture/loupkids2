import type { Metadata } from "next";
import { DevConvertHome } from "@/components/campaign/DevConvertHome";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reserve Loup — $149 Pre-Order",
  description:
    "No feeds. No AI. No strangers. Pre-order Loup for $149 — $199 at launch. Ships Q4 2026. 30-day guarantee.",
  robots: { index: false },
  alternates: { canonical: `${SITE.url}/convert` },
};

export default DevConvertHome;
