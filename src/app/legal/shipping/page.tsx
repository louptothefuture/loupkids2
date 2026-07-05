import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shipping & Tax",
  alternates: { canonical: `${SITE.url}/legal/shipping` },
};

export default function ShippingPage() {
  return (
    <LegalLayout title="Shipping & Tax" updated="July 1, 2026">
      <h2 className="display text-2xl text-ink">Domestic shipping</h2>
      <p>
        Free standard shipping on all US orders — 3–5 business days. Expedited 2-day shipping
        available at checkout. We currently ship to the US and Canada.
      </p>
      <h2 className="display mt-8 text-2xl text-ink">International</h2>
      <p>
        Canadian orders may incur duties and taxes collected at delivery. Additional countries
        coming — join the waitlist to be notified.
      </p>
      <h2 className="display mt-8 text-2xl text-ink">Tax</h2>
      <p>
        Sales tax is calculated at checkout based on your shipping address. Subscription plans are
        taxed according to applicable telecommunications rules in your state or province.
      </p>
    </LegalLayout>
  );
}
