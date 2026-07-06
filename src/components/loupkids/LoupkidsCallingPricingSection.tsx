"use client";

import { LOUPKIDS_CALLING_PRICING } from "@/lib/content/loupkids-conversion";
import { FadeIn } from "./FadeIn";
import { RevealHeadline } from "./RevealHeadline";

export function LoupkidsCallingPricingSection() {
  const { eyebrow, title, tiers } = LOUPKIDS_CALLING_PRICING;

  return (
    <section className="lk-section-white lk-section border-t border-[var(--lk-line)]">
      <div className="lk-container">
        <FadeIn>
          <p className="lk-eyebrow mb-2">{eyebrow}</p>
          <RevealHeadline as="h2" className="lk-display lk-h2" instant>
            {title}
          </RevealHeadline>
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
      </div>
    </section>
  );
}
