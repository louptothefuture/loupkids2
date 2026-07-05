import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  alternates: { canonical: `${SITE.url}/legal/terms` },
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" updated="July 1, 2026">
      <p>
        By purchasing or using LOUP, you agree to these terms. LOUP provides voice communication
        hardware and a parent-controlled calling service — not general-purpose internet access.
      </p>
      <h2 className="display mt-8 text-2xl text-ink">Use of the service</h2>
      <p>
        You are responsible for configuring approved contacts and household rules. LOUP is not a
        substitute for emergency services monitoring — 911 access is provided as designed but
        depends on network availability.
      </p>
      <h2 className="display mt-8 text-2xl text-ink">Purchases</h2>
      <p>
        Orders are processed through Shopify. Pricing, taxes, and shipping are shown at checkout.
        Subscription plans renew monthly until cancelled.
      </p>
    </LegalLayout>
  );
}
