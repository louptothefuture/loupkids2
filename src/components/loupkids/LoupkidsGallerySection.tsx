"use client";

import { useState } from "react";
import { LOUPKIDS_GALLERY } from "@/lib/content/loupkids-site";
import { LoupkidsImage } from "./LoupkidsImage";

export function LoupkidsGallerySection() {
  const [lightbox, setLightbox] = useState<(typeof LOUPKIDS_GALLERY)[number] | null>(null);

  return (
    <section
      id="gallery"
      aria-label="Loup in the wild"
      className="lk-section-white border-t border-[var(--lk-line)] py-10 sm:py-12"
    >
      <div className="flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-[var(--lk-section-x)] pb-1 [scrollbar-width:thin] sm:gap-3">
        {LOUPKIDS_GALLERY.map((img) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setLightbox(img)}
            className="relative h-52 w-[38vw] max-w-[11rem] shrink-0 snap-start overflow-hidden bg-neutral-100 sm:h-60 sm:w-44 sm:max-w-none"
          >
            <LoupkidsImage src={img.src} alt={img.alt} fill sizes="180px" className="object-cover" />
          </button>
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
