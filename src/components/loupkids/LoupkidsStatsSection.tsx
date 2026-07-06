"use client";

import { LOUPKIDS_INTRO, LOUPKIDS_STATS } from "@/lib/content/loupkids-site";
import { FadeIn } from "./FadeIn";
import { RevealHeadline } from "./RevealHeadline";

export function LoupkidsStatsSection() {
  return (
    <section className="lk-section-white lk-section">
      <div className="lk-container grid items-start gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
        <FadeIn>
          <RevealHeadline as="h2" className="lk-display lk-h2" instant>
            {LOUPKIDS_INTRO.subhead}
          </RevealHeadline>
          <p className="lk-prose mt-5 max-w-md leading-relaxed text-[var(--lk-ink)]">{LOUPKIDS_INTRO.body}</p>
          <p className="lk-stat-tagline mt-4">{LOUPKIDS_INTRO.cta}</p>
        </FadeIn>

        <div className="divide-y border-y border-[var(--lk-line)]">
          {LOUPKIDS_STATS.map((item, i) => (
            <FadeIn key={item.title} delay={0.06 + i * 0.04}>
              <div className="grid gap-2 py-5 sm:grid-cols-[10.5rem_1fr] sm:items-start sm:gap-8 sm:py-6">
                <p className="text-base font-medium leading-snug text-[var(--lk-ink)]">{item.title}</p>
                <p className="lk-prose-muted">{item.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
