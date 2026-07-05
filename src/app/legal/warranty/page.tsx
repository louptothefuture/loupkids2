import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Warranty & Returns",
  alternates: { canonical: `${SITE.url}/legal/warranty` },
};

export default function WarrantyPage() {
  return (
    <LegalLayout title="Warranty & Returns" updated="July 1, 2026">
      <h2 className="display text-2xl text-ink">30-day returns</h2>
      <p>
        Not right for your family? Return within 30 days for a full refund. We provide a prepaid
        return label — no restocking fee.
      </p>
      <h2 className="display mt-8 text-2xl text-ink">2-year kid-proof warranty</h2>
      <p>
        Every LOUP includes a 2-year warranty covering manufacturing defects and everyday kid
        accidents — drops, splashes, normal wear. If it breaks doing kid things, we replace it.
      </p>
      <h2 className="display mt-8 text-2xl text-ink">How to start a claim</h2>
      <p>
        Email {SITE.email} with your order number and a photo of the issue. Most claims resolve
        within 3 business days.
      </p>
    </LegalLayout>
  );
}
