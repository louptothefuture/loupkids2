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
  mediaLabel: string;
};

const STEP_VISUALS: Visual[] = [
  {
    src: "/images/setup/loup-setup.gif",
    alt: "Parent app setup — create account and scan QR",
    kind: "phone",
    mediaLabel: "In the parent app",
  },
  {
    src: "/images/setup/loup-manage.gif",
    alt: "Parent app — home, contacts, quiet hours, and page",
    kind: "phone",
    mediaLabel: "Still in the parent app",
  },
  {
    src: "/images/lifestyle-new/girl-kitchen.jpg",
    alt: "Kid talking on Loup at the kitchen counter while a parent cooks",
    kind: "photo",
    mediaLabel: "On the Loup",
  },
];

function PhoneShell({
  visual,
  reduce,
  priority,
}: {
  visual: Visual;
  reduce: boolean | null;
  priority?: boolean;
}) {
  return (
    <div className="mx-auto w-full max-w-[16.5rem] sm:max-w-[18rem]">
      <div className="relative rounded-[2.55rem] bg-[#111] p-[0.65rem] shadow-[0_20px_50px_rgba(0,0,0,0.16)] ring-1 ring-black/10">
        <span className="absolute -left-[3px] top-[6.75rem] h-7 w-[3px] rounded-l bg-[#2a2a2a]" aria-hidden />
        <span className="absolute -left-[3px] top-[9.25rem] h-12 w-[3px] rounded-l bg-[#2a2a2a]" aria-hidden />
        <span className="absolute -right-[3px] top-[8.5rem] h-[4.5rem] w-[3px] rounded-r bg-[#2a2a2a]" aria-hidden />
        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.95rem] bg-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={visual.src}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="absolute inset-0"
            >
              <LoupkidsImage
                src={visual.src}
                alt={visual.alt}
                fill
                sizes="(max-width: 1024px) 70vw, 18rem"
                className="object-cover object-top"
                priority={priority}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

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
      { rootMargin: "-28% 0px -45% 0px", threshold: [0.25, 0.5, 0.75] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [steps.length]);

  const current = STEP_VISUALS[active] ?? STEP_VISUALS[0];

  return (
    <div className="lk-container">
      <div className="mb-10 lg:hidden">
        <div className="rounded-3xl border border-[var(--lk-line)] bg-[#fafafa] px-5 py-6">
          <p className="text-center text-xs font-medium uppercase tracking-[0.14em] text-[var(--lk-muted)]">
            Step {active + 1} of {steps.length} · {current.mediaLabel}
          </p>
          <div className="mt-5">
            {current.kind === "phone" ? (
              <PhoneShell visual={current} reduce={reduce} priority />
            ) : (
              <div className="relative mx-auto aspect-[4/5] max-w-[18rem] overflow-hidden rounded-2xl">
                <LoupkidsImage
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="70vw"
                  className="object-cover object-[40%_30%]"
                />
              </div>
            )}
          </div>
          <div className="mt-5 flex justify-center gap-2" role="tablist" aria-label="Setup steps">
            {steps.map((s, i) => (
              <button
                key={s.step}
                type="button"
                role="tab"
                aria-selected={active === i}
                onClick={() => {
                  setActive(i);
                  itemRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className={`h-2 rounded-full transition-all ${
                  active === i ? "w-7 bg-[var(--lk-ink)]" : "w-2 bg-[var(--lk-line)]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(17rem,0.85fr)] lg:gap-16 xl:gap-20">
        <ol className="relative">
          <span
            className="absolute bottom-6 left-[1.15rem] top-6 hidden w-px bg-[var(--lk-line)] sm:block"
            aria-hidden
          />

          {steps.map((s, i) => {
            const isActive = active === i;
            const visual = STEP_VISUALS[i] ?? STEP_VISUALS[0];
            return (
              <li
                key={s.step}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className={i > 0 ? "mt-3 sm:mt-4" : ""}
              >
                <FadeIn delay={i * 0.04}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-current={isActive ? "step" : undefined}
                    className={`group relative grid w-full grid-cols-[2.3rem_1fr] gap-4 rounded-2xl border px-3 py-5 text-left transition-colors sm:gap-5 sm:px-4 sm:py-6 ${
                      isActive
                        ? "border-[var(--lk-ink)] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
                        : "border-transparent hover:border-[var(--lk-line)] hover:bg-white/70"
                    }`}
                  >
                    <span
                      className={`relative z-[1] mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-[var(--lk-ink)] text-white"
                          : "border border-[var(--lk-line)] bg-white text-[var(--lk-muted)]"
                      }`}
                      aria-hidden
                    >
                      {s.step}
                    </span>

                    <span className="min-w-0">
                      <span className="lk-label">{s.section}</span>
                      <span className="lk-display mt-2 block text-xl tracking-tight sm:text-2xl">
                        {s.title}
                      </span>
                      <span
                        className={`mt-2 block text-[0.9375rem] leading-relaxed sm:text-base ${
                          isActive ? "text-[var(--lk-ink)]/75" : "text-[var(--lk-muted)]"
                        }`}
                      >
                        {s.body}
                      </span>
                      <span className="mt-3 block text-xs font-medium uppercase tracking-[0.12em] text-[var(--lk-muted)] lg:hidden">
                        {visual.mediaLabel}
                      </span>
                    </span>
                  </button>
                </FadeIn>
              </li>
            );
          })}
        </ol>

        <FadeIn delay={0.08} className="hidden lg:sticky lg:top-28 lg:block">
          <div className="rounded-3xl border border-[var(--lk-line)] bg-[#fafafa] px-6 py-7">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--lk-muted)]">
                Step {active + 1} of {steps.length}
              </p>
              <p className="text-xs font-medium text-[var(--lk-ink)]">{current.mediaLabel}</p>
            </div>

            <div className="mt-6">
              {current.kind === "phone" ? (
                <PhoneShell visual={current} reduce={reduce} priority={active === 0} />
              ) : (
                <div className="relative mx-auto aspect-[4/5] max-w-[18rem] overflow-hidden rounded-2xl">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.src}
                      initial={reduce ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={reduce ? undefined : { opacity: 0 }}
                      transition={{ duration: 0.28 }}
                      className="absolute inset-0"
                    >
                      <LoupkidsImage
                        src={current.src}
                        alt={current.alt}
                        fill
                        sizes="18rem"
                        className="object-cover object-[40%_30%]"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2">
              {steps.map((s, i) => (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`rounded-xl border px-2 py-2.5 text-center transition-colors ${
                    active === i
                      ? "border-[var(--lk-ink)] bg-white"
                      : "border-[var(--lk-line)] bg-transparent hover:bg-white/80"
                  }`}
                >
                  <span className="block text-[0.65rem] font-medium uppercase tracking-[0.1em] text-[var(--lk-muted)]">
                    Step {s.step}
                  </span>
                  <span className="mt-1 block truncate text-xs font-medium text-[var(--lk-ink)]">
                    {s.section}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={0.16} className="lk-prose-muted mt-12 border-t border-[var(--lk-line)] pt-8 sm:mt-14">
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
  );
}
