"use client";

import { useEffect, useState } from "react";
import { FALLBACK_TESTIMONIALS } from "@/lib/content/fallback";
import { Reveal } from "@/components/Reveal";

/** Quote carousel — no stars (pre-launch) */
export function DevCampaignQuoteBar() {
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
  if (!t) return null;

  return (
    <section className="border-b-2 border-ink bg-white py-12 sm:py-14">
      <Reveal className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <blockquote className="display text-xl leading-snug text-ink sm:text-2xl">&ldquo;{t.quote}&rdquo;</blockquote>
        <p className="label-mono mt-4 text-ink-soft">{t.attribution}</p>
        {quotes.length > 1 ? (
          <div className="mt-6 flex justify-center gap-2">
            {quotes.map((q, i) => (
              <button
                key={q.attribution}
                type="button"
                aria-label={`Show quote ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 w-6 cursor-pointer transition-colors ${
                  i === index ? "bg-ink" : "bg-neutral-300"
                }`}
              />
            ))}
          </div>
        ) : null}
      </Reveal>
    </section>
  );
}
