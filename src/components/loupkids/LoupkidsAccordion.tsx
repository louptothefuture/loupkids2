"use client";

import { useState } from "react";
import { FadeIn } from "./FadeIn";

export function LoupkidsAccordion({
  items,
  dark = false,
  className = "",
}: {
  items: readonly { title: string; body: string }[];
  dark?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const border = dark ? "divide-white/15 border-white/15" : "divide-[var(--lk-line)] border-[var(--lk-line)]";
  const bodyText = dark ? "text-white/75" : "text-[var(--lk-muted)]";
  const titleText = dark ? "text-white" : "";
  const iconText = dark ? "text-white/60" : "text-[var(--lk-muted)]";

  return (
    <div className={`divide-y border-y ${border} ${className}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <FadeIn key={item.title} delay={i * 0.05}>
            <div>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left transition-opacity hover:opacity-80 sm:py-6"
              >
                <span className={`lk-display text-xl sm:text-2xl ${titleText}`}>{item.title}</span>
                <span
                  className={`shrink-0 text-xl transition-transform duration-300 ${iconText} ${isOpen ? "rotate-45" : ""}`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              >
                <div className="overflow-hidden">
                  <p className={`pb-5 text-[1.0625rem] leading-relaxed sm:pb-6 ${bodyText}`}>{item.body}</p>
                </div>
              </div>
            </div>
          </FadeIn>
        );
      })}
    </div>
  );
}
