"use client";

import { useState } from "react";
import { FadeIn } from "./FadeIn";

export function LoupkidsCardAccordion({
  items,
  dark = false,
  className = "",
}: {
  items: readonly { title: string; body: string }[];
  dark?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const bodyText = dark ? "text-white/75" : "text-[var(--lk-muted)]";
  const titleText = dark ? "text-white" : "";
  const iconText = dark ? "text-white/55" : "text-[var(--lk-muted-light)]";
  const cardBase = dark ? "lk-card lk-card-dark" : "lk-card";

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <FadeIn key={item.title} delay={i * 0.04}>
            <div className={`${cardBase} lk-card-pad transition-shadow duration-300 ${isOpen ? "lk-card-active" : ""}`}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
              >
                <span className={`lk-display text-lg sm:text-xl ${titleText}`}>{item.title}</span>
                <span
                  className={`shrink-0 text-lg transition-transform duration-300 ${iconText} ${isOpen ? "rotate-45" : ""}`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
              <div
                className={`grid transition-[grid-template-rows,opacity,margin] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              >
                <div className="overflow-hidden">
                  <p className={`text-[1.0625rem] leading-relaxed ${bodyText}`}>{item.body}</p>
                </div>
              </div>
            </div>
          </FadeIn>
        );
      })}
    </div>
  );
}
