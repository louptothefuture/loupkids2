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
      <section className="lk-section-muted lk-section-cards border-b border-[var(--lk-line)]">
        <FadeIn className="lk-container-narrow">
          <p className="lk-eyebrow mb-2">Legal</p>
          <h1 className="lk-display lk-h2">{title}</h1>
          <p className="lk-label mt-4">Last updated {updated}</p>
        </FadeIn>
      </section>

      <article className="lk-section-cards lk-section-white">
        <FadeIn className="lk-container-narrow">
          <div className="lk-prose lk-prose-muted space-y-5 [&_a]:underline [&_a]:underline-offset-4 [&_h2]:lk-display [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:text-[var(--lk-ink)]">
            {children}
          </div>
          <Link href="/" className="lk-label mt-10 inline-block hover:text-[var(--lk-ink)]">
            ← Back to home
          </Link>
        </FadeIn>
      </article>
    </div>
  );
}
