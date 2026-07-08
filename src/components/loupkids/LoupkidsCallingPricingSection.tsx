"use client";

import Link from "next/link";
import { LOUPKIDS_CALLING_PRICING } from "@/lib/content/loupkids-conversion";
import { FadeIn } from "./FadeIn";
import { RevealHeadline } from "./RevealHeadline";

export function LoupkidsCallingPricingSection() {
  const { title, intro, tiers, cta, helpLink } = LOUPKIDS_CALLING_PRICING;

  return (
    <section className="lk-section-white lk-section border-t border-[var(--lk-line)]">
      <div className="lk-container">
        <FadeIn>
          <RevealHeadline as="h2" className="lk-display lk-h2" instant>
            {title}
          </RevealHeadline>
          {intro && <p className="lk-prose-muted mt-5 max-w-2xl">{intro}</p>}
        </FadeIn>

        <div className="mt-10 grid gap-4 sm:mt-12 md:grid-cols-2 md:gap-5">
          {tiers.map((tier, i) => (
            <FadeIn key={tier.label} delay={i * 0.05}>
              <div className="lk-card lk-card-pad flex h-full flex-col">
                <p className="lk-label">{tier.label}</p>
                <p className="lk-display mt-4 text-3xl sm:text-4xl">{tier.price}</p>
                <p className="lk-prose-muted mt-4">{tier.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.1} className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10">
          <Link
            href={cta.href}
            className="inline-flex border border-[var(--lk-ink)] bg-[var(--lk-ink)] px-8 py-3.5 text-sm font-medium uppercase tracking-wider text-white transition-opacity hover:opacity-90"
          >
            {cta.label}
          </Link>
          <Link
            href={helpLink.href}
            className="text-sm text-[var(--lk-muted)] underline underline-offset-4 hover:text-[var(--lk-ink)]"
          >
            {helpLink.label} →
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
