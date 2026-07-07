import Link from "next/link";
import { getPress } from "@/lib/content";
import { LOUPKIDS_CTA, LOUPKIDS_GUARANTEE, LOUPKIDS_HERO_COPY } from "@/lib/content/loupkids-conversion";
import { LOUPKIDS_CONVERT } from "@/lib/content/loupkids-convert";
import { LOUPKIDS_ACCORDION, LOUPKIDS_NOTHING, LOUPKIDS_PHONE } from "@/lib/content/loupkids-site";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { DevCampaignAccordion } from "./DevCampaignAccordion";
import { DevCampaignComparisonSection } from "./DevCampaignComparisonSection";
import { DevCampaignUseCasesSection } from "./DevCampaignUseCasesSection";
import { DevConvertStickyCta } from "./DevConvertStickyCta";
import { ImageBox } from "./ImageBox";

const STATS = [
  { stat: "8 in 10", label: "parents hate feeling forced into the smartphone trap" },
  { stat: "−25%", label: "decline in free play since smartphones went mainstream", tag: "The Vanishing Playground" },
  { stat: "5.5 hrs", label: "daily screen time for kids 8–12", tag: "The Play Gap" },
  { stat: "95%", label: 'of teens say they are "constantly" online' },
];

const PROOF = [
  { title: "Zero screen time", body: "E-Ink contacts — not a feed, not a game, not a rabbit hole." },
  { title: "Approved contacts only", body: "Hardware-enforced. No strangers. No spam. No robocalls." },
  { title: "No SIM required", body: "Wi-Fi at home and school. No surprise cellular bills." },
  { title: "Your data stays yours", body: "No ads. No profiling. Closed network you control." },
  { title: "Free kid-to-kid calls", body: "Loup-to-Loup unlimited — no monthly plan." },
] as const;

const DOESNT_DO = ["Social media", "Games", "Rabbit holes", "Scroll", "Algorithms", "Doomscroll"];

function ConvertCta({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-start gap-3 ${className}`}>
      <Link
        href="/shop/loup"
        className="btn-sticker w-full border-2 border-ink bg-ink px-8 py-4 text-center text-lg text-white sm:w-auto sm:text-xl"
      >
        {LOUPKIDS_CTA.primary}
      </Link>
      <p className="label-mono text-sm text-ink-soft">
        {LOUPKIDS_GUARANTEE.title} — {LOUPKIDS_GUARANTEE.body}
      </p>
    </div>
  );
}

/** DTC conversion LP — reordered for highest propensity to reserve */
export async function DevConvertHome() {
  const press = await getPress();
  const c = LOUPKIDS_CONVERT;

  return (
    <>
      <section className="border-b-2 border-ink bg-white pb-8 pt-6 sm:pb-12 sm:pt-10">
        <div className="mx-auto grid max-w-5xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <p className="label-mono text-ink-soft">{c.hero.eyebrow}</p>
            <h1 className="display mt-3 text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
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
          {press.map((m) => (
            <span key={m.outlet} className="mx-8 inline-flex items-baseline gap-2 text-ink">
              <span className="display text-lg">{m.outlet}</span>
              <span className="max-w-xs truncate text-sm italic text-ink-soft">&ldquo;{m.pullQuote}&rdquo;</span>
            </span>
          ))}
        </Marquee>
      </div>

      <section className="border-b-2 border-ink bg-white py-14 lg:py-18">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal>
            <p className="label-mono text-ink-soft">{c.stats.eyebrow}</p>
            <h2 className="display mt-2 text-3xl text-ink sm:text-4xl">{c.stats.headline}</h2>
            <p className="mt-3 max-w-2xl text-ink-soft">{c.stats.sub}</p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((item, i) => (
              <Reveal key={item.stat} delay={i * 0.05}>
                <div className="rounded-2xl border-2 border-ink bg-neutral-50 p-5">
                  {item.tag && <p className="label-mono mb-1 text-xs text-ink-soft">{item.tag}</p>}
                  <p className="display text-3xl text-ink sm:text-4xl">{item.stat}</p>
                  <p className="mt-2 text-sm text-ink-soft">{item.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-2 border-ink bg-neutral-50 py-14 lg:py-18">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal>
            <p className="label-mono text-ink-soft">{c.proof.eyebrow}</p>
            <h2 className="display mt-2 text-3xl text-ink sm:text-4xl">{c.proof.headline}</h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROOF.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.04}>
                <div className="h-full rounded-2xl border-2 border-ink bg-white p-5">
                  <h3 className="display text-lg text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15} className="mt-10 flex justify-center">
            <ConvertCta className="!items-center" />
          </Reveal>
        </div>
      </section>

      <DevCampaignComparisonSection />

      <section className="border-b-2 border-ink bg-ink py-14 text-white lg:py-18">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <Reveal>
            <p className="label-mono text-white/60">{c.how.eyebrow}</p>
            <h2 className="display mt-2 text-3xl sm:text-4xl">{c.how.headline}</h2>
            <p className="mt-3 text-white/75">{LOUPKIDS_PHONE.subtitle}</p>
          </Reveal>
          <div className="mt-8">
            <DevCampaignAccordion items={LOUPKIDS_ACCORDION} dark />
          </div>
        </div>
      </section>

      <section className="border-b-2 border-ink bg-white py-14 lg:py-18">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal>
            <p className="label-mono text-ink-soft">{c.nothing.eyebrow}</p>
            <h2 className="display mt-2 max-w-3xl text-3xl text-ink sm:text-5xl">{c.nothing.headline}</h2>
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {LOUPKIDS_NOTHING.items.slice(0, 5).map((item) => (
              <Reveal key={item.title}>
                <div className="rounded-2xl border-2 border-ink bg-neutral-50 p-4">
                  <h3 className="font-medium text-ink">{item.title}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            {DOESNT_DO.map((item) => (
              <span
                key={item}
                className="display text-lg text-ink/70 line-through decoration-ink decoration-2 sm:text-xl"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <DevCampaignUseCasesSection />

      <section className="bg-ink py-16 text-white sm:py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <Reveal>
            <p className="label-mono text-white/60">{c.close.eyebrow}</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">{c.close.headline}</h2>
            <p className="mt-4 text-lg text-white/75">{LOUPKIDS_HERO_COPY.priceLine}</p>
            <p className="mt-2 text-sm text-white/60">{c.close.sub}</p>
            <div className="mt-8 flex justify-center">
              <ConvertCta className="!items-center" />
            </div>
          </Reveal>
        </div>
      </section>

      <DevConvertStickyCta />
      <div className="h-20 sm:h-0" aria-hidden="true" />
    </>
  );
}
