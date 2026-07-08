"use client";

import { useState } from "react";
import { BRAIN_COMPARISON, type BrainFact } from "@/lib/content/brain-comparison";
import { LoupkidsOrderCta } from "./conversion";
import { FadeIn } from "./FadeIn";
import { RevealHeadline } from "./RevealHeadline";

function FactCard({
  fact,
  isOpen,
  onToggle,
  tone,
}: {
  fact: BrainFact;
  isOpen: boolean;
  onToggle: () => void;
  tone: "screen" | "person";
}) {
  const accent =
    tone === "screen"
      ? "border-l-[#94a3b8] hover:border-l-[#64748b]"
      : "border-l-[var(--lk-ink)] hover:border-l-[var(--lk-ink)]";

  return (
    <div className={`lk-brain-fact border-l-2 pl-4 transition-colors ${accent} ${isOpen ? "lk-brain-fact-open" : ""}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex min-h-11 w-full cursor-pointer flex-col gap-1 py-3 text-left sm:py-3.5"
      >
        <span className="text-base font-medium leading-snug text-[var(--lk-ink)]">{fact.label}</span>
        <p className="text-[0.9375rem] leading-relaxed text-[var(--lk-muted)]">{fact.body}</p>
        <span className="lk-label mt-1 text-[0.65rem] text-[var(--lk-muted-light)]">
          {isOpen ? fact.source : "Source →"}
        </span>
      </button>
    </div>
  );
}

function FactColumn({
  title,
  intro,
  facts,
  tone,
}: {
  title: string;
  intro: string;
  facts: readonly BrainFact[];
  tone: "screen" | "person";
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const headerBg = tone === "screen" ? "bg-[#f4f6f8]" : "bg-[#fafafa]";

  return (
    <div className={`lk-card flex h-full flex-col overflow-hidden ${tone === "screen" ? "lk-brain-col-screen" : "lk-brain-col-person"}`}>
      <div className={`border-b border-[var(--lk-line)] px-5 py-5 sm:px-6 ${headerBg}`}>
        <h3 className="lk-display text-xl sm:text-2xl">{title}</h3>
        <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-[var(--lk-muted)]">{intro}</p>
      </div>
      <div className="divide-y divide-[var(--lk-line)] px-5 sm:px-6">
        {facts.map((fact) => (
          <FactCard
            key={fact.id}
            fact={fact}
            tone={tone}
            isOpen={openId === fact.id}
            onToggle={() => setOpenId(openId === fact.id ? null : fact.id)}
          />
        ))}
      </div>
    </div>
  );
}

export function BrainComparisonSection() {
  const { headline, subline, screen, inPerson, bridge } = BRAIN_COMPARISON;

  return (
    <section className="lk-section-muted lk-section" aria-labelledby="brain-comparison-heading">
      <div className="lk-container">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <RevealHeadline as="h2" className="lk-display lk-h2" instant>
            <span id="brain-comparison-heading">{headline}</span>
          </RevealHeadline>
          <p className="lk-lead mx-auto mt-4 max-w-xl text-[var(--lk-muted)]">{subline}</p>
        </FadeIn>

        <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8 xl:mt-12">
          <FadeIn delay={0.06}>
            <FactColumn title={screen.title} intro={screen.intro} facts={screen.facts} tone="screen" />
          </FadeIn>
          <FadeIn delay={0.12}>
            <FactColumn title={inPerson.title} intro={inPerson.intro} facts={inPerson.facts} tone="person" />
          </FadeIn>
        </div>

        <FadeIn className="lk-cta-stack mx-auto mt-12 w-full max-w-lg xl:mt-14" delay={0.18}>
          <RevealHeadline as="h3" className="lk-display text-xl sm:text-2xl" instant>
            {bridge.headline}
          </RevealHeadline>
          <p className="text-[var(--lk-muted)]">{bridge.body}</p>
          <LoupkidsOrderCta variant="light" />
        </FadeIn>
      </div>
    </section>
  );
}
