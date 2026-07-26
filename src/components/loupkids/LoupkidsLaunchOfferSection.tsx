"use client";

import { LOUPKIDS_CTA, LOUPKIDS_IN_THE_BOX, LOUPKIDS_PRICE } from "@/lib/content/loupkids-conversion";
import { HOME_LAUNCH } from "@/lib/content/loupkids-home-arc";
import { LoupkidsOrderCta } from "./conversion";
import { FadeIn } from "./FadeIn";
import { RevealHeadline } from "./RevealHeadline";

/** Act 5 — single launch offer card + in the box (no subscription table) */
export function LoupkidsLaunchOfferSection() {
  return (
    <section className="lk-section-white px-[var(--lk-section-x)] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[720px]">
        <FadeIn className="text-center">
          <RevealHeadline as="h2" className="lk-display lk-h2" instant>
            Pre-order Loup.
          </RevealHeadline>
          <p className="mt-3 text-[var(--lk-muted)]">
            The phone before the smartphone — launch pricing while it lasts.
          </p>
        </FadeIn>

        <FadeIn delay={0.06} className="mt-10 rounded-3xl border border-[var(--lk-line)] bg-[#fafafa] p-6 sm:mt-12 sm:p-10">
          <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1">
            <p className="lk-display text-3xl tracking-tight sm:text-4xl">{HOME_LAUNCH.priceHeader}</p>
            <span className="text-lg text-[var(--lk-muted)] line-through">{LOUPKIDS_PRICE.compareFormatted} MSRP</span>
            <span className="text-sm font-medium text-[var(--lk-ink)]">({LOUPKIDS_PRICE.saveLine})</span>
          </div>

          <p className="mt-5 rounded-xl bg-[var(--lk-ink)] px-4 py-3 text-center text-sm font-medium text-white sm:text-[0.9375rem]">
            {HOME_LAUNCH.bonusBanner}
          </p>

          <ul className="mt-6 space-y-2.5 text-[0.9375rem] text-[var(--lk-ink)]">
            {HOME_LAUNCH.bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span aria-hidden className="shrink-0">
                  ✓
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-[var(--lk-line)] pt-6">
            <p className="text-sm font-medium uppercase tracking-[0.1em] text-[var(--lk-muted)]">In the box</p>
            <ul className="mt-3 space-y-1.5 text-[0.9375rem] text-[var(--lk-muted)]">
              {LOUPKIDS_IN_THE_BOX.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex justify-center">
            <LoupkidsOrderCta
              variant="light"
              size="large"
              density="full"
              label={LOUPKIDS_CTA.primary}
              className="!max-w-none items-center"
            />
          </div>

          <div className="mt-6 space-y-2 text-center text-xs leading-relaxed text-[var(--lk-muted)] sm:text-sm">
            <p>{HOME_LAUNCH.shipLine}</p>
            <p>{HOME_LAUNCH.trialLine}</p>
            <p>{HOME_LAUNCH.e911}</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
