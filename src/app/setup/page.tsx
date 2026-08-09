import type { Metadata } from "next";
import { LoupkidsHowItWorksStrip } from "@/components/loupkids/LoupkidsHowItWorksStrip";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Box to first call — pair Wi-Fi and approve contacts in the parent app, then kids scroll and call on Loup.",
  alternates: { canonical: `${SITE.url}/setup` },
};

export default function SetupPage() {
  return (
    <div>
      <h1 className="sr-only">How It Works — Box to first call</h1>
      <LoupkidsHowItWorksStrip showSetupLink={false} />
    </div>
  );
}
