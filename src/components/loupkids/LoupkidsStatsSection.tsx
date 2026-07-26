"use client";

import { HOME_TENSION } from "@/lib/content/loupkids-home-arc";
import { FadeIn } from "./FadeIn";
import { RevealHeadline } from "./RevealHeadline";

/** Act 2 — emotional tension + big-number proof (no stock photo) */
export function LoupkidsStatsSection() {
  return (
    <section className="lk-section-white border-b border-[var(--lk-line)] px-[var(--lk-section-x)] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[960px]">
        <FadeIn className="max-w-2xl">
          <RevealHeadline as="h2" className="lk-display lk-h2" instant>
            {HOME_TENSION.header}
          </RevealHeadline>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-[var(--lk-muted)] sm:text-lg">
            {HOME_TENSION.subhead}
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-10 border-t border-[var(--lk-line)] pt-10 sm:mt-14 sm:grid-cols-3 sm:gap-8 sm:pt-12">
          {HOME_TENSION.metrics.map((m, i) => (
            <FadeIn key={m.stat} delay={0.04 + i * 0.05}>
              <p className="lk-display text-[clamp(2.5rem,6vw,3.75rem)] leading-none tracking-tight">
                {m.stat}
              </p>
              <p className="mt-3 text-sm leading-snug text-[var(--lk-muted)] sm:text-[0.9375rem]">
                {m.label}
                {"citeHref" in m && m.citeHref ? (
                  <>
                    {" "}
                    <a
                      href={m.citeHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 hover:text-[var(--lk-ink)]"
                    >
                      {m.cite}
                    </a>
                  </>
                ) : null}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
