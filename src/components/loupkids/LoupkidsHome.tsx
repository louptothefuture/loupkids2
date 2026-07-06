"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  LOUPKIDS_ACCORDION,
  LOUPKIDS_IMAGES,
  LOUPKIDS_PHONE,
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
import { RevealHeadline } from "./RevealHeadline";

const ease = [0.22, 1, 0.36, 1] as const;

function HeroHeadline({ text }: { text: string }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return <h1 className="lk-display lk-h1 max-w-4xl text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.55)]">{text}</h1>;
  }

  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } },
      }}
      className="lk-display lk-h1 max-w-4xl text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.55)]"
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
      {/* Hero */}
      <section className="lk-section-black relative min-h-[min(92vh,960px)] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.3, ease }}
        >
          <LoupkidsImage
            src={LOUPKIDS_IMAGES.heroKitchen}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_62%]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 from-0% via-black/35 via-[42%] to-black/5 to-100%" />
        <div className="relative z-10 flex min-h-[min(92vh,960px)] flex-col items-center justify-start gap-5 px-[var(--lk-section-x)] pb-[clamp(10rem,22vh,14rem)] pt-[clamp(6.5rem,14vh,9rem)] text-center">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5, ease }}
            className="lk-eyebrow text-white/80 [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]"
          >
            {LOUPKIDS_HERO_COPY.eyebrow}
          </motion.p>
          <HeroHeadline text={LOUPKIDS_HERO_COPY.headline} />
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.5, ease }}
            className="mx-auto max-w-xl text-lg text-white/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]"
          >
            {LOUPKIDS_HERO_COPY.subline}
          </motion.p>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.78, duration: 0.5, ease }}
            className="text-base font-medium text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]"
          >
            {LOUPKIDS_HERO_COPY.priceLine}
          </motion.p>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.82, duration: 0.5, ease }}
            className="text-base text-white/80 [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]"
          >
            {LOUPKIDS_HERO_COPY.shipLine}
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.6, ease }}
          >
            <LoupkidsOrderCta variant="dark" size="large" />
          </motion.div>
        </div>
      </section>

      <LoupkidsStatsSection />
      <LoupkidsTestimonialCarousel />

      <section className="lk-section-black lk-section">
        <div className="lk-container-narrow lk-stack text-center">
          <RevealHeadline as="h2" className="lk-display lk-h2 text-white">
            {LOUPKIDS_PHONE.title}
          </RevealHeadline>
          <RevealHeadline as="p" className="lk-lead mx-auto max-w-2xl text-white/80" delay={0.06}>
            {LOUPKIDS_PHONE.subtitle}
          </RevealHeadline>
        </div>
        <div className="lk-container-narrow mt-10 sm:mt-12">
          <LoupkidsAccordion items={LOUPKIDS_ACCORDION} dark />
        </div>
      </section>

      <LoupkidsUseCasesSection />
      <LoupkidsCallingPricingSection />
      <LoupkidsSetupCardsSection />

      <section className="lk-section-white lk-section-content border-t border-[var(--lk-line)]">
        <FadeIn className="lk-container-prose lk-cta-stack">
          <RevealHeadline as="h2" className="lk-display lk-h2">
            Ready when you are.
          </RevealHeadline>
          <p className="lk-lead lk-prose-muted max-w-md">
            The phone before their first smartphone — 30-day returns, 2-year warranty.
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
