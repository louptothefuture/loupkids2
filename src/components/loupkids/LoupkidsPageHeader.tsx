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
    <section className="lk-section-muted lk-section-cards border-b border-[var(--lk-line)]">
      <FadeIn className={`lk-container-narrow ${centered ? "text-center" : ""}`}>
        {eyebrow ? <p className="lk-eyebrow mb-2">{eyebrow}</p> : null}
        <h1 className="lk-display lk-h2">{title}</h1>
        {description ? (
          <p className={`lk-lead lk-prose-muted mt-4 max-w-2xl ${centered ? "mx-auto" : ""}`}>{description}</p>
        ) : null}
      </FadeIn>
    </section>
  );
}
