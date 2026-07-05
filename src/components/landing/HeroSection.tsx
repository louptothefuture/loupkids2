"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Marquee } from "@/components/Marquee";
import { LandingButton } from "@/components/landing/LandingButton";
import { ProductFloat } from "@/components/landing/ProductFloat";
import { PopHeadline, PopLabel } from "@/components/typography/PopType";

const MANIFESTO = [
  "Your phone. Not a feed.",
  "Real calls.",
  "Mute button.",
  "Approved contacts only.",
  "No algorithms.",
  "Break the loop.",
];

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[calc(100svh-57px)] overflow-hidden bg-block-fuchsia text-white"
    >
      <motion.div
        style={{ scale, opacity }}
        className="relative flex min-h-[calc(100svh-57px)] flex-col items-center justify-center px-4 py-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <PopHeadline as="h1" size="hero" className="text-center">
            Your phone.
            <br />
            Not a feed.
          </PopHeadline>
        </motion.div>

        <motion.div
          className="relative mt-8 w-full max-w-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <ProductFloat src="/images/product/loup-red-front.jpg" alt="LOUP phone" priority />
        </motion.div>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <LandingButton href="/shop/loup" variant="light">
            Pre-order — $149
          </LandingButton>
        </motion.div>
        <PopLabel className="mt-6 block text-center text-white/90">
          Free shipping · 30-day returns · Parent-controlled
        </PopLabel>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 border-t-2 border-ink bg-block-sun py-3">
        <Marquee fast>
          {MANIFESTO.map((line) => (
            <span key={line} className="mx-8 text-sm font-bold uppercase tracking-widest text-ink">
              {line} ◆
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

export function PreOrderSection() {
  return (
    <section id="pre-order" className="bg-block-fuchsia py-24 text-white">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <PopHeadline as="h2" size="hero">
          Get LOUP.
        </PopHeadline>
        <p className="mt-6 text-xl font-bold text-white">$149 · Free LOUP-to-LOUP forever</p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <LandingButton href="/shop/loup" variant="light">
            Pre-order now
          </LandingButton>
        </div>
      </div>
    </section>
  );
}
