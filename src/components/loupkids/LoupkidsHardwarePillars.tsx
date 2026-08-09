"use client";

import { HOME_PILLARS } from "@/lib/content/loupkids-home-arc";
import { FadeIn } from "./FadeIn";
import { RevealHeadline } from "./RevealHeadline";

/** Act 4B — four tactile hardware pillars */
export function LoupkidsHardwarePillars() {
  return (
    <section className="lk-section-white border-b border-[var(--lk-line)] px-[var(--lk-section-x)] py-16 sm:py-20 lg:py-24">
      <div className="lk-container">
        <FadeIn>
          <p className="lk-label">Built for kids</p>
          <RevealHeadline as="h2" className="lk-display lk-h2 mt-3 max-w-xl" instant>
            Hardware that refuses the feed.
          </RevealHeadline>
        </FadeIn>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-[var(--lk-line-soft)] shadow-[var(--lk-card-shadow)] sm:mt-14 sm:grid-cols-2">
          {HOME_PILLARS.map((card, i) => (
            <FadeIn key={card.title} delay={0.03 + i * 0.04} className="bg-[var(--lk-surface)] p-7 sm:p-9">
              <h3 className="lk-display text-xl tracking-tight sm:text-2xl">{card.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--lk-muted)]">{card.body}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
