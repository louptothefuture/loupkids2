import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/loupkids/FadeIn";
import { LoupkidsImage } from "@/components/loupkids/LoupkidsImage";
import {
  RAISE,
  RAISE_ECONOMICS,
  RAISE_EMAIL,
  RAISE_MAILTO,
  RAISE_MARKET,
  RAISE_PROBLEM,
  RAISE_PRODUCT,
  RAISE_STATS,
  RAISE_TERMS,
  RAISE_TRACTION,
  RAISE_USE,
} from "@/lib/content/loupkids-raise";
import { LOUPKIDS_IMAGES } from "@/lib/content/loupkids-site";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Raise — $750K Pre-Seed",
  description:
    "Loup is raising a $750K pre-seed SAFE to manufacture the screenless kids phone and scale DTC. Real hardware. Live pre-orders.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE.url}/raise` },
};

function SectionLabel({ children }: { children: string }) {
  return <p className="lk-eyebrow">{children}</p>;
}

export default function RaisePage() {
  return (
    <article>
      <section className="relative bg-[var(--lk-bg)] text-[var(--lk-ink)]">
        <div className="mx-auto grid max-w-[1200px] items-center gap-8 px-[var(--lk-section-x)] py-12 sm:py-14 md:min-h-[min(78vh,760px)] md:grid-cols-2 md:gap-12 lg:gap-16 lg:py-20">
          <div>
            <SectionLabel>{RAISE.eyebrow}</SectionLabel>
            <h1 className="lk-display mt-3 text-[clamp(2.35rem,5vw,3.75rem)] leading-[1.05] tracking-tight">
              {RAISE.headline}
            </h1>
            <p className="mt-4 max-w-xl text-[0.975rem] leading-snug text-[var(--lk-muted)] sm:text-lg sm:leading-relaxed">
              {RAISE.subline}
            </p>
            <p className="mt-5 text-sm font-medium">{RAISE.proofLine}</p>
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
              {RAISE_TERMS.items.map((item) => (
                <div key={item.label}>
                  <dt className="text-xs uppercase tracking-[0.12em] text-[var(--lk-muted)]">{item.label}</dt>
                  <dd className="lk-display mt-1 text-lg">{item.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8">
              <a href={RAISE_MAILTO} className="lk-btn">
                {RAISE.cta}
              </a>
            </div>
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] shadow-[var(--lk-card-shadow)] sm:aspect-[5/6] md:aspect-auto md:min-h-[28rem] md:self-stretch">
            <LoupkidsImage
              src={LOUPKIDS_IMAGES.hero}
              alt="Hand holding Loup — hi."
              fill
              priority
              sizes="(max-width: 767px) 100vw, 50vw"
              className="object-cover object-[70%_38%] md:object-center"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--lk-line)] bg-[var(--lk-surface)] px-[var(--lk-section-x)] py-12 sm:py-14">
        <div className="mx-auto grid max-w-[1200px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {RAISE_STATS.map((item, i) => (
            <FadeIn key={item.stat} delay={i * 0.04} className="lk-card rounded-2xl p-6">
              <p className="lk-display text-2xl tracking-tight sm:text-3xl">{item.stat}</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--lk-muted)]">{item.label}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="bg-[var(--lk-bg)] px-[var(--lk-section-x)] py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px]">
          <FadeIn>
            <SectionLabel>{RAISE_PROBLEM.eyebrow}</SectionLabel>
            <h2 className="lk-display mt-3 max-w-3xl text-[clamp(1.85rem,4vw,2.75rem)] leading-[1.08]">
              {RAISE_PROBLEM.headline}
            </h2>
            <p className="lk-display mt-6 max-w-3xl text-[clamp(1.5rem,3vw,2.15rem)] leading-[1.1]">
              {RAISE_PROBLEM.opportunity}
            </p>
            <p className="mt-2 max-w-3xl text-sm text-[var(--lk-muted)]">{RAISE_PROBLEM.opportunityNote}</p>
            <p className="mt-5 max-w-3xl text-[0.975rem] leading-relaxed text-[var(--lk-ink)]/75 sm:text-base">
              {RAISE_PROBLEM.body}
            </p>
          </FadeIn>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <FadeIn className="lk-card rounded-2xl border border-[var(--lk-line)] p-6 md:rounded-3xl">
              <h3 className="lk-display text-xl">{RAISE_MARKET.left.title}</h3>
              <ul className="mt-4 space-y-2 text-[var(--lk-muted)]">
                {RAISE_MARKET.left.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </FadeIn>
            <FadeIn delay={0.05} className="lk-card-dark rounded-2xl p-6 text-white md:rounded-3xl">
              <h3 className="lk-display text-xl text-white">{RAISE_MARKET.right.title}</h3>
              <ul className="mt-4 space-y-2 text-white/75">
                {RAISE_MARKET.right.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="bg-[var(--lk-surface)] px-[var(--lk-section-x)] py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px]">
          <FadeIn>
            <SectionLabel>{RAISE_PRODUCT.eyebrow}</SectionLabel>
            <h2 className="lk-display mt-3 max-w-3xl text-[clamp(1.85rem,4vw,2.75rem)] leading-[1.08]">
              {RAISE_PRODUCT.headline}
            </h2>
          </FadeIn>
          <div className="mt-8 grid gap-8 border-t border-[var(--lk-line)] pt-8 sm:grid-cols-3">
            {RAISE_PRODUCT.features.map((feature, i) => (
              <FadeIn key={feature.title} delay={i * 0.04}>
                <h3 className="lk-display text-xl">{feature.title}</h3>
                <ul className="mt-3 space-y-1 text-sm leading-relaxed text-[var(--lk-muted)]">
                  {feature.lines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </FadeIn>
            ))}
          </div>
          <div className="mt-12 grid items-center gap-10 md:grid-cols-2 md:gap-14">
            <FadeIn>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] bg-[var(--lk-cream)] shadow-[var(--lk-card-shadow)]">
                <LoupkidsImage
                  src={LOUPKIDS_IMAGES.threeQuarter}
                  alt="Loup three-quarter product view"
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className="object-contain p-8"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.06}>
              <ol className="space-y-5">
                {RAISE_PRODUCT.steps.map((step) => (
                  <li key={step.step} className="flex gap-4">
                    <span className="lk-display shrink-0 text-sm text-[var(--lk-muted)]">{step.step}</span>
                    <div>
                      <p className="font-medium">{step.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--lk-muted)]">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-sm">
                <Link href="/about" className="underline underline-offset-4 hover:text-[var(--lk-ink)]">
                  Why we built this
                </Link>
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="bg-[var(--lk-bg)] px-[var(--lk-section-x)] py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px]">
          <FadeIn>
            <SectionLabel>{RAISE_TRACTION.eyebrow}</SectionLabel>
            <h2 className="lk-display mt-3 max-w-3xl text-[clamp(1.35rem,2.5vw,1.75rem)] leading-[1.08]">
              {RAISE_TRACTION.headline}
            </h2>
            <p className="mt-5 max-w-3xl text-[0.975rem] leading-relaxed text-[var(--lk-ink)]/75">
              {RAISE_TRACTION.body}
            </p>
          </FadeIn>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {RAISE_TRACTION.latest.map((item, i) => (
              <FadeIn key={item.label} delay={i * 0.04} className="lk-card rounded-2xl p-5">
                <p className="lk-display text-2xl">{item.stat}</p>
                <p className="mt-2 text-sm text-[var(--lk-muted)]">{item.label}</p>
              </FadeIn>
            ))}
          </div>
          <FadeIn className="mt-16">
            <h3 className="lk-display max-w-3xl text-[clamp(1.5rem,3vw,2rem)] leading-[1.08]">
              {RAISE_ECONOMICS.headline}
            </h3>
          </FadeIn>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {RAISE_ECONOMICS.cards.map((card, i) => (
              <FadeIn key={card.title} delay={i * 0.05} className="lk-card flex h-full flex-col rounded-2xl border border-[var(--lk-line)] p-6">
                <h3 className="lk-display text-xl">{card.title}</h3>
                <p className="lk-display mt-3 text-2xl">{card.price}</p>
                <p className="mt-1 text-sm text-[var(--lk-muted)]">{card.meta}</p>
                <p className="mt-4 text-sm leading-relaxed text-[var(--lk-muted)]">{card.body}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="lk-section-black px-[var(--lk-section-x)] py-16 text-center sm:py-24">
        <FadeIn className="mx-auto max-w-2xl">
          <SectionLabel>{RAISE_USE.eyebrow}</SectionLabel>
          <h2 className="lk-display mt-3 text-[clamp(1.5rem,4vw,2.5rem)] text-white">{RAISE_USE.headline}</h2>
          <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
            {RAISE_USE.splits.map((split) => (
              <div key={split.title} className="rounded-2xl border border-white/15 p-5">
                <p className="lk-display text-2xl text-white">{split.pct}</p>
                <p className="mt-2 font-medium text-white">{split.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{split.body}</p>
              </div>
            ))}
          </div>
          <p className="lk-display mt-12 text-white">
            {RAISE_TERMS.amount} {RAISE_TERMS.instrument}
          </p>
          <p className="mt-2 text-white/65">
            {RAISE_TERMS.cap} cap · {RAISE_TERMS.discount} discount
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={RAISE_MAILTO} className="lk-btn lk-btn-white">
              {RAISE.cta}
            </a>
            <Link
              href="/shop/loup"
              className="lk-btn border border-white/30 bg-transparent text-white hover:bg-white/10"
            >
              See the live product
            </Link>
          </div>
          <p className="mt-6 text-sm text-white/55">
            Full deck and{" "}
            <Link href="/raise/data" className="underline underline-offset-4 hover:text-white">
              data room
            </Link>{" "}
            available on request.
          </p>
          <p className="mt-3 text-sm text-white/55">
            <a href={RAISE_MAILTO} className="underline underline-offset-4 hover:text-white">
              {RAISE_EMAIL}
            </a>
          </p>
        </FadeIn>
      </section>
    </article>
  );
}
