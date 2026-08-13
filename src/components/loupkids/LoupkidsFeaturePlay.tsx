"use client";

import dynamic from "next/dynamic";
import { HOME_FEATURES } from "@/lib/content/loupkids-home-arc";
import { LOUPKIDS_ACCORDION } from "@/lib/content/loupkids-site";
import { FadeIn } from "./FadeIn";
import { LoupkidsAccordion } from "./LoupkidsAccordion";

const Glb3Embed = dynamic(
  () =>
    import("@/components/glb/Glb3ScrollStage").then((m) => ({
      default: m.Glb3ScrollStage,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-[var(--lk-cream)] text-sm text-[var(--lk-muted)]">
        Loading preview…
      </div>
    ),
  },
);

/** Black feature band — accordion + live GLB */
export function LoupkidsFeaturePlay() {
  return (
    <section className="bg-[var(--lk-ink)] text-white">
      <div className="mx-auto max-w-[1200px] px-[var(--lk-section-x)] py-16 sm:py-20 lg:py-24">
        <FadeIn>
          <h2 className="lk-display max-w-xl text-[clamp(1.85rem,4vw,2.75rem)] leading-[1.08]">
            {HOME_FEATURES.headline}
          </h2>
        </FadeIn>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-2 md:items-start md:gap-14">
          <div className="order-2 md:order-1">
            <LoupkidsAccordion items={LOUPKIDS_ACCORDION} dark />
          </div>

          <div className="order-1 mx-auto w-full max-w-[20.5rem] sm:max-w-[24rem] md:order-2 md:mx-0 md:max-w-none md:sticky md:top-28">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] bg-[var(--lk-cream)]">
              <Glb3Embed mode="embed" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
