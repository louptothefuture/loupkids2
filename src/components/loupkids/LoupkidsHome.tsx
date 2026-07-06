"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  LOUPKIDS_ACCORDION,
  LOUPKIDS_CUSTOMIZE,
  LOUPKIDS_GALLERY,
  LOUPKIDS_IMAGES,
  LOUPKIDS_NEWSLETTER,
  LOUPKIDS_NOTHING,
  LOUPKIDS_PHONE,
  LOUPKIDS_PRODUCT_SHOTS,
} from "@/lib/content/loupkids-site";
import {
  LOUPKIDS_CTA,
  LOUPKIDS_HERO_COPY,
  LOUPKIDS_STORY_SHORT,
} from "@/lib/content/loupkids-conversion";
import { SITE } from "@/lib/site";
import {
  LoupkidsOrderCta,
  LoupkidsPressStrip,
  LoupkidsStarRating,
  LoupkidsTestimonialStrip,
} from "./conversion";
import { FadeIn } from "./FadeIn";
import { LoupkidsAccordion } from "./LoupkidsAccordion";
import { LoupkidsCompanionSection } from "./LoupkidsCompanionSection";
import { LoupkidsComparisonSection } from "./LoupkidsSpecsSections";
import { LoupkidsFooter } from "./LoupkidsFooter";
import { LoupkidsImage } from "./LoupkidsImage";
import { LoupkidsStatsSection } from "./LoupkidsStatsSection";
import { RevealHeadline, RevealLine, RevealLines } from "./RevealHeadline";

const ease = [0.22, 1, 0.36, 1] as const;

