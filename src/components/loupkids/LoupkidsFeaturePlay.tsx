"use client";

import { HOME_FEATURES } from "@/lib/content/loupkids-home-arc";
import { LOUPKIDS_ACCORDION } from "@/lib/content/loupkids-site";
import { FadeIn } from "./FadeIn";
import { LoupkidsAccordion } from "./LoupkidsAccordion";
import { LoupkidsImage } from "./LoupkidsImage";

/** Black feature band — accordion on dark */
export function LoupkidsFeaturePlay() {
  return (
    <section className="bg-[var(--lk-ink)] text-white">
      <div className="mx-auto max-w-[1200px] px-[var(--lk-section-x)] py-16 sm:py-20 lg:py-24">
        <FadeIn>
          <h2 className="lk-display max-w-xl text-[clamp(1.85rem,4vw,2.75rem)] leading-[1.08]">
            {HOME_FEATURES.headline}
          </h2>
        </FadeIn>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-2 md:items-center md:gap-14">
          <LoupkidsAccordion items={LOUPKIDS_ACCORDION} dark />

          <div className="mx-auto w-full max-w-md md:mx-0 md:max-w-none md:sticky md:top-28">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[var(--lk-surface)]">
              <LoupkidsImage
                src={HOME_FEATURES.image}
                alt={HOME_FEATURES.imageAlt}
                fill
                sizes="(max-width: 767px) 100vw, 50vw"
                className="object-contain object-center p-4 sm:p-6"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
