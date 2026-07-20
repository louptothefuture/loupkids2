"use client";

import Link from "next/link";
import { LOUPKIDS_IMAGES } from "@/lib/content/loupkids-site";
import { FadeIn } from "./FadeIn";
import { LoupkidsImage } from "./LoupkidsImage";
import { RevealHeadline } from "./RevealHeadline";

export function LoupkidsCompanionSection() {
  return (
    <section className="lk-section-white lk-section-content border-y border-[var(--lk-line)]">
      <div className="lk-container grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_min(360px,38%)] lg:gap-14">
        <FadeIn>
          <RevealHeadline as="h2" className="lk-display lk-h2" instant>
            Control from your phone
          </RevealHeadline>
          <p className="lk-prose-muted mt-4 max-w-xl">
            Easy as 1, 2, 3 — pair Loup, set call rules, and page your kid from the parent app. Box to first call in about ten minutes.
          </p>
          <Link href="/setup" className="lk-read-link mt-6 inline-block">
            View setup guide →
          </Link>
        </FadeIn>

        <FadeIn delay={0.08} className="lg:sticky lg:top-24">
          <div className="relative mx-auto aspect-[9/16] w-full max-w-[300px] lg:mx-0 lg:max-w-none">
            <LoupkidsImage
              src={LOUPKIDS_IMAGES.appUx}
              alt="Loup companion app in use"
              fill
              sizes="(max-width: 1024px) 300px, 360px"
              className="object-contain"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
