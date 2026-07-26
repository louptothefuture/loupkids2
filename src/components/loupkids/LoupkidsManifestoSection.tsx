"use client";

import { HOME_MANIFESTO } from "@/lib/content/loupkids-home-arc";
import { LOUPKIDS_IMAGES } from "@/lib/content/loupkids-site";
import { FadeIn } from "./FadeIn";
import { LoupkidsImage } from "./LoupkidsImage";

/** Act 3 — manifesto + sticky hardware close-up (soul of the brand) */
export function LoupkidsManifestoSection() {
  return (
    <section className="lk-section-black border-y border-white/10">
      <div className="mx-auto grid max-w-[1200px] lg:grid-cols-2 lg:items-stretch">
        <FadeIn className="relative min-h-[22rem] overflow-hidden bg-black sm:min-h-[28rem] lg:min-h-[min(88vh,40rem)] lg:sticky lg:top-0 lg:h-[min(100svh,44rem)]">
          <LoupkidsImage
            src={LOUPKIDS_IMAGES.productHi}
            alt="Loup e-paper face and tactile scroll wheel — studio close-up"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </FadeIn>

        <div className="flex flex-col justify-center px-[var(--lk-section-x)] py-16 sm:py-20 lg:px-14 lg:py-24 xl:px-20">
          <FadeIn>
            <ul className="space-y-6 sm:space-y-8">
              {HOME_MANIFESTO.lines.map((line, i) => (
                <li
                  key={line}
                  className={`lk-display text-[clamp(1.65rem,3.8vw,2.75rem)] leading-[1.15] tracking-tight ${
                    i === HOME_MANIFESTO.lines.length - 1 ? "text-white" : "text-white/55"
                  }`}
                >
                  {line}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
