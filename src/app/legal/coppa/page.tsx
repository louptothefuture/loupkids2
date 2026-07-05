import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "COPPA Compliance",
  alternates: { canonical: `${SITE.url}/legal/coppa` },
};

export default function CoppaPage() {
  return (
    <LegalLayout title="COPPA Compliance" updated="July 1, 2026">
      <p>
        LOUP is intended for children under 13. We comply with the Children&apos;s Online Privacy
        Protection Act (COPPA) by collecting minimal data and requiring verifiable parental consent
        before activating a child&apos;s device.
      </p>
      <h2 className="display mt-8 text-2xl text-ink">Parental consent</h2>
      <p>
        A parent or legal guardian must create the account, approve contacts, and consent to data
        practices during device activation. Children cannot create standalone accounts.
      </p>
      <h2 className="display mt-8 text-2xl text-ink">Data we collect from children</h2>
      <p>
        Device identifiers, call metadata (who called whom, when — not call content beyond
        encrypted voice messages), and optional location if parents enable check-in. We do not
        collect browsing history, app usage, or social graph data — there are no apps or feeds.
      </p>
      <h2 className="display mt-8 text-2xl text-ink">Your rights</h2>
      <p>
        Parents may review, delete, or refuse further collection of a child&apos;s information by
        contacting {SITE.email}.
      </p>
    </LegalLayout>
  );
}
