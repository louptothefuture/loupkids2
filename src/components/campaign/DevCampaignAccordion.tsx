"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";

export function DevCampaignAccordion({
  items,
  dark = false,
}: {
  items: readonly { title: string; body: string }[];
  dark?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div
      className={`divide-y border-y-2 ${dark ? "divide-white/20 border-white/20" : "divide-ink/15 border-ink"}`}
    >
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <Reveal key={item.title} delay={i * 0.04}>
            <div>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left sm:py-6"
              >
                <span className={`display text-xl sm:text-2xl ${dark ? "text-white" : "text-ink"}`}>
                  {item.title}
                </span>
                <span
                  className={`shrink-0 text-xl transition-transform duration-300 ${dark ? "text-white/60" : "text-ink-soft"} ${isOpen ? "rotate-45" : ""}`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              >
                <div className="overflow-hidden">
                  <p className={`pb-5 text-base leading-relaxed sm:pb-6 ${dark ? "text-white/75" : "text-ink-soft"}`}>
                    {item.body}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
