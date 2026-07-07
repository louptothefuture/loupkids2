import type { Metadata } from "next";
import { DevCampaignHome } from "@/components/campaign/DevCampaignHome";
import { SITE } from "@/lib/site";

/** Same page as dev.loupkids.com — preserved at /dev-home (git 8f453bc). */
export const metadata: Metadata = {
  title: "Loup | Phones for the Anti-Screen Age",
  description:
    "You aren't alone in being frustrated. Loup is the escape hatch — the phone before their first smartphone.",
  robots: { index: false },
  alternates: { canonical: `${SITE.url}/dev-home` },
};

export default DevCampaignHome;
