"use client";

import Link from "next/link";
import { LOUPKIDS_CALLING_PRICING } from "@/lib/content/loupkids-conversion";
import { FadeIn } from "./FadeIn";

export function LoupkidsCallingPricingSection({
  compact = false,
}: {
  compact?: boolean;
}) {
  const { title, intro, tiers, cta, helpLink } = LOUPKIDS_CALLING_PRICING;

  return (
    <section
      className={`bg-[var(--lk-bg)] ${
        compact ? "px-[var(--lk-section-x)] py-16 sm:py-20 lg:py-24" : "lk-section-white lk-section"
      }`}
    >
      <div className={compact ? "mx-auto w-full max-w-[calc(1200px-2*var(--lk-section-x))]" : "lk-container"}>
        <FadeIn>
          <h2
            className={`lk-display leading-[1.08] ${
              compact
                ? "text-[clamp(1.5rem,3.5vw,2.15rem)]"
                : "lk-h2"
            }`}
          >
            {title}
          </h2>
          {intro ? (
            <p
              className={`mt-3 max-w-2xl text-[var(--lk-muted)] ${
                compact ? "text-sm leading-relaxed sm:text-[0.9375rem]" : "lk-prose-muted mt-5"
              }`}
            >
              {intro}
            </p>
          ) : null}
        </FadeIn>

        <div
          className={`grid gap-4 md:grid-cols-2 ${
            compact ? "mt-6 sm:mt-7 md:gap-6" : "mt-10 gap-6 sm:mt-12"
          }`}
        >
          {tiers.map((tier, i) => (
            <FadeIn key={tier.label} delay={i * 0.05}>
              <div
                className={`lk-card flex h-full flex-col ${
                  compact ? "p-6 sm:p-7" : "lk-card-pad"
                }`}
              >
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--lk-muted)]">
                  {tier.label}
                </p>
                <p
                  className={`lk-display mt-2 ${
                    compact ? "text-2xl sm:text-[1.75rem]" : "mt-4 text-3xl sm:text-4xl"
                  }`}
                >
                  {tier.price}
                </p>
                <p
                  className={`mt-3 text-[var(--lk-muted)] ${
                    compact ? "text-[0.8125rem] leading-snug" : "lk-prose-muted mt-4"
                  }`}
                >
                  {tier.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {!compact ? (
          <FadeIn delay={0.1} className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10">
            <Link
              href={cta.href}
              className="inline-flex border border-[var(--lk-ink)] bg-[var(--lk-ink)] px-8 py-3.5 text-sm font-medium uppercase tracking-wider text-white transition-opacity hover:opacity-90"
            >
              {cta.label}
            </Link>
            <Link
              href={helpLink.href}
              className="inline-flex min-h-6 items-center text-sm text-[var(--lk-muted)] underline underline-offset-4 hover:text-[var(--lk-ink)]"
            >
              {helpLink.label} →
            </Link>
          </FadeIn>
        ) : (
          <FadeIn delay={0.08} className="mt-5">
            <Link
              href={helpLink.href}
              className="inline-flex min-h-6 items-center text-sm text-[var(--lk-muted)] underline underline-offset-4 hover:text-[var(--lk-ink)]"
            >
              {helpLink.label} →
            </Link>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
