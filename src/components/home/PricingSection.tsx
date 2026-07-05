import Link from "next/link";
import { PRICING_TIERS } from "@/lib/content/architecture";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/lib/site";

export function PricingSection() {
  return (
    <section id="pricing" className="bg-paper py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="label-mono text-steel">Pricing</p>
          <h2 className="display mt-3 text-4xl sm:text-5xl">Straightforward</h2>
          <p className="mt-4 max-w-xl text-ink-soft">
            Device + optional calling plan. No hidden fees.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {PRICING_TIERS.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.08}>
              <div
                className={`card flex h-full flex-col p-8 ${
                  tier.highlight ? "ring-1 ring-ink/15" : ""
                }`}
              >
                <p className="label-mono text-steel">{tier.name}</p>
                <p className="display mt-3 text-4xl">{tier.price}</p>
                <p className="mt-1 text-sm text-ink-soft">{tier.period}</p>
                <ul className="mt-6 flex-1 space-y-2.5 text-sm text-ink-soft">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-ink">·</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={tier.href}
                  className={`btn-sticker mt-8 inline-flex self-start px-6 py-2.5 ${
                    tier.highlight ? "bg-ink text-surface" : "bg-cream text-ink ring-1 ring-ink/10"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15}>
          <p className="mt-8 text-sm text-ink-soft">
            LOUP-to-LOUP calling is free forever. Real phone numbers are ${SITE.planPrice}/month —{" "}
            <Link href="/pricing" className="underline underline-offset-2 hover:text-ink">
              full details
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
