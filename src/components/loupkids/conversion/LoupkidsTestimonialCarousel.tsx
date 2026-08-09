"use client";

import { useEffect, useState } from "react";
import type { Testimonial } from "@/lib/content/types";
import { FALLBACK_TESTIMONIALS } from "@/lib/content/fallback";
import { FadeIn } from "../FadeIn";

export function LoupkidsTestimonialCarousel({
  headline = "What parents are saying",
  testimonials = FALLBACK_TESTIMONIALS.filter((t) => t.featured),
}: {
  headline?: string;
  testimonials?: Testimonial[];
}) {
  const quotes = testimonials.filter((t) => t.featured);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (quotes.length < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % quotes.length);
    }, 7000);
    return () => window.clearInterval(id);
  }, [quotes.length, paused]);

  const t = quotes[index] ?? quotes[0];

  return (
    <section className="lk-band bg-[var(--lk-bg)]">
      <FadeIn className="mx-auto max-w-3xl">
        <div
          className="lk-card text-center"
          // WCAG 2.2.2 — auto-rotating content must be pausable
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <h2 className="lk-display lk-h2">{headline}</h2>
          <div aria-live="polite" aria-atomic="true">
            <blockquote className="lk-display mt-8 text-xl leading-snug text-[var(--lk-ink)] sm:text-2xl">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <p className="lk-label mt-4 text-[var(--lk-accent-b)]">{t.attribution}</p>
          </div>
          {quotes.length > 1 ? (
            <div className="mt-6 flex justify-center gap-1">
              {quotes.map((q, i) => (
                <button
                  key={q.attribution}
                  type="button"
                  aria-label={`Show review ${i + 1} of ${quotes.length}`}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => setIndex(i)}
                  className="group grid h-11 w-11 cursor-pointer place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--lk-ink)]"
                >
                  <span
                    className={`h-1.5 w-6 rounded-full transition-colors ${
                      i === index
                        ? "bg-[var(--lk-accent)]"
                        : "bg-[var(--lk-line)] group-hover:bg-[var(--lk-muted)]"
                    }`}
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </FadeIn>
    </section>
  );
}
