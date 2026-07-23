import type { Metadata } from "next";
import { LoupkidsPageHeader } from "@/components/loupkids/LoupkidsPageHeader";
import { LoupkidsSetupGuideInteractive } from "@/components/loupkids/LoupkidsSetupGuideInteractive";
import { LOUPKIDS_SETUP_STEPS } from "@/lib/content/loupkids-support";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Setup Guide",
  description: "Step-by-step Loup setup — Wi-Fi, contacts, quiet hours, and your first call.",
  alternates: { canonical: `${SITE.url}/setup` },
};

export default function SetupPage() {
  return (
    <div>
      <LoupkidsPageHeader
        eyebrow="Support / setup guide"
        title="Easy as 1, 2, 3"
        description="Pair Loup, add contacts, and let your kid call their people — box to first call in about ten minutes."
      />

      <section className="lk-section-white lk-page-body">
        <LoupkidsSetupGuideInteractive steps={[...LOUPKIDS_SETUP_STEPS]} />
      </section>
    </div>
  );
}
