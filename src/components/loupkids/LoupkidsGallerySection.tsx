"use client";

import { useState } from "react";
import { LOUPKIDS_GALLERY } from "@/lib/content/loupkids-site";
import { FadeIn } from "./FadeIn";
import { LoupkidsImage } from "./LoupkidsImage";
import { RevealHeadline } from "./RevealHeadline";

export function LoupkidsGallerySection() {
  const [lightbox, setLightbox] = useState<(typeof LOUPKIDS_GALLERY)[number] | null>(null);

  return (
    <section id="gallery" className="lk-section-white border-t border-[var(--lk-line)]">
      <FadeIn className="lk-container lk-section-content !py-12 sm:!py-14">
        <p className="lk-eyebrow mb-3">Gallery</p>
        <RevealHeadline as="h2" className="lk-display lk-h2">
          In the wild
        </RevealHeadline>
      </FadeIn>

      <div className="flex gap-3 overflow-x-auto px-[var(--lk-section-x)] pb-4 md:hidden">
        {LOUPKIDS_GALLERY.map((img) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setLightbox(img)}
            className="relative h-72 w-52 shrink-0 overflow-hidden bg-neutral-100"
          >
            <LoupkidsImage src={img.src} alt={img.alt} fill sizes="220px" className="object-cover" />
          </button>
        ))}
      </div>

      <div className="mt-2 hidden grid-cols-2 gap-3 px-[var(--lk-section-x)] md:grid lg:grid-cols-3">
        {LOUPKIDS_GALLERY.map((img, i) => (
          <FadeIn key={img.src} delay={i * 0.04}>
            <button
              type="button"
              onClick={() => setLightbox(img)}
              className="lk-image-hover relative aspect-[4/5] w-full overflow-hidden bg-neutral-100"
            >
              <LoupkidsImage src={img.src} alt={img.alt} fill sizes="33vw" className="object-cover" />
            </button>
          </FadeIn>
        ))}
      </div>

      {lightbox ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 text-sm text-white/70 hover:text-white"
            onClick={() => setLightbox(null)}
          >
            Close
          </button>
          <div className="relative aspect-[4/3] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <LoupkidsImage src={lightbox.src} alt={lightbox.alt} fill sizes="90vw" className="object-contain" />
          </div>
        </div>
      ) : null}
    </section>
  );
}
