"use client";

import Image from "next/image";
import { useState } from "react";
import { GALLERY } from "@/lib/content/architecture";
import { Reveal } from "@/components/Reveal";

export function GallerySection() {
  const [lightbox, setLightbox] = useState<(typeof GALLERY)[number] | null>(null);

  return (
    <section id="gallery" className="bg-paper py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="label-mono text-steel">Gallery</p>
          <h2 className="display mt-3 text-4xl sm:text-5xl">In the wild</h2>
        </Reveal>

        <div className="mt-10 flex gap-3 overflow-x-auto pb-4 md:hidden">
          {GALLERY.map((img) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setLightbox(img)}
              className="relative h-64 w-48 shrink-0 overflow-hidden rounded-xl ring-1 ring-ink/10"
            >
              <Image src={img.src} alt={img.alt} fill sizes="200px" className="object-cover" />
            </button>
          ))}
        </div>

        <div className="mt-10 hidden grid-cols-2 gap-3 md:grid lg:grid-cols-4">
          {GALLERY.map((img, i) => (
            <Reveal key={img.src} delay={i * 0.04}>
              <button
                type="button"
                onClick={() => setLightbox(img)}
                className={`group relative w-full overflow-hidden rounded-xl ring-1 ring-ink/10 ${
                  i === 0 || i === 5 ? "aspect-[3/4] lg:col-span-1 lg:row-span-2" : "aspect-square"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 text-sm text-surface/70 hover:text-surface"
            onClick={() => setLightbox(null)}
          >
            Close
          </button>
          <div className="relative aspect-[4/3] w-full max-w-4xl overflow-hidden rounded-2xl">
            <Image src={lightbox.src} alt={lightbox.alt} fill sizes="90vw" className="object-contain" />
          </div>
        </div>
      )}
    </section>
  );
}
