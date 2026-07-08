"use client";

import { useState } from "react";
import { LOUPKIDS_USE_CASES } from "@/lib/content/loupkids-site";
import { LoupkidsImage } from "@/components/loupkids/LoupkidsImage";
import { Reveal } from "@/components/Reveal";

export function DevCampaignUseCasesSection() {
  const [active, setActive] = useState(0);
  const item = LOUPKIDS_USE_CASES[active];

  return (
    <section id="use-cases" className="border-b-2 border-ink bg-neutral-50 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <h2 className="display max-w-2xl text-4xl text-ink sm:text-5xl">
            Built for real life — not the app store.
          </h2>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-2">
          {LOUPKIDS_USE_CASES.map((uc, i) => (
            <button
              key={uc.id}
              type="button"
              onClick={() => setActive(i)}
              className={`cursor-pointer border-2 px-4 py-2 text-sm font-medium transition-colors ${
                i === active
                  ? "border-ink bg-ink text-white"
                  : "border-ink bg-white text-ink-soft hover:text-ink"
              }`}
            >
              {uc.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <Reveal delay={0.06}>
            <h3 className="display text-2xl text-ink sm:text-3xl">{item.headline}</h3>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">{item.body}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border-2 border-ink bg-neutral-100">
              <LoupkidsImage src={item.image} alt={item.alt} fill sizes="50vw" className="object-cover" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
