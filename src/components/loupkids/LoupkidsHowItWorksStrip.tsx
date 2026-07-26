"use client";

import { HOME_HOW_IT_WORKS } from "@/lib/content/loupkids-home-arc";
import { FadeIn } from "./FadeIn";
import { RevealHeadline } from "./RevealHeadline";

/** Act 4A — 3-step mechanism strip */
export function LoupkidsHowItWorksStrip() {
  return (
    <section className="border-b border-[var(--lk-line)] bg-[#f3f0e8] px-[var(--lk-section-x)] py-16 sm:py-20">
      <div className="mx-auto max-w-[1100px]">
        <FadeIn>
          <p className="lk-label">How it works</p>
          <RevealHeadline as="h2" className="lk-display lk-h2 mt-3" instant>
            From parent app to first call.
          </RevealHeadline>
        </FadeIn>

        <ol className="mt-12 grid gap-8 sm:mt-14 sm:grid-cols-3 sm:gap-6 lg:gap-10">
          {HOME_HOW_IT_WORKS.map((step, i) => (
            <FadeIn key={step.step} delay={0.04 + i * 0.05} className="relative">
              {i < HOME_HOW_IT_WORKS.length - 1 ? (
                <span
                  className="absolute left-[2.25rem] top-4 hidden h-px w-[calc(100%-1rem)] bg-[var(--lk-line)] sm:block lg:left-[2.5rem]"
                  aria-hidden
                />
              ) : null}
              <span className="relative z-[1] inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--lk-ink)] text-sm font-medium text-white">
                {step.step}
              </span>
              <h3 className="lk-display mt-5 text-xl tracking-tight sm:text-2xl">{step.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--lk-muted)]">{step.body}</p>
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  );
}
