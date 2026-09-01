import type { Metadata } from "next";
import { LaunchCampaignHome } from "@/components/campaign/LaunchCampaignHome";
import { SITE } from "@/lib/site";
import "./launch.css";

export const metadata: Metadata = {
  title: "Launch — Their phone safe from day one",
  description:
    "Peace of mind for you, real connection for them. Pre-order Loup for $149 — voice-only, approved contacts, no feeds.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE.url}/launch` },
};

/** Campaign copy — bold color blocks + Atkinson. Not in prod nav. */
export default function LaunchPage() {
  return <LaunchCampaignHome />;
}
