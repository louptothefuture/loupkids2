"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Marquee } from "@/components/Marquee";
import type { MarketingHomepage } from "@/lib/content/cms";
import { LOUPKIDS_CTA } from "@/lib/content/loupkids-conversion";
import { LOUPKIDS_CONVERT_ANTI } from "@/lib/content/loupkids-convert";
import { HOME_HERO, HOME_STORY } from "@/lib/content/loupkids-home-arc";
import type { Testimonial } from "@/lib/content/types";
import { LoupkidsOrderCta, LoupkidsTestimonialCarousel } from "./conversion";
import { FadeIn } from "./FadeIn";
import { LoupkidsCallingPricingSection } from "./LoupkidsCallingPricingSection";
import { LoupkidsFeaturePlay } from "./LoupkidsFeaturePlay";
import { LoupkidsFooter } from "./LoupkidsFooter";
import { LoupkidsFunGallery } from "./LoupkidsFunGallery";
import { LoupkidsHowItWorksStrip } from "./LoupkidsHowItWorksStrip";
import { LoupkidsImage } from "./LoupkidsImage";
import { LoupkidsLaunchOfferSection } from "./LoupkidsLaunchOfferSection";
import { LoupkidsStatsSection } from "./LoupkidsStatsSection";
import { LoupkidsWhyNotJustSection } from "./LoupkidsWhyNotJustSection";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Mobile-first DTC cadence:
 * Hook → Relevancy → Story → Features → Gallery → How it works → Proof → Offer
 */
export function LoupkidsHomeClient({
  content,
  testimonials,
}: {
  content: MarketingHomepage;
  testimonials: Testimonial[];
}) {
  const reduce = useReducedMotion();
  const headline = HOME_HERO.headline;
  const subline = HOME_HERO.subline;
  const lines = headline.includes(". ")
    ? headline.replace(/\.$/, "").split(". ").map((l, i, a) => (i < a.length - 1 ? `${l}.` : `${l}.`))
    : [headline];

  return (
    <>
      {/* 1 — Off-white hero */}
      <section className="relative bg-[var(--lk-bg)] text-[var(--lk-ink)]">
        <div className="mx-auto grid max-w-[1200px] items-center gap-8 px-[var(--lk-section-x)] py-12 sm:py-14 md:min-h-[min(78vh,760px)] md:grid-cols-2 md:gap-12 lg:gap-16 lg:py-20">
          <div className="order-2 md:order-1">
            <div className="mx-auto w-full max-w-lg md:mx-0 md:max-w-[26rem] lg:max-w-lg">
              <motion.h1
                initial={reduce ? false : "hidden"}
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
                }}
                className="lk-display text-[clamp(2.35rem,5vw,3.75rem)] leading-[1.05] tracking-tight"
              >
                {lines.map((line, i) => (
                  <motion.span
                    key={line}
                    variants={{
                      hidden: { y: 10, opacity: 0 },
                      visible: { y: 0, opacity: 1, transition: { duration: 0.45, ease } },
                    }}
                    className="block"
                  >
                    {line}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.p
                initial={reduce ? false : { y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.35, ease }}
                className="mt-4 text-[0.975rem] leading-snug text-[var(--lk-muted)] sm:text-lg sm:leading-relaxed"
              >
                {subline}
              </motion.p>

              <motion.div
                initial={reduce ? false : { y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.28, duration: 0.35, ease }}
                className="mt-8"
              >
                <LoupkidsOrderCta
                  variant="light"
                  density="hero"
                  label={LOUPKIDS_CTA.primary}
                  className="!items-start !max-w-none gap-3 [&_a]:w-full sm:[&_a]:w-auto [&_a]:px-8 [&_a]:py-3.5"
                />
              </motion.div>
            </div>
          </div>

          <div className="relative order-1 aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] shadow-[var(--lk-card-shadow)] sm:aspect-[5/6] md:order-2 md:aspect-auto md:min-h-[28rem] md:self-stretch">
            <LoupkidsImage
              src={content.heroImage}
              alt={content.heroImageAlt}
              fill
              priority
              sizes="(max-width: 767px) 100vw, 50vw"
              className="object-cover object-[70%_38%] md:object-center"
            />
          </div>
        </div>
      </section>

      {/* Anti-banner — white on black between hero and proof */}
      <div className="bg-[var(--lk-ink)] py-4 text-white">
        <Marquee fast>
          {LOUPKIDS_CONVERT_ANTI.map((line) => (
            <span
              key={line}
              className="mx-6 inline-flex items-center gap-5 text-lg font-bold lowercase sm:text-xl"
            >
              {line.replace(/\.$/, "")}
              <span className="opacity-40">·</span>
            </span>
          ))}
        </Marquee>
      </div>

      <LoupkidsStatsSection />

      <section className="bg-[var(--lk-bg)] text-[var(--lk-ink)]">
        <div className="px-[var(--lk-section-x)] mx-auto grid max-w-[1200px] items-center gap-10 py-16 sm:py-20 md:grid-cols-2 md:gap-14">
          <FadeIn>
            <h2 className="lk-display text-[clamp(1.85rem,4vw,2.75rem)] leading-[1.08]">
              {HOME_STORY.headline}
            </h2>
            <div className="mt-5 max-w-xl space-y-4 text-[0.975rem] leading-relaxed text-[var(--lk-ink)]/75 sm:text-base">
              {HOME_STORY.paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
            <Link href={HOME_STORY.cta.href} className="lk-btn lk-btn-sm mt-8">
              {HOME_STORY.cta.label}
            </Link>
          </FadeIn>
          <FadeIn delay={0.06}>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] shadow-[0_16px_40px_rgba(10,10,10,0.12)] md:aspect-[5/4]">
              <LoupkidsImage
                src={HOME_STORY.image}
                alt={HOME_STORY.imageAlt}
                fill
                sizes="(max-width: 767px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <LoupkidsFeaturePlay />
      <LoupkidsFunGallery />
      <LoupkidsHowItWorksStrip />
      <LoupkidsCallingPricingSection compact />

      <FadeIn>
        <LoupkidsTestimonialCarousel
          headline={content.testimonialHeadline || "What parents are saying"}
          testimonials={testimonials}
        />
      </FadeIn>

      <LoupkidsWhyNotJustSection />
      <LoupkidsLaunchOfferSection />
      <LoupkidsFooter body={content.footerBody} />
    </>
  );
}
