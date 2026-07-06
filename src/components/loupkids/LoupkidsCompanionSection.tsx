"use client";

import { LOUPKIDS_COMPANION, LOUPKIDS_IMAGES } from "@/lib/content/loupkids-site";
import { FadeIn } from "./FadeIn";
import { LoupkidsCardAccordion } from "./LoupkidsCardAccordion";
import { LoupkidsImage } from "./LoupkidsImage";
import { RevealHeadline } from "./RevealHeadline";

export function LoupkidsCompanionSection() {
  return (
    <section className="lk-section-muted lk-section-cards">
      <div className="lk-container">
        <FadeIn className="lk-card lk-card-pad mb-5 max-w-2xl sm:mb-6">
          <p className="lk-eyebrow mb-2">Parent app</p>
          <RevealHeadline as="h2" className="lk-display lk-h2" instant>
            {LOUPKIDS_COMPANION.headline}
          </RevealHeadline>
        </FadeIn>

        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_min(360px,38%)] lg:gap-6">
          <LoupkidsCardAccordion items={LOUPKIDS_COMPANION.items} />

          <FadeIn delay={0.12} className="lg:sticky lg:top-24">
            <div className="lk-card lk-card-pad flex justify-center bg-neutral-50/80">
              <div className="relative aspect-[9/16] w-full max-w-[280px] overflow-hidden sm:max-w-none">
                <LoupkidsImage
                  src={LOUPKIDS_IMAGES.appUx}
                  alt="Loup companion app in use"
                  fill
                  sizes="(max-width: 1024px) 280px, 360px"
                  className="object-contain"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
