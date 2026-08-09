import Link from "next/link";
import type { ReactNode } from "react";
import { FadeIn } from "@/components/loupkids/FadeIn";

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div>
      <section className="lk-section-white lk-section-header border-b border-[var(--lk-line)]">
        <FadeIn className="lk-container-prose text-left">
          <h1 className="lk-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight">{title}</h1>
          <p className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-[var(--lk-muted)]">
            Last updated {updated}
          </p>
        </FadeIn>
      </section>

      <article className="lk-section-white lk-page-body">
        <FadeIn className="lk-container-prose">
          <div className="lk-prose lk-prose-muted space-y-5 [&_a]:underline [&_a]:underline-offset-4 [&_h2]:lk-display [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:text-[var(--lk-ink)]">
            {children}
          </div>
          <Link href="/" className="lk-read-link mt-10 inline-block">
            ← Back to home
          </Link>
        </FadeIn>
      </article>
    </div>
  );
}
