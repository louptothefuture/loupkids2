"use client";

import Link from "next/link";
import { LOUPKIDS_SETUP_STEPS } from "@/lib/content/loupkids-support";
import { FadeIn } from "./FadeIn";
import { RevealHeadline } from "./RevealHeadline";

export function LoupkidsSetupCardsSection() {
  return (
    <section className="lk-section-white lk-section-content border-y border-[var(--lk-line)]">
      <div className="lk-container">
        <FadeIn>
          <RevealHeadline as="h2" className="lk-display lk-h2" instant>
            Easy as 1, 2, 3
          </RevealHeadline>
        </FadeIn>

        <div className="mt-10 grid gap-4 sm:mt-12 md:grid-cols-3 md:gap-5">
          {LOUPKIDS_SETUP_STEPS.map((card, i) => (
            <FadeIn key={card.step} delay={i * 0.05}>
              <div className="lk-card lk-card-pad flex h-full flex-col">
                <p className="lk-label">{card.step}</p>
                <h3 className="lk-display mt-3 text-xl">{card.title}</h3>
                <p className="lk-prose-muted mt-3 flex-1">{card.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.15} className="mt-8 text-center md:mt-10">
          <Link href="/setup" className="lk-read-link">
            Full setup guide →
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
