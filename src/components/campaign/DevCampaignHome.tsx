/**
 * ponytail: frozen snapshot of dev.loupkids.com homepage (git 8f453bc). Keep when editing /.
 */
import Link from "next/link";
import { getHomepage, getPress } from "@/lib/content";
import { LOUPKIDS_NOTHING } from "@/lib/content/loupkids-site";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { DevCampaignComparisonSection } from "./DevCampaignComparisonSection";
import { DevCampaignCompanionSection } from "./DevCampaignCompanionSection";
import { DevCampaignStorySection } from "./DevCampaignStorySection";
import { DevCampaignUseCasesSection } from "./DevCampaignUseCasesSection";
import { ImageBox } from "./ImageBox";

const STATS = [
  { stat: "8 in 10", label: "parents hate feeling forced into the smartphone trap" },
  {
    stat: "−25%",
    label: "decline in traditional free play since smartphones went mainstream",
    tag: "The Vanishing Playground",
  },
  {
    stat: "5.5 hrs",
    label: "a day on entertainment screens for kids 8–12",
    tag: "The Play Gap",
  },
  { stat: "95%", label: 'of teens say they are "constantly" online' },
];

const DOESNT_DO = [
  "Social media",
  "Games",
  "Rabbit holes",
  "Scroll",
  "Stream",
  "Snap",
  "Like",
  "Doomscroll",
  "Notify",
  "Ping at 2am",
];

export async function DevCampaignHome() {
  const [copy, press] = await Promise.all([getHomepage(), getPress()]);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b-2 border-ink bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:py-20">
          <div className="relative z-10">
            <p className="label-mono mb-4 inline-block border-2 border-ink bg-white px-3 py-1">
              For kids 6–16 · zero screen time
            </p>
            <h1 className="display max-w-xl text-5xl text-ink sm:text-6xl lg:text-7xl">
              {copy.heroHeadline}
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">{copy.heroSubline}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/shop/loup" className="btn-sticker border-2 border-ink bg-ink px-8 py-4 text-xl text-white">
                {copy.heroCta}
              </Link>
              <Link href="/story" className="link-underline label-mono py-4 text-ink-soft">
                Why we built it →
              </Link>
            </div>
            <p className="label-mono mt-6 text-ink-soft">
              Free shipping · 30-day returns · 2-year kid-proof warranty
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[2rem] border-2 border-b-0 border-ink">
              <ImageBox className="absolute inset-0 h-full w-full" />
              <span className="label-mono absolute bottom-4 left-4 border-2 border-ink bg-white px-2 py-1">
                no screen. no problem.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b-2 border-ink bg-neutral-50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <h2 className="display mt-3 max-w-3xl text-4xl text-ink sm:text-5xl">
              The smartphone trap is real. Loup is the escape hatch.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((item, i) => (
              <Reveal key={item.stat} delay={i * 0.06}>
                <div className="h-full rounded-2xl border-2 border-ink bg-white p-6">
                  {item.tag && <p className="label-mono mb-2 text-ink-soft">{item.tag}</p>}
                  <p className="display text-4xl text-ink sm:text-5xl">{item.stat}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CHOCK FULL OF NOTHING */}
      <section className="border-b-2 border-ink bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <h2 className="display mt-3 max-w-4xl text-4xl text-ink sm:text-6xl lg:text-7xl">
              No social media. No games. No rabbit holes.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LOUPKIDS_NOTHING.items.map((item) => (
              <Reveal key={item.title}>
                <div className="h-full rounded-2xl border-2 border-ink bg-neutral-50 p-6">
                  <h3 className="display text-lg text-ink sm:text-xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            {DOESNT_DO.map((item, i) => (
              <Reveal key={item} delay={i * 0.04}>
                <span className="display text-2xl text-ink/80 line-through decoration-ink decoration-4 sm:text-3xl">
                  {item}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <DevCampaignCompanionSection />

      {/* MANIFESTO TICKER */}
      <div className="border-b-2 border-ink bg-ink py-3 text-white">
        <Marquee>
          {copy.manifestoLines.map((line) => (
            <span key={line} className="display mx-6 inline-flex items-center gap-6 text-2xl">
              {line} <span className="text-white/50">●</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* SHOP STRIP */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="display text-4xl text-ink sm:text-5xl">Anodized. Not disposable.</h2>
            </div>
            <Link href="/shop/loup" className="link-underline label-mono text-ink">
              Reserve Loup — $149 →
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 mx-auto max-w-sm">
          <Reveal>
            <Link
              href="/shop/loup"
              className="group block overflow-hidden rounded-2xl border-2 border-ink bg-white transition-transform hover:-translate-y-1"
            >
              <ImageBox className="aspect-[4/5] w-full" />
              <div className="flex items-center justify-between border-t-2 border-ink px-5 py-3">
                <span className="display text-xl text-ink">Silver</span>
                <span className="label-mono text-ink-soft">$149 →</span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* PRESS */}
      <div className="border-y-2 border-ink bg-neutral-50 py-6">
        <Marquee fast>
          {press.map((mention) => (
            <span key={mention.outlet} className="mx-10 inline-flex items-baseline gap-3">
              <span className="display text-2xl text-ink">{mention.outlet}</span>
              <span className="max-w-xs truncate text-sm italic text-ink-soft">
                &ldquo;{mention.pullQuote}&rdquo;
              </span>
            </span>
          ))}
        </Marquee>
      </div>

      <DevCampaignStorySection />
      <DevCampaignUseCasesSection />
      <DevCampaignComparisonSection />

      {/* FINAL CTA */}
      <section className="relative overflow-hidden border-t-2 border-ink bg-ink py-24 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal>
            <p className="label-mono text-white/60">In the box</p>
            <h2 className="display mt-3 text-4xl sm:text-6xl lg:text-7xl">
              Get ready to start intentional connection.
            </h2>
            <p className="mt-5 max-w-md text-white/70">
              That&apos;s printed inside every box. It&apos;s also the whole business plan.
            </p>
            <div className="mt-8">
              <Link href="/shop/loup" className="btn-sticker border-2 border-white bg-white px-8 py-4 text-xl text-ink">
                Get LOUP — $149
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ImageBox className="mx-auto aspect-[9/10] w-full max-w-md rounded-2xl" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
