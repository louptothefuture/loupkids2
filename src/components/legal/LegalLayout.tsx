import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

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
    <article className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <Reveal>
        <p className="label-mono text-loup-red">Legal</p>
        <h1 className="display mt-2 text-5xl sm:text-6xl">{title}</h1>
        <p className="label-mono mt-4 text-ink-soft">Last updated {updated}</p>
        <div className="prose-loops mt-10 space-y-4 text-ink-soft">{children}</div>
        <Link href="/" className="link-underline label-mono mt-12 inline-block">
          ← Back to home
        </Link>
      </Reveal>
    </article>
  );
}
