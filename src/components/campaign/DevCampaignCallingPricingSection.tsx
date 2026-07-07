import Link from "next/link";
import { LOUPKIDS_CALLING_PRICING } from "@/lib/content/loupkids-conversion";
import { Reveal } from "@/components/Reveal";

export function DevCampaignCallingPricingSection({ hideEyebrow = false }: { hideEyebrow?: boolean }) {
  const { eyebrow, title, intro, tiers, cta, helpLink } = LOUPKIDS_CALLING_PRICING;

  return (
    <section className="border-b-2 border-ink bg-white py-14 lg:py-18">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          {!hideEyebrow && <p className="label-mono text-ink-soft">{eyebrow}</p>}
          <h2 className={`display text-3xl text-ink sm:text-4xl ${hideEyebrow ? "" : "mt-2"}`}>{title}</h2>
          {intro && <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">{intro}</p>}
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {tiers.map((tier, i) => (
            <Reveal key={tier.label} delay={i * 0.05}>
              <div className="flex h-full flex-col rounded-2xl border-2 border-ink bg-neutral-50 p-5 sm:p-6">
                <p className="label-mono text-ink-soft">{tier.label}</p>
                <p className="display mt-3 text-3xl text-ink sm:text-4xl">{tier.price}</p>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">{tier.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href={cta.href}
            className="btn-sticker border-2 border-ink bg-ink px-6 py-3 text-base text-white"
          >
            {cta.label}
          </Link>
          <Link href={helpLink.href} className="link-underline label-mono text-ink-soft">
            {helpLink.label} →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
