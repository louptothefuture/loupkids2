"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { MarketingHomepage } from "@/lib/content/cms";
import { LOUPKIDS_CTA } from "@/lib/content/loupkids-conversion";
import { HOME_HERO } from "@/lib/content/loupkids-home-arc";
import type { Testimonial } from "@/lib/content/types";
import { LoupkidsOrderCta, LoupkidsTestimonialCarousel } from "./conversion";
import { FadeIn } from "./FadeIn";
import { LoupkidsFooter } from "./LoupkidsFooter";
import { LoupkidsHardwarePillars } from "./LoupkidsHardwarePillars";
import { LoupkidsHowItWorksStrip } from "./LoupkidsHowItWorksStrip";
import { LoupkidsImage } from "./LoupkidsImage";
import { LoupkidsLaunchOfferSection } from "./LoupkidsLaunchOfferSection";
import { LoupkidsManifestoSection } from "./LoupkidsManifestoSection";
import { LoupkidsStatsSection } from "./LoupkidsStatsSection";

const ease = [0.22, 1, 0.36, 1] as const;

function HeroHeadline({ text }: { text: string }) {
  const reduce = useReducedMotion();
  const lines = text.includes(". ")
    ? text.replace(/\.$/, "").split(". ").map((l, i, a) => (i < a.length - 1 ? `${l}.` : `${l}.`))
    : [text];

  if (reduce) {
    return (
      <h1 className="lk-display text-[clamp(2.25rem,6.5vw,3.75rem)] leading-[1.05] tracking-tight text-white">
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h1>
    );
  }

  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
      }}
      className="lk-display text-[clamp(2.25rem,6.5vw,3.75rem)] leading-[1.05] tracking-tight text-white"
    >
      {lines.map((line) => (
        <motion.span
          key={line}
          variants={{
            hidden: { opacity: 0, y: 14 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease },
            },
          }}
          className="block"
        >
          {line}
        </motion.span>
      ))}
    </motion.h1>
  );
}

/**
 * 5-act homepage arc.
 * Hero: full-width mobile stack · desktop 50/50 split (copy | full-bleed product).
 */
export function LoupkidsHomeClient({
  content,
  testimonials,
}: {
  content: MarketingHomepage;
  testimonials: Testimonial[];
}) {
  const reduce = useReducedMotion();
  const headline = content.heroHeadline || HOME_HERO.headline;
  const subline = HOME_HERO.subline;

  return (
    <>
      {/* ACT 1 — Hero */}
      <section className="lk-section-black relative overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1400px] lg:min-h-[min(92vh,900px)] lg:grid-cols-2">
          {/* Copy */}
          <div className="flex flex-col justify-center gap-4 px-[var(--lk-section-x)] pb-5 pt-[calc(4.5rem+env(safe-area-inset-top))] sm:gap-5 sm:pb-6 lg:py-16 lg:pr-10 xl:pr-14">
            <HeroHeadline text={headline} />
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4, ease }}
              className="max-w-[34rem] text-[0.9375rem] leading-snug text-white/80 sm:text-lg sm:leading-relaxed"
            >
              {subline}
            </motion.p>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.45, ease }}
              className="hidden pt-1 lg:block"
            >
              <LoupkidsOrderCta
                variant="dark"
                density="hero"
                label={LOUPKIDS_CTA.primary}
                className="!items-start !max-w-none gap-3 [&_a]:w-auto [&_a]:px-8 [&_a]:py-3.5"
              />
            </motion.div>
          </div>

          {/* Product — always full column width, never a left-stuck max-w card */}
          <div className="relative w-full min-h-[42vh] sm:min-h-[48vh] lg:min-h-full">
            <LoupkidsImage
              src={content.heroImage}
              alt={content.heroImageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[70%_40%] lg:object-center"
            />
          </div>

          {/* Mobile / tablet CTA — under image, full width of content column */}
          <div className="px-[var(--lk-section-x)] pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-6 lg:hidden">
            <LoupkidsOrderCta
              variant="dark"
              density="hero"
              label={LOUPKIDS_CTA.primary}
              className="!items-start !max-w-none gap-3 [&_a]:w-full [&_a]:px-8 [&_a]:py-3.5"
            />
          </div>
        </div>
      </section>

      {/* ACT 2 — Emotional tension */}
      <LoupkidsStatsSection />

      {/* ACT 3 — Manifesto */}
      <LoupkidsManifestoSection />

      {/* ACT 4 — Mechanism & hardware */}
      <LoupkidsHowItWorksStrip />
      <LoupkidsHardwarePillars />

      <FadeIn>
        <LoupkidsTestimonialCarousel
          headline={content.testimonialHeadline || "What parents are saying"}
          testimonials={testimonials}
        />
      </FadeIn>

      {/* ACT 5 — Launch offer */}
      <LoupkidsLaunchOfferSection />

      <LoupkidsFooter body={content.footerBody} />
    </>
  );
}
