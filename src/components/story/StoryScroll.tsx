"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { LandingNav } from "@/components/landing/LandingNav";
import { PopHeadline, PopLabel } from "@/components/typography/PopType";
import { STORY_BEATS } from "@/lib/content/story";

function StackCard({
  children,
  index,
  className = "",
  tilt = "none",
  pace = "normal",
}: {
  children: ReactNode;
  index: number;
  className?: string;
  tilt?: "left" | "right" | "none";
  pace?: "normal" | "slow";
}) {
  const tiltClass =
    tilt === "left" ? "pop-card-tilt-left" : tilt === "right" ? "pop-card-tilt-right" : "";

  const isSlow = pace === "slow";

  return (
    <motion.div
      initial={{ opacity: 0, y: isSlow ? 72 : 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: isSlow ? "-5%" : "-10%" }}
      transition={
        isSlow
          ? { type: "spring", stiffness: 55, damping: 18, mass: 1.1 }
          : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
      }
      className={`pop-card relative mx-auto max-w-4xl overflow-hidden ${tiltClass} ${className}`}
      style={{
        zIndex: index + 1,
        marginTop: index === 0 ? undefined : "-2.5rem",
      }}
    >
      {children}
    </motion.div>
  );
}

export function StoryScroll() {
  const principles = [
    {
      title: "Connection before content",
      body: "Call their people — not an entertainment center in their pocket.",
      color: "bg-block-cobalt text-white",
    },
    {
      title: "Hands, not eyes",
      body: "Select. Call. Talk. Attention stays in the world.",
      color: "bg-block-coral text-white",
    },
    {
      title: "Beautiful objects",
      body: "Aluminum they'll pull out at recess — not plastic they'd hide.",
      color: "bg-block-fuchsia text-white",
    },
    {
      title: "You're the customer",
      body: "No ads. No data brokering. No engagement metrics. Ever.",
      color: "bg-block-ink text-white",
    },
  ];

  let cardIndex = 0;

  return (
    <article className="overflow-x-hidden bg-block-sun">
      <LandingNav />

      <section className="relative flex min-h-[60svh] flex-col items-center justify-center overflow-hidden bg-block-fuchsia px-4 py-20 text-white">
        <div className="relative text-center">
          <PopLabel className="mb-4 block text-white">Our LOUP story</PopLabel>
          <PopHeadline as="h1" size="hero">
            Our
            <br />
            Loup
            <br />
            Story
          </PopHeadline>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 pb-24 pt-8 sm:px-6">
        {STORY_BEATS.map((beat, i) => {
          const onLight = beat.text.includes("ink");
          const idx = cardIndex++;
          return (
            <StackCard
              key={beat.id}
              index={idx}
              tilt={i % 2 === 0 ? "left" : "right"}
              className={`${beat.bg} ${beat.text} p-8 sm:p-12`}
            >
              {beat.eyebrow && (
                <PopLabel className={`mb-4 block ${onLight ? "text-ink" : "text-white"}`}>
                  {beat.eyebrow}
                </PopLabel>
              )}
              <h2 className={`display text-left text-3xl sm:text-4xl ${onLight ? "text-ink" : "text-white"}`}>
                {beat.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
              {beat.body && (
                <p className={`mt-6 max-w-lg text-lg font-semibold leading-relaxed ${onLight ? "text-ink" : "text-white"}`}>
                  {beat.body}
                </p>
              )}
              {beat.image && (
                <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl border-3 border-ink shadow-[6px_6px_0_#0a0a0a]">
                  <Image src={beat.image.src} alt={beat.image.alt} fill className="object-cover" sizes="768px" />
                </div>
              )}
              {beat.cta && (
                <Link
                  href={beat.cta.href}
                  className="mt-8 inline-flex rounded-full border-3 border-ink bg-white px-8 py-3.5 text-sm font-black uppercase text-ink shadow-[4px_4px_0_#0a0a0a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  {beat.cta.label}
                </Link>
              )}
            </StackCard>
          );
        })}

        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ type: "spring", stiffness: 55, damping: 18 }}
          className="display py-10 text-center text-3xl text-ink sm:text-4xl"
        >
          What we believe
        </motion.h2>

        {principles.map((p, i) => {
          const idx = cardIndex++;
          return (
            <StackCard
              key={p.title}
              index={idx}
              pace="slow"
              tilt={i % 2 === 0 ? "right" : "left"}
              className={`${p.color} p-8`}
            >
              <h3 className="display text-left text-2xl text-white">{p.title}</h3>
              <p className="mt-3 text-base font-semibold text-white">{p.body}</p>
            </StackCard>
          );
        })}

        <StackCard index={cardIndex} pace="slow" className="bg-block-ink p-10 text-center text-white">
          <PopHeadline as="h2" size="lg">
            Get LOUP
          </PopHeadline>
          <p className="mt-4 text-lg font-semibold text-white">$149 · Pre-order today</p>
          <Link
            href="/shop/loup"
            className="mt-8 inline-flex rounded-full border-3 border-white bg-block-fuchsia px-10 py-4 text-sm font-black uppercase shadow-[4px_4px_0_#fff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Pre-order now
          </Link>
        </StackCard>
      </div>
    </article>
  );
}
