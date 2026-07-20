"use client";

import { useEffect, useState } from "react";
import { FALLBACK_TESTIMONIALS } from "@/lib/content/fallback";
import { FadeIn } from "../FadeIn";

export function LoupkidsTestimonialCarousel() {
  const quotes = FALLBACK_TESTIMONIALS.filter((t) => t.featured);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (quotes.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % quotes.length);
    }, 7000);
    return () => window.clearInterval(id);
  }, [quotes.length]);

  const t = quotes[index] ?? quotes[0];

  return (
    <section className="border-y border-[var(--lk-line)] bg-white px-[var(--lk-section-x)] py-12 sm:py-14">
      <FadeIn className="lk-container mx-auto max-w-3xl text-center">
        <h2 className="lk-display lk-h2">What beta testers are saying</h2>
        <blockquote className="lk-display mt-8 text-xl leading-snug sm:text-2xl">
          &ldquo;{t.quote}&rdquo;
        </blockquote>
        <p className="lk-label mt-4">{t.attribution}</p>
        {quotes.length > 1 ? (
          <div className="mt-6 flex justify-center gap-2">
            {quotes.map((q, i) => (
              <button
                key={q.attribution}
                type="button"
                aria-label={`Show review ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 w-6 cursor-pointer transition-colors ${
                  i === index ? "bg-[var(--lk-ink)]" : "bg-[var(--lk-line)]"
                }`}
              />
            ))}
          </div>
        ) : null}
      </FadeIn>
    </section>
  );
}
