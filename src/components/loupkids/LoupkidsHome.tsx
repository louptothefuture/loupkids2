"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  LOUPKIDS_ACCORDION,
  LOUPKIDS_IMAGES,
  LOUPKIDS_PHONE,
  LOUPKIDS_VIDEOS,
} from "@/lib/content/loupkids-site";
import {
  LOUPKIDS_CTA,
  LOUPKIDS_HERO_COPY,
} from "@/lib/content/loupkids-conversion";
import {
  LoupkidsOrderCta,
  LoupkidsTestimonialCarousel,
} from "./conversion";
import { FadeIn } from "./FadeIn";
import { LoupkidsAccordion } from "./LoupkidsAccordion";
import { LoupkidsCallingPricingSection } from "./LoupkidsCallingPricingSection";
import { LoupkidsFooter } from "./LoupkidsFooter";
import { LoupkidsSetupCardsSection } from "./LoupkidsSetupCardsSection";
import { LoupkidsImage } from "./LoupkidsImage";
import { LoupkidsStatsSection } from "./LoupkidsStatsSection";
import { LoupkidsUseCasesSection } from "./LoupkidsUseCasesSection";
import { LoupVideo } from "./LoupVideo";
import { RevealHeadline } from "./RevealHeadline";

const ease = [0.22, 1, 0.36, 1] as const;

function HeroHeadline({ text }: { text: string }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return (
      <h1 className="lk-display lk-h1 max-w-4xl text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.5)]">
        {text}
      </h1>
    );
  }

  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } },
      }}
      className="lk-display lk-h1 max-w-4xl text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.5)]"
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={{
            hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.75, ease },
            },
          }}
          className="mr-[0.28em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export function LoupkidsHome() {
  const reduce = useReducedMotion();

  return (
    <>
      {/* Hero — full bleed like loupkids.com; copy anchored bottom with scrim */}
      <section className="lk-section-black relative min-h-[min(92vh,960px)] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { scale: 1.04 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease }}
        >
          <LoupkidsImage
            src={LOUPKIDS_IMAGES.heroKitchen}
            alt="Child with Loup screen-free phone on the kitchen table"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[40%_28%]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 from-0% via-black/45 via-[38%] to-black/20 to-100%" />
        <div className="relative z-10 flex min-h-[min(92vh,960px)] flex-col justify-end gap-5 px-[var(--lk-section-x)] pb-[clamp(2.5rem,8vh,4.5rem)] pt-28 lg:max-w-3xl">
          <HeroHeadline text={LOUPKIDS_HERO_COPY.headline} />
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.68, duration: 0.5, ease }}
            className="max-w-lg text-lg leading-relaxed text-white/90"
          >
            {LOUPKIDS_HERO_COPY.subline}
          </motion.p>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.78, duration: 0.5, ease }}
            className="font-medium text-white"
          >
            {LOUPKIDS_HERO_COPY.priceLine}
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6, ease }}
            className="mt-1 items-start"
          >
            <LoupkidsOrderCta
              variant="dark"
              size="large"
              label={LOUPKIDS_CTA.hero}
              className="!items-start !max-w-none"
            />
          </motion.div>
        </div>
      </section>

      <LoupkidsStatsSection />

      <section className="lk-section-black lk-section">
        <div className="lk-container grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="lk-stack">
            <RevealHeadline as="h2" className="lk-display lk-h2 text-white">
              {LOUPKIDS_PHONE.title}
            </RevealHeadline>
            <RevealHeadline as="p" className="lk-lead max-w-2xl text-white/80" delay={0.06}>
              {LOUPKIDS_PHONE.subtitle}
            </RevealHeadline>
            <div className="mt-8 sm:mt-10">
              <LoupkidsAccordion items={LOUPKIDS_ACCORDION} dark />
            </div>
          </div>
          <FadeIn delay={0.08} className="relative aspect-[4/5] overflow-hidden bg-neutral-900 lg:sticky lg:top-28">
            <LoupVideo
              src={LOUPKIDS_VIDEOS.cutoutPhone}
              poster={LOUPKIDS_IMAGES.threeQuarter}
              className="object-contain"
            />
          </FadeIn>
        </div>
      </section>

      <LoupkidsTestimonialCarousel />

      <LoupkidsUseCasesSection />
      <LoupkidsCallingPricingSection />
      <LoupkidsSetupCardsSection />

      <section className="lk-section-white lk-section-content border-t border-[var(--lk-line)]">
        <FadeIn className="lk-container-prose lk-cta-stack">
          <RevealHeadline as="h2" className="lk-display lk-h2">
            Ready when you are.
          </RevealHeadline>
          <p className="lk-lead lk-prose-muted max-w-md">
            The phone before their first smartphone — 30-day guarantee, ships Q4 2026.
          </p>
          <LoupkidsOrderCta variant="light" size="large" />
          <p className="text-base text-[var(--lk-muted)]">
            Need cellular later?{" "}
            <Link href="/reserve" className="underline underline-offset-4 hover:text-[var(--lk-ink)]">
              {LOUPKIDS_CTA.waitlist}
            </Link>
          </p>
        </FadeIn>
      </section>

      <LoupkidsFooter />
    </>
  );
}
