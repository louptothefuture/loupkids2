"use client";

import { LOUPKIDS_INTRO, LOUPKIDS_STATS } from "@/lib/content/loupkids-site";
import { FadeIn } from "./FadeIn";
import { RevealHeadline } from "./RevealHeadline";

export function LoupkidsStatsSection() {
  return (
    <section className="lk-section-white lk-section-content">
      <div className="lk-container">
        <FadeIn className="mx-auto max-w-xl text-center">
          <RevealHeadline as="h2" className="lk-display lk-h2" instant>
            {LOUPKIDS_INTRO.subhead}
          </RevealHeadline>
          <p className="lk-stat-figure mt-8">{LOUPKIDS_INTRO.figure}</p>
          <p className="lk-stat-text mt-4">{LOUPKIDS_INTRO.body}</p>
          <p className="lk-stat-tagline">{LOUPKIDS_INTRO.cta}</p>
        </FadeIn>

        <div className="mt-14 grid border border-[var(--lk-line)] sm:mt-16 sm:grid-cols-3">
          {LOUPKIDS_STATS.map((item, i) => (
            <FadeIn
              key={item.title}
              delay={0.08 + i * 0.05}
              className={`bg-white px-6 py-8 text-center sm:px-8 sm:py-10 ${
                i > 0 ? "border-t border-[var(--lk-line)] sm:border-t-0 sm:border-l" : ""
              }`}
            >
              <p className="lk-stat-figure-sm">{item.figure}</p>
              <p className="lk-label mt-5">{item.title}</p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--lk-muted)]">{item.text}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
