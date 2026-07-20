"use client";

import { LOUPKIDS_IMAGES, LOUPKIDS_INTRO, LOUPKIDS_STATS } from "@/lib/content/loupkids-site";
import { FadeIn } from "./FadeIn";
import { LoupkidsImage } from "./LoupkidsImage";
import { RevealHeadline } from "./RevealHeadline";

/** One-viewport proof block — compact circle media + tight stats */
export function LoupkidsStatsSection() {
  return (
    <section className="lk-section-white flex items-center px-[var(--lk-section-x)] py-12 sm:py-14 lg:min-h-[min(100svh,52rem)] lg:py-16">
      <div className="mx-auto w-full max-w-[1140px]">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12 xl:gap-16">
          <FadeIn className="min-w-0">
            <RevealHeadline as="h2" className="lk-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.1]" instant>
              {LOUPKIDS_INTRO.subhead}
            </RevealHeadline>
            <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-[var(--lk-ink)] sm:text-base">
              {LOUPKIDS_INTRO.body}
            </p>
            <p className="lk-stat-tagline mt-3">{LOUPKIDS_INTRO.cta}</p>

            <div className="mt-7 divide-y border-y border-[var(--lk-line)] sm:mt-8">
              {LOUPKIDS_STATS.map((item) => (
                <div key={item.title} className="grid gap-1 py-3.5 sm:grid-cols-[9.5rem_1fr] sm:items-baseline sm:gap-5 sm:py-4">
                  <p className="text-sm font-medium leading-snug text-[var(--lk-ink)] sm:text-[0.9375rem]">
                    {item.title}
                  </p>
                  <p className="text-sm leading-snug text-[var(--lk-muted)] sm:text-[0.9375rem]">{item.text}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.06} className="flex justify-center pb-4 lg:justify-end lg:pb-0">
            <div className="relative aspect-square w-[min(100%,16rem)] overflow-hidden rounded-full bg-neutral-100 sm:w-[min(100%,20rem)] lg:w-[min(100%,22rem)]">
              <LoupkidsImage
                src={LOUPKIDS_IMAGES.kidsPhonesLine}
                alt="Kids looking down at smartphones"
                fill
                sizes="352px"
                className="object-cover object-[center_28%]"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
