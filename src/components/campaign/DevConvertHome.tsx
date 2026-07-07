import Link from "next/link";
import { LOUPKIDS_CTA, LOUPKIDS_GUARANTEE, LOUPKIDS_HERO_COPY, LOUPKIDS_STORY_SHORT } from "@/lib/content/loupkids-conversion";
import { LOUPKIDS_CONVERT, LOUPKIDS_CONVERT_ANTI } from "@/lib/content/loupkids-convert";
import { LOUPKIDS_ACCORDION, LOUPKIDS_PHONE, LOUPKIDS_STATS } from "@/lib/content/loupkids-site";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { DevCampaignAccordion } from "./DevCampaignAccordion";
import { DevCampaignComparisonSection } from "./DevCampaignComparisonSection";
import { DevCampaignUseCasesSection } from "./DevCampaignUseCasesSection";
import { DevConvertStickyCta } from "./DevConvertStickyCta";
import { ImageBox } from "./ImageBox";

function ConvertCta({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-start gap-3 ${className}`}>
      <Link
        href="/shop/loup"
        className="btn-sticker w-full border-2 border-ink bg-ink px-8 py-4 text-center text-lg text-white sm:w-auto sm:text-xl"
      >
        {LOUPKIDS_CONVERT.stickyCta}
      </Link>
      <p className="label-mono text-sm text-ink-soft">
        {LOUPKIDS_GUARANTEE.title} — {LOUPKIDS_GUARANTEE.body}
      </p>
    </div>
  );
}

/** DTC conversion LP — story → phone → compare → use cases → close */
export function DevConvertHome() {
  const c = LOUPKIDS_CONVERT;

  return (
    <>
      <section className="border-b-2 border-ink bg-white pb-8 pt-6 sm:pb-12 sm:pt-10">
        <div className="mx-auto grid max-w-5xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <h1 className="display text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
              {LOUPKIDS_HERO_COPY.headline}
            </h1>
            <p className="mt-4 text-lg text-ink-soft">{LOUPKIDS_HERO_COPY.subline}</p>
            <p className="mt-4 text-xl font-medium text-ink">{c.hero.priceLine}</p>
            <p className="label-mono mt-2 text-sm text-ink-soft">{c.hero.trustLine}</p>
            <div className="mt-8">
              <ConvertCta />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <ImageBox className="aspect-[4/5] w-full rounded-2xl border-2 border-ink" />
          </Reveal>
        </div>
      </section>

      <div className="border-b-2 border-ink bg-neutral-50 py-5">
        <Marquee fast>
          {LOUPKIDS_CONVERT_ANTI.map((line) => (
            <span key={line} className="display mx-8 inline-flex items-center gap-6 text-xl text-ink sm:text-2xl">
              {line}
              <span className="text-ink/30">●</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* Short story + stats */}
      <section className="border-b-2 border-ink bg-white py-14 lg:py-18">
        <div className="mx-auto grid max-w-5xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <h2 className="display text-3xl text-ink sm:text-4xl">{LOUPKIDS_STORY_SHORT.headline}</h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-soft">
              {LOUPKIDS_STORY_SHORT.paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
            <Link href={LOUPKIDS_STORY_SHORT.cta.href} className="link-underline label-mono mt-6 inline-block text-ink">
              {LOUPKIDS_STORY_SHORT.cta.label} →
            </Link>
          </Reveal>
          <div className="divide-y border-y-2 border-ink">
            {LOUPKIDS_STATS.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="grid gap-2 py-5 sm:grid-cols-[10.5rem_1fr] sm:items-start sm:gap-8 sm:py-6">
                  <p className="text-base font-medium leading-snug text-ink">{item.title}</p>
                  <p className="text-sm leading-relaxed text-ink-soft">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Phone before their first smartphone */}
      <section className="border-b-2 border-ink bg-ink py-14 text-white lg:py-18">
        <div className="mx-auto grid max-w-5xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
          <div>
            <Reveal>
              <h2 className="display text-3xl sm:text-4xl">{LOUPKIDS_PHONE.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-white/75">{LOUPKIDS_PHONE.subtitle}</p>
            </Reveal>
            <div className="mt-8">
              <DevCampaignAccordion items={LOUPKIDS_ACCORDION} dark />
            </div>
          </div>
          <Reveal delay={0.08} className="lg:sticky lg:top-28">
            <ImageBox className="aspect-[4/5] w-full rounded-2xl border-2 border-white/20" />
          </Reveal>
        </div>
      </section>

      <DevCampaignComparisonSection hideEyebrow />

      <DevCampaignUseCasesSection hideEyebrow />

      <section className="border-b-2 border-ink bg-ink py-16 text-white sm:py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <Reveal>
            <h2 className="display text-4xl sm:text-5xl">{c.close.headline}</h2>
            <p className="mt-4 text-lg text-white/75">{LOUPKIDS_HERO_COPY.priceLine}</p>
            <p className="mt-2 text-sm text-white/60">{c.close.sub}</p>
            <div className="mt-8 flex justify-center">
              <ConvertCta className="!items-center [&_a]:!border-white [&_a]:!bg-white [&_a]:!text-ink" />
            </div>
          </Reveal>
        </div>
      </section>

      <DevConvertStickyCta />
      <div className="h-24" aria-hidden="true" />
    </>
  );
}
