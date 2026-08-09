"use client";

import { HOME_GALLERY } from "@/lib/content/loupkids-home-arc";
import { FadeIn } from "./FadeIn";
import { LoupkidsImage } from "./LoupkidsImage";

const tileClass: Record<(typeof HOME_GALLERY.items)[number]["tile"], string> = {
  hero: "min-h-[52vw] md:col-span-7 md:row-span-2 md:min-h-0",
  mid: "min-h-[42vw] md:col-span-5 md:min-h-0",
  wide: "min-h-[48vw] md:col-span-6 md:min-h-[280px]",
  square: "min-h-[48vw] md:col-span-3 md:min-h-[280px]",
};

export function LoupkidsFunGallery() {
  return (
    <section className="bg-[var(--lk-surface)] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-[var(--lk-section-x)]">
        <FadeIn>
          <h2 className="lk-display max-w-3xl text-[clamp(1.85rem,4.2vw,3rem)] leading-[1.06]">
            {HOME_GALLERY.headline}
          </h2>
        </FadeIn>

        {/* Mobile: punchy horizontal scroll · Desktop: asymmetric bento */}
        <div
          className="mt-10 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:mt-12 md:grid md:snap-none md:grid-cols-12 md:grid-rows-[minmax(240px,28vh)_minmax(240px,28vh)_minmax(260px,30vh)] md:gap-3 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden"
          role="list"
          aria-label="Loup gallery"
        >
          {HOME_GALLERY.items.map((item, i) => (
            <figure
              key={item.src}
              role="listitem"
              className={`relative w-[78vw] shrink-0 snap-center overflow-hidden bg-[var(--lk-cream)] sm:w-[60vw] md:w-auto md:shrink ${tileClass[item.tile]}`}
            >
              <LoupkidsImage
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 767px) 80vw, (max-width: 1200px) 50vw, 640px"
                className="object-cover transition-transform duration-700 ease-out hover:scale-[1.04]"
                priority={i === 0}
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
