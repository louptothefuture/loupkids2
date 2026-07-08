"use client";

import { useState } from "react";
import { LOUPKIDS_USE_CASES } from "@/lib/content/loupkids-site";
import { FadeIn } from "./FadeIn";
import { LoupkidsImage } from "./LoupkidsImage";
import { RevealHeadline } from "./RevealHeadline";

export function LoupkidsUseCasesSection() {
  const [active, setActive] = useState(0);
  const item = LOUPKIDS_USE_CASES[active];

  return (
    <section id="use-cases" className="lk-section-white lk-section-content border-t border-[var(--lk-line)]">
      <FadeIn className="lk-container">
        <RevealHeadline as="h2" className="lk-display lk-h2">
          Built for real life — not the app store.
        </RevealHeadline>

        <div className="mt-8 flex flex-wrap gap-2 sm:mt-10">
          {LOUPKIDS_USE_CASES.map((uc, i) => (
            <button
              key={uc.id}
              type="button"
              onClick={() => setActive(i)}
              className={`cursor-pointer border px-4 py-2 text-sm font-medium transition-colors ${
                i === active
                  ? "border-[var(--lk-ink)] bg-[var(--lk-ink)] text-white"
                  : "border-[var(--lk-line)] text-[var(--lk-muted)] hover:border-[var(--lk-ink)] hover:text-[var(--lk-ink)]"
              }`}
            >
              {uc.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h3 className="lk-display lk-h3">{item.headline}</h3>
            <p className="lk-prose lk-prose-muted mt-4">{item.body}</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
            <LoupkidsImage src={item.image} alt={item.alt} fill sizes="50vw" className="object-cover" />
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
