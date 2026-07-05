"use client";

import Image from "next/image";
import { useState } from "react";
import { USE_CASES } from "@/lib/content/architecture";
import { Reveal } from "@/components/Reveal";

export function UseCasesSection() {
  const [active, setActive] = useState(USE_CASES[0].id);
  const current = USE_CASES.find((u) => u.id === active) ?? USE_CASES[0];

  return (
    <section id="use-cases" className="border-y border-ink/10 bg-surface py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="label-mono text-steel">Who it&apos;s for</p>
          <h2 className="display mt-3 text-4xl sm:text-5xl">Made for real life</h2>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-2 border-b border-ink/10 pb-6">
          {USE_CASES.map((u) => (
            <button
              key={u.id}
              type="button"
              onClick={() => setActive(u.id)}
              className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active === u.id
                  ? "bg-ink text-surface"
                  : "text-ink-soft hover:bg-cream hover:text-ink"
              }`}
            >
              {u.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <h3 className="display text-3xl sm:text-4xl">{current.headline}</h3>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{current.body}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream ring-1 ring-ink/10">
              <Image
                src={current.image}
                alt={current.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