function HeroHeadline({ text }: { text: string }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return <h1 className="lk-display lk-h1 max-w-4xl text-white">{text}</h1>;
  }

  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } },
      }}
      className="lk-display lk-h1 max-w-4xl text-white"
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
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/65" />
        <div className="relative z-10 flex min-h-[min(92vh,960px)] flex-col items-center justify-center gap-6 px-[var(--lk-section-x)] pb-20 pt-28 text-center">
          <HeroHeadline text={LOUPKIDS_HERO_COPY.headline} />
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.5, ease }}
            className="mx-auto max-w-xl text-lg text-white/85"
          >
            {LOUPKIDS_HERO_COPY.subhead}
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.5, ease }}
          >
            <LoupkidsStarRating />
          </motion.div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.6, ease }}
          >
            <LoupkidsOrderCta variant="dark" />
          </motion.div>
        </div>
      </section>

      <LoupkidsPressStrip />
      <LoupkidsStatsSection />
      <LoupkidsTestimonialStrip index={0} />

      {/* Phone + accordion — matches loupkids.com */}
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

      {/* Product shots */}
      <section className="lk-section-tight grid grid-cols-1 sm:grid-cols-3">
        {LOUPKIDS_PRODUCT_SHOTS.map((shot, i) => (
          <FadeIn key={shot.src} delay={i * 0.05} y={10} className="relative aspect-[4/5] bg-neutral-950 sm:aspect-square">
            <LoupkidsImage src={shot.src} alt={shot.alt} fill sizes="33vw" className="object-cover" />
          </FadeIn>
        ))}
      </section>

      {/* Chock full of nothing */}
      <section className="lk-section-white lk-section">
        <div className="lk-container grid items-center gap-[clamp(2.5rem,5vw,4.5rem)] lg:grid-cols-2">
          <div className="lk-stack">
            <RevealHeadline as="h2" className="lk-display lk-h2 leading-snug">
              {LOUPKIDS_NOTHING.headline}
            </RevealHeadline>
            <hr className="lk-rule" />
            <RevealLines className="lk-stack">
              {LOUPKIDS_NOTHING.tiles.map((tile) => (
                <RevealLine key={tile.title}>
                  <h4 className="lk-label mb-2">{tile.title}</h4>
                  <p className="lk-prose lk-prose-muted">{tile.body}</p>
                  <hr className="lk-rule mt-6" />
                </RevealLine>
              ))}
            </RevealLines>
          </div>
          <FadeIn delay={0.1} y={14} className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
            <LoupkidsImage src={LOUPKIDS_IMAGES.kidBw} alt="Kid with Loup" fill sizes="50vw" className="object-cover" />
          </FadeIn>
        </div>
      </section>

      {/* Story — short teaser */}
      <section className="lk-section-black lk-section">
        <div className="lk-container grid items-center gap-[clamp(2.5rem,5vw,4.5rem)] lg:grid-cols-2">
          <div className="lk-stack">
            <p className="lk-eyebrow text-white/55">Our story</p>
            <RevealHeadline as="h2" className="lk-display lk-h2 text-white">
              {LOUPKIDS_STORY_SHORT.headline}
            </RevealHeadline>
            <RevealLines className="lk-stack lk-prose lk-prose-light" delay={0.06}>
              {LOUPKIDS_STORY_SHORT.paragraphs.map((p) => (
                <RevealLine key={p.slice(0, 28)}>{p}</RevealLine>
              ))}
            </RevealLines>
            <FadeIn delay={0.18}>
              <Link
                href={LOUPKIDS_STORY_SHORT.cta.href}
                className="inline-flex border border-white px-8 py-3.5 text-sm font-medium uppercase tracking-wider text-white transition-opacity hover:opacity-80"
              >
                {LOUPKIDS_STORY_SHORT.cta.label}
              </Link>
            </FadeIn>
          </div>
          <FadeIn delay={0.1} y={14} className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
            <LoupkidsImage src={LOUPKIDS_IMAGES.kidsPhonesTout} alt="Kids with Loup" fill sizes="50vw" className="object-cover" />
          </FadeIn>
        </div>
      </section>

      {/* Gallery */}
      <section className="lk-section-tight grid grid-cols-1 sm:grid-cols-2">
        {LOUPKIDS_GALLERY.map((img, i) => (
          <FadeIn key={img.src} delay={i * 0.05} y={10} className="relative aspect-[4/5] bg-neutral-100">
            <LoupkidsImage src={img.src} alt={img.alt} fill sizes="50vw" className="object-cover" />
          </FadeIn>
        ))}
      </section>

      <LoupkidsCompanionSection />

      {/* Customizable */}
      <section className="lk-section-black lk-section text-center">
        <div className="lk-container-narrow lk-stack">
          <p className="lk-eyebrow text-white/55">Personalize</p>
          <RevealHeadline as="h2" className="lk-display lk-h2 text-white">
            {LOUPKIDS_CUSTOMIZE.headline}
          </RevealHeadline>
          <RevealHeadline as="p" className="lk-lead mx-auto max-w-md text-white/78" delay={0.06}>
            {LOUPKIDS_CUSTOMIZE.body}
          </RevealHeadline>
        </div>
      </section>

      <section className="lk-section-tight lk-section-white grid grid-cols-2 sm:grid-cols-3">
        {LOUPKIDS_CUSTOMIZE.plates.map((src, i) => (
          <FadeIn key={src} delay={i * 0.04} y={8} className="relative aspect-square border border-[var(--lk-line)] bg-neutral-50">
            <LoupkidsImage src={src} alt="Loup back plate" fill sizes="33vw" className="object-contain p-6" />
          </FadeIn>
        ))}
      </section>

      <LoupkidsTestimonialStrip index={1} />

      <LoupkidsComparisonSection />

      {/* Final CTA */}
      <section className="lk-section-white lk-section-content border-t border-[var(--lk-line)]">
        <FadeIn className="lk-container-prose lk-cta-stack">
          <RevealHeadline as="h2" className="lk-display lk-h2">
            Ready when you are.
          </RevealHeadline>
          <p className="lk-lead lk-prose-muted max-w-md">
            The phone before their first smartphone — free shipping, 30-day returns, 2-year warranty.
          </p>
          <LoupkidsOrderCta variant="light" />
          <p className="text-sm text-[var(--lk-muted)]">
            Need cellular?{" "}
            <Link href="/reserve" className="underline underline-offset-4 hover:text-[var(--lk-ink)]">
              {LOUPKIDS_CTA.waitlist}
            </Link>
          </p>
        </FadeIn>
      </section>

      {/* Newsletter */}
      <section className="lk-section-black px-[var(--lk-section-x)] py-[clamp(4rem,8vw,6rem)] text-white">
        <FadeIn className="mx-auto max-w-lg text-center">
          <RevealHeadline as="h2" className="lk-display lk-h2 text-white">
            {LOUPKIDS_NEWSLETTER.headline}
          </RevealHeadline>
          <p className="mt-4 text-white/70">
            Parent updates, launch news, and journal picks — no spam.
          </p>
          <a
            href={`mailto:${SITE.email}?subject=Stay%20in%20The%20Loup`}
            className="lk-btn lk-btn-white mt-8 inline-flex"
          >
            {LOUPKIDS_CTA.newsletter}
          </a>
        </FadeIn>
      </section>

      <LoupkidsFooter />
    </>
  );
}
