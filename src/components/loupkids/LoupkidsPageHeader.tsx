"use client";

import { FadeIn } from "./FadeIn";

export function LoupkidsPageHeader({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <section className="lk-section-white lk-section-header border-b border-[var(--lk-line)]">
      <FadeIn className={`lk-container-prose ${centered ? "text-center" : "text-left"}`}>
        <h1 className="lk-display lk-h2">{title}</h1>
        {description ? (
          <p className={`lk-lead lk-prose-muted mt-4 ${centered ? "mx-auto" : ""}`}>{description}</p>
        ) : null}
      </FadeIn>
    </section>
  );
}
