"use client";

import Link from "next/link";
import { LOUPKIDS_SETUP_STEPS } from "@/lib/content/loupkids-support";
import { FadeIn } from "./FadeIn";
import { LoupkidsSetupGuideInteractive } from "./LoupkidsSetupGuideInteractive";
import { RevealHeadline } from "./RevealHeadline";

/** Homepage setup walkthrough — matches the interactive block on dev.loupkids.com */
export function LoupkidsSetupCardsSection() {
  return (
    <section className="border-y border-[var(--lk-line)] bg-[#f3f0e8] px-[var(--lk-section-x)] py-14 sm:py-16 lg:py-20">
      <div className="lk-container mb-10 max-w-3xl sm:mb-12">
        <FadeIn>
          <p className="lk-label">See the complete experience</p>
          <RevealHeadline as="h2" className="lk-display lk-h2 mt-3" instant>
            From the box to their first call.
          </RevealHeadline>
          <p className="lk-prose-muted mt-4 max-w-2xl">
            See what the parent does, who controls the contact list, and exactly what kids see on Loup.
            Choose a step to play each walkthrough.
          </p>
        </FadeIn>
      </div>

      <LoupkidsSetupGuideInteractive steps={[...LOUPKIDS_SETUP_STEPS]} />

      <FadeIn delay={0.1} className="lk-container mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 sm:mt-12">
        <Link href="/setup" className="lk-read-link">
          Open the full setup guide →
        </Link>
        <Link href="/shop/loup" className="lk-read-link text-[var(--lk-muted)] hover:text-[var(--lk-ink)]">
          See Loup details →
        </Link>
      </FadeIn>
    </section>
  );
}
