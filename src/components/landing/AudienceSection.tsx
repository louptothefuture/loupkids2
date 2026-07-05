"use client";

import Image from "next/image";
import { useState } from "react";
import { USE_CASES } from "@/lib/content/architecture";
import { PopHeadline, PopLabel } from "@/components/typography/PopType";

export function AudienceSection() {
  const [active, setActive] = useState(0);
  const current = USE_CASES[active];

  return (
    <section id="who" className="relative overflow-hidden bg-block-sun py-20 text-ink">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <PopLabel className="mb-3 block text-ink">Who it&apos;s for</PopLabel>
        <PopHeadline as="h2" size="xl" tone="dark">
          Your crew.
          <br />
          Your rules.
        </PopHeadline>

        <div className="mt-8 flex flex-wrap gap-3">
          {USE_CASES.map((u, i) => (
            <button
              key={u.id}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              className={`cursor-pointer rounded-full border-[3px] border-ink px-5 py-2.5 text-sm font-black uppercase shadow-[3px_3px_0_#0a0a0a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                active === i ? "bg-ink text-white" : "bg-white text-ink"
              }`}
            >
              {u.label}
            </button>
          ))}
        </div>

        <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-2">
          <div className="pop-card pop-card-tilt-left flex flex-col bg-white p-8 text-ink">
            <h3 className="display text-left text-2xl">{current.headline}</h3>
            <p className="mt-4 text-base font-semibold leading-relaxed text-ink">
              {current.body}
            </p>
          </div>

          <div className="pop-card pop-card-tilt-right relative min-h-[320px] overflow-hidden">
            <Image src={current.image} alt={current.alt} fill className="object-cover" sizes="50vw" />
          </div>
        </div>
      </div>
    </section>
  );
}
