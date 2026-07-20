"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { MarketingHomepage } from "@/lib/content/cms";
import { LOUPKIDS_CTA } from "@/lib/content/loupkids-conversion";
import { LOUPKIDS_IMAGES, LOUPKIDS_VIDEOS } from "@/lib/content/loupkids-site";
import type { Testimonial } from "@/lib/content/types";
import {
  LoupkidsOrderCta,
  LoupkidsTestimonialCarousel,
} from "./conversion";
import { FadeIn } from "./FadeIn";
import { LoupkidsAccordion } from "./LoupkidsAccordion";
import { LoupkidsCallingPricingSection } from "./LoupkidsCallingPricingSection";
import { LoupkidsFooter } from "./LoupkidsFooter";
import { LoupkidsGallerySection } from "./LoupkidsGallerySection";
import { LoupkidsSetupCardsSection } from "./LoupkidsSetupCardsSection";
import { LoupkidsImage } from "./LoupkidsImage";
import { LoupkidsStatsSection } from "./LoupkidsStatsSection";
import { LoupkidsUseCasesSection } from "./LoupkidsUseCasesSection";
import { LoupkidsWhyNotJustSection } from "./LoupkidsWhyNotJustSection";
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

export function LoupkidsHomeClient({
  content,
  testimonials,
}: {
  content: MarketingHomepage;
  testimonials: Testimonial[];
}) {
  const reduce = useReducedMotion();

  return (
    <>
      <section className="lk-section-black relative min-h-[100dvh] overflow-hidden sm:min-h-[min(92vh,960px)]">
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { scale: 1.04 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease }}
        >
          <LoupkidsImage
            src={content.heroImage}
            alt={content.heroImageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[58%_22%] sm:object-[68%_32%] lg:object-[70%_38%]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black from-[8%] via-black/55 via-[40%] to-transparent to-[70%] sm:hidden" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-black/80 via-black/35 to-transparent sm:block lg:via-black/25" />
        <div className="absolute inset-0 hidden bg-gradient-to-t from-black/85 from-0% via-transparent via-[55%] to-black/15 to-100% sm:block" />

        <div className="relative z-10 flex min-h-[100dvh] flex-col justify-end px-[var(--lk-section-x)] pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-20 sm:min-h-[min(92vh,960px)] sm:gap-5 sm:pb-[clamp(2.5rem,8vh,4.5rem)] sm:pt-28 lg:max-w-[min(36rem,46%)]">
          <div className="flex max-w-lg flex-col gap-2.5 sm:gap-5">
            <HeroHeadline text={content.heroHeadline} />
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.68, duration: 0.5, ease }}
              className="text-[0.9375rem] leading-snug text-white/88 sm:text-lg sm:leading-relaxed"
            >
              {content.heroSubline}
            </motion.p>
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.78, duration: 0.5, ease }}
              className="text-sm font-medium text-white/95 sm:text-base"
            >
              {content.heroPriceLine}
            </motion.p>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6, ease }}
              className="pt-0.5"
            >
              <LoupkidsOrderCta
                variant="dark"
                size="default"
                label={content.heroCtaLabel}
                className="!items-start !max-w-none gap-2 sm:gap-3 [&_a]:w-auto [&_a]:px-7 [&_a]:py-3.5 sm:[&_a]:px-10 sm:[&_a]:py-4"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <LoupkidsStatsSection />

      <section className="lk-section-black lk-section">
        <div className="lk-container grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="lk-stack">
            <RevealHeadline as="h2" className="lk-display lk-h2 text-white">
              {content.phoneSectionTitle}
            </RevealHeadline>
            <RevealHeadline as="p" className="lk-lead max-w-2xl text-white/80" delay={0.06}>
              {content.phoneSectionSubtitle}
            </RevealHeadline>
            <div className="mt-8 sm:mt-10">
              <LoupkidsAccordion items={content.accordionItems} dark />
            </div>
          </div>
          <FadeIn delay={0.08} className="relative aspect-[4/3] overflow-hidden bg-black lg:sticky lg:top-28">
            <LoupVideo
              src={LOUPKIDS_VIDEOS.cutoutPhone}
              poster={LOUPKIDS_IMAGES.cutoutPhone}
              fit="contain"
              className="border-0 outline-none ring-0"
            />
          </FadeIn>
        </div>
        <p className="lk-display lk-h2 mx-auto mt-14 max-w-3xl text-center text-white sm:mt-16">
          {content.pullQuote}
        </p>
      </section>

      <LoupkidsTestimonialCarousel headline={content.testimonialHeadline} testimonials={testimonials} />

      <LoupkidsGallerySection />
      <LoupkidsUseCasesSection />
      <LoupkidsCallingPricingSection />
      <LoupkidsSetupCardsSection />
      <LoupkidsWhyNotJustSection />

      <section className="lk-section-white lk-section-content border-t border-[var(--lk-line)]">
        <FadeIn className="lk-container-prose lk-cta-stack">
          <RevealHeadline as="h2" className="lk-display lk-h2">
            {content.finalCtaHeadline}
          </RevealHeadline>
          <p className="lk-lead lk-prose-muted max-w-md">{content.finalCtaBody}</p>
          <LoupkidsOrderCta variant="light" size="large" label={content.finalCtaLabel} />
          <p className="text-base text-[var(--lk-muted)]">
            Need cellular later?{" "}
            <Link href="/reserve" className="underline underline-offset-4 hover:text-[var(--lk-ink)]">
              {LOUPKIDS_CTA.waitlist}
            </Link>
          </p>
        </FadeIn>
      </section>

      <LoupkidsFooter body={content.footerBody} />
    </>
  );
}
