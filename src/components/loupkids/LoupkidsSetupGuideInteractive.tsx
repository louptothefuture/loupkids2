"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "./FadeIn";
import { LoupkidsImage } from "./LoupkidsImage";

type Step = {
  step: string;
  section: string;
  title: string;
  body: string;
};

type Visual = {
  src: string;
  alt: string;
  kind: "phone" | "photo";
};

const STEP_VISUALS: Visual[] = [
  {
    src: "/images/setup/loup-setup.gif",
    alt: "Parent app setup — create account and scan QR",
    kind: "phone",
  },
  {
    src: "/images/setup/loup-manage.gif",
    alt: "Parent app — home, contacts, quiet hours, and page",
    kind: "phone",
  },
  {
    src: "/images/lifestyle-new/girl-kitchen.jpg",
    alt: "Kid talking on Loup at the kitchen counter while a parent cooks",
    kind: "photo",
  },
];

export function LoupkidsSetupGuideInteractive({ steps }: { steps: Step[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const nodes = itemRefs.current.filter(Boolean) as HTMLLIElement[];
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const idx = nodes.indexOf(visible.target as HTMLLIElement);
        if (idx >= 0) setActive(idx);
      },
      { rootMargin: "-35% 0px -40% 0px", threshold: [0.2, 0.45, 0.7] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [steps.length]);

  const current = STEP_VISUALS[active] ?? STEP_VISUALS[0];

  return (
    <div className="lk-container grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-14 xl:gap-16">
      <div>
        <ol>
          {steps.map((s, i) => (
            <li
              key={s.step}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className={`${i > 0 ? "mt-8 border-t border-[var(--lk-line)] pt-8" : ""} ${
                active === i ? "opacity-100" : "opacity-55"
              } transition-opacity duration-300`}
            >
              <FadeIn delay={i * 0.04}>
                <button
                  type="button"
                  className="w-full cursor-pointer text-left"
                  onClick={() => setActive(i)}
                  aria-current={active === i ? "step" : undefined}
                >
                  <p className="lk-label mb-2">{s.section}</p>
                  <h2 className="lk-display text-xl">{s.title}</h2>
                  <p className="lk-prose-muted mt-2">{s.body}</p>
                </button>
              </FadeIn>
            </li>
          ))}
        </ol>

        <FadeIn delay={0.2} className="lk-prose-muted mt-12 border-t border-[var(--lk-line)] pt-8">
          Stuck? Browse the{" "}
          <Link href="/help" className="underline underline-offset-4 hover:text-[var(--lk-ink)]">
            knowledge base
          </Link>{" "}
          or{" "}
          <Link href="/contact" className="underline underline-offset-4 hover:text-[var(--lk-ink)]">
            contact support
          </Link>
          .
        </FadeIn>
      </div>

      <FadeIn delay={0.08} className="lg:sticky lg:top-28">
        {current.kind === "phone" ? (
          <div className="mx-auto w-full max-w-[18.5rem] sm:max-w-[20rem]">
            {/* phone shell */}
            <div className="relative rounded-[2.65rem] bg-[#111] p-[0.72rem] shadow-[0_24px_60px_rgba(0,0,0,0.18)] ring-1 ring-black/10">
              {/* side buttons */}
              <span className="absolute -left-[3px] top-[7.5rem] h-8 w-[3px] rounded-l bg-[#2a2a2a]" aria-hidden />
              <span className="absolute -left-[3px] top-[10.25rem] h-14 w-[3px] rounded-l bg-[#2a2a2a]" aria-hidden />
              <span className="absolute -right-[3px] top-[9.5rem] h-20 w-[3px] rounded-r bg-[#2a2a2a]" aria-hidden />

              <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.05rem] bg-white">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.src}
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0"
                  >
                    <LoupkidsImage
                      src={current.src}
                      alt={current.alt}
                      fill
                      sizes="(max-width: 1024px) 70vw, 20rem"
                      className="object-cover object-top"
                      priority={active === 0}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative aspect-[4/5] overflow-hidden bg-white sm:aspect-[5/6]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.src}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0"
              >
                <LoupkidsImage
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-[40%_30%]"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </FadeIn>
    </div>
  );
}
