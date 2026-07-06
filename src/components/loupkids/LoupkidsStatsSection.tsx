"use client";

import { LOUPKIDS_INTRO, LOUPKIDS_STATS } from "@/lib/content/loupkids-site";
import { FadeIn } from "./FadeIn";
import { RevealHeadline } from "./RevealHeadline";

function StatEmphasis({ text }: { text: string }) {
  const parts = text.split(/(\d+\.?\d*[%]?|\d+ out of \d+)/gi);

  return (
    <>
      {parts.map((part, i) =>
        /^\d/.test(part) ? (
          <span key={i} className="font-semibold text-[var(--lk-ink)]">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function StatCard({
  text,
  label,
  tagline,
  index,
}: {
  text: string;
  label?: string;
  tagline?: string;
  index: number;
}) {
  return (
    <FadeIn delay={0.06 + index * 0.06}>
      <div className="lk-card lk-card-pad text-center">
        <p className="lk-stat-text">
          <StatEmphasis text={text} />
        </p>
        {tagline ? <p className="lk-stat-tagline">{tagline}</p> : null}
        {label ? <p className="lk-label mt-5">{label}</p> : null}
      </div>
    </FadeIn>
  );
}

export function LoupkidsStatsSection() {
  return (
    <section className="lk-section-muted lk-section-cards">
      <div className="lk-container-narrow">
        <FadeIn className="lk-card lk-card-pad mb-4 text-center sm:mb-5">
          <RevealHeadline as="h2" className="lk-h2 mx-auto max-w-[16ch]" instant>
            {LOUPKIDS_INTRO.subhead}
          </RevealHeadline>
        </FadeIn>

        <div className="flex flex-col gap-3 sm:gap-4">
          <StatCard index={0} text={LOUPKIDS_INTRO.body} tagline={LOUPKIDS_INTRO.cta} />
          {LOUPKIDS_STATS.map((item, i) => (
            <StatCard key={item.title} index={i + 1} text={item.text} label={item.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
