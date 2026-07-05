import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  alternates: { canonical: `${SITE.url}/legal/accessibility` },
};

export default function AccessibilityPage() {
  return (
    <LegalLayout title="Accessibility Statement" updated="July 1, 2026">
      <p>
        LOUP is committed to ensuring digital accessibility for people with disabilities. We
        continually improve the user experience for everyone and apply relevant accessibility
        standards.
      </p>
      <h2 className="display mt-8 text-2xl text-ink">Conformance</h2>
      <p>
        We aim to conform to WCAG 2.1 level AA for loupkids.com and the LOUP parent app. Known
        limitations are tracked and remediated on a prioritized basis.
      </p>
      <h2 className="display mt-8 text-2xl text-ink">Feedback</h2>
      <p>
        If you encounter accessibility barriers, contact us at{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a> with &quot;Accessibility&quot; in the
        subject line. We respond within 5 business days.
      </p>
    </LegalLayout>
  );
}
