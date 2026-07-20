"use client";

import Image from "next/image";
import Link from "next/link";
import { LOUPKIDS_SETUP_STEPS } from "@/lib/content/loupkids-support";
import { FadeIn } from "./FadeIn";

const SETUP_VISUALS = [
  {
    src: "/images/setup/loup-setup.jpg",
    alt: "Loup parent app setup screen",
    background: "bg-white",
  },
  {
    src: "/images/setup/loup-manage.jpg",
    alt: "Loup parent app device and contact controls",
    background: "bg-white",
  },
  {
    src: "/images/setup/loup-call-flow.gif",
    alt: "Animated Loup call flow",
    background: "bg-black",
  },
] as const;

export function LoupkidsSetupCardsSection() {
  return (
    <section className="bg-[#cfe8d6] py-12 sm:py-16 lg:py-20">
      <div className="lk-container">
        <ol className="mx-auto flex max-w-5xl flex-col gap-7 sm:gap-9 lg:gap-12">
          {LOUPKIDS_SETUP_STEPS.map((card, i) => {
            const visual = SETUP_VISUALS[i];
            const mediaRight = i % 2 === 0;
            return (
              <li key={card.step}>
                <FadeIn
                  delay={0.04 + i * 0.05}
                  className="grid overflow-hidden rounded-3xl bg-white shadow-[0_14px_36px_rgba(23,52,32,0.1)] md:grid-cols-2 md:items-stretch"
                >
                  <div
                    className={`relative h-72 overflow-hidden sm:h-80 md:h-[28rem] ${
                      mediaRight ? "md:order-2" : "md:order-1"
                    } ${visual.background}`}
                  >
                    <Image
                      src={visual.src}
                      alt={visual.alt}
                      fill
                      sizes="(max-width: 767px) 100vw, 50vw"
                      unoptimized={visual.src.endsWith(".gif")}
                      className="object-contain object-center"
                    />
                  </div>
                  <div
                    className={`flex flex-col justify-center px-6 py-7 sm:px-8 sm:py-9 lg:px-10 ${
                      mediaRight ? "md:order-1" : "md:order-2"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#4a8fe8] text-sm font-medium text-[#4a8fe8]"
                        aria-hidden
                      >
                        {card.step}
                      </span>
                      <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--lk-muted)]">
                        {card.section}
                      </p>
                    </div>
                    <h3 className="lk-display mt-5 text-2xl font-medium tracking-tight text-[var(--lk-ink)] sm:text-3xl">
                      {card.title}
                    </h3>
                    <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-[var(--lk-muted)] sm:text-base">
                      {card.body}
                    </p>
                  </div>
                </FadeIn>
              </li>
            );
          })}
        </ol>

        <FadeIn delay={0.22} className="mt-6 text-center sm:mt-8">
          <Link
            href="/setup"
            className="lk-read-link text-[var(--lk-ink)] hover:text-[var(--lk-ink)]"
          >
            Full setup guide →
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
