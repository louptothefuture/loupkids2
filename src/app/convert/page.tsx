import type { Metadata } from "next";
import { DevConvertHome } from "@/components/campaign/DevConvertHome";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pre-order Loup — $129 Pre-Launch",
  description:
    "No feeds. No AI. No strangers. Pre-order Loup for $129 — $199 at launch. Ships within 60 days. 30-day guarantee.",
  robots: { index: false },
  alternates: { canonical: `${SITE.url}/convert` },
};

export default DevConvertHome;
