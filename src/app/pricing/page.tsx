import type { Metadata } from "next";
import Link from "next/link";
import { PRICING_TIERS } from "@/lib/content/architecture";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Loup device pricing — First 500 for $149 ($199 at launch). Loup↔Loup always free. First 500: 1 year unlimited calls to external contacts · then $10/mo.",
  alternates: { canonical: `${SITE.url}/pricing` },
};

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="sr-only">Pricing</h1>
      <p className="text-ink-soft">One device. One optional plan. No surprises.</p>

      <div className="mt-10 space-y-6">
        {PRICING_TIERS.map((tier) => (
          <div key={tier.name} className="card p-6">
            <h2 className="text-lg font-bold">{tier.name}</h2>
            <p className="display mt-1 text-3xl">{tier.price}</p>
            <p className="text-sm text-ink-soft">{tier.period}</p>
            <ul className="mt-4 space-y-2 text-sm text-ink-soft">
              {tier.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <Link
              href={tier.href}
              className="btn-sticker mt-6 inline-flex bg-ink px-5 py-2.5 text-white"
            >
              {tier.cta}
            </Link>
          </div>
        ))}
      </div>

      <p className="mt-10 text-sm text-ink-soft">
        Questions?{" "}
        <Link href="/faq" className="underline hover:text-ink">
          Read the FAQ
        </Link>{" "}
        or{" "}
        <Link href="/contact" className="underline hover:text-ink">
          contact us
        </Link>
        .
      </p>
    </div>
  );
}
