import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/loupkids/FadeIn";
import {
  RAISE_COMPARE,
  RAISE_EMAIL,
  RAISE_EXIT,
  RAISE_FINANCIALS,
  RAISE_GTM,
  RAISE_MAILTO,
  RAISE_ORIGIN,
  RAISE_PROBLEM,
  RAISE_PRODUCT,
  RAISE_ROADMAP,
  RAISE_TEAM,
  RAISE_TRACTION,
} from "@/lib/content/loupkids-raise";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Raise data room",
  description: "Supporting materials for the Loup pre-seed raise. Unlinked.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE.url}/raise/data` },
};

function SectionLabel({ children }: { children: string }) {
  return <p className="lk-eyebrow">{children}</p>;
}

export default function RaiseDataPage() {
  return (
    <article className="bg-[var(--lk-bg)]">
      <section className="border-b border-[var(--lk-line)] px-[var(--lk-section-x)] py-12 sm:py-14">
        <FadeIn className="mx-auto max-w-[1200px]">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--lk-muted)]">
            Data room · not in nav
          </p>
          <h1 className="lk-display mt-3 text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.08]">
            Supporting materials
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--lk-muted)]">
            Detail behind{" "}
            <Link href="/raise" className="underline underline-offset-4">
              the raise page
            </Link>
            . Full deck on request —{" "}
            <a href={RAISE_MAILTO} className="underline underline-offset-4">
              {RAISE_EMAIL}
            </a>
            .
          </p>
        </FadeIn>
      </section>

      <section className="border-b border-[var(--lk-line)] px-[var(--lk-section-x)] py-16 sm:py-20">
        <FadeIn className="mx-auto max-w-[1200px]">
          <SectionLabel>{RAISE_ORIGIN.eyebrow}</SectionLabel>
          <h2 className="lk-display mt-3 text-[clamp(1.85rem,4vw,2.75rem)] leading-[1.08]">
            {RAISE_ORIGIN.headline}
          </h2>
          <div className="mt-5 max-w-2xl space-y-4 text-[0.975rem] leading-relaxed text-[var(--lk-ink)]/75">
            {RAISE_ORIGIN.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
          <p className="lk-card mt-8 max-w-2xl rounded-2xl p-6 text-sm leading-relaxed text-[var(--lk-muted)]">
            {RAISE_PRODUCT.access}
          </p>
        </FadeIn>
      </section>

      <section className="border-b border-[var(--lk-line)] px-[var(--lk-section-x)] py-16 sm:py-20">
        <FadeIn className="mx-auto max-w-[1200px]">
          <h2 className="lk-display text-[clamp(1.85rem,4vw,2.75rem)] leading-[1.08]">The stakes</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {RAISE_PROBLEM.pillars.map((pillar) => (
              <div key={pillar.title} className="lk-card rounded-2xl p-6">
                <h3 className="lk-display text-xl">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--lk-muted)]">{pillar.body}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="border-b border-[var(--lk-line)] px-[var(--lk-section-x)] py-16 sm:py-20">
        <FadeIn className="mx-auto max-w-[1200px]">
          <SectionLabel>{RAISE_COMPARE.eyebrow}</SectionLabel>
          <h2 className="lk-display mt-3 max-w-3xl text-[clamp(1.85rem,4vw,2.75rem)] leading-[1.08]">
            {RAISE_COMPARE.headline}
          </h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--lk-line)]">
                  <th className="py-3 pr-4 font-medium text-[var(--lk-muted)]"> </th>
                  {RAISE_COMPARE.columns.map((col, i) => (
                    <th
                      key={col}
                      className={`py-3 pr-4 font-medium ${i === 0 ? "text-[var(--lk-ink)]" : "text-[var(--lk-muted)]"}`}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RAISE_COMPARE.rows.map((row) => (
                  <tr key={row[0]} className="border-b border-[var(--lk-line)]">
                    {row.map((cell, i) => (
                      <td
                        key={`${row[0]}-${i}`}
                        className={`py-3 pr-4 ${i <= 1 ? "font-medium text-[var(--lk-ink)]" : "text-[var(--lk-muted)]"}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-[var(--lk-muted)]">{RAISE_COMPARE.note}</p>
        </FadeIn>
      </section>

      <section className="border-b border-[var(--lk-line)] px-[var(--lk-section-x)] py-16 sm:py-20">
        <FadeIn className="mx-auto max-w-[1200px]">
          <h2 className="lk-display text-[clamp(1.85rem,4vw,2.75rem)] leading-[1.08]">Weekly traction</h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--lk-line)]">
                  <th className="py-3 pr-4 font-medium text-[var(--lk-muted)]"> </th>
                  {RAISE_TRACTION.weeks.headers.map((h) => (
                    <th key={h} className="py-3 pr-4 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RAISE_TRACTION.weeks.rows.map((row) => (
                  <tr key={row[0]} className="border-b border-[var(--lk-line)]">
                    {row.map((cell, i) => (
                      <td
                        key={`${row[0]}-${i}`}
                        className={`py-3 pr-4 ${i === 0 ? "font-medium" : "text-[var(--lk-muted)]"}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </section>

      <section id="financials" className="border-b border-[var(--lk-line)] px-[var(--lk-section-x)] py-16 sm:py-20">
        <FadeIn className="mx-auto max-w-[1200px]">
          <SectionLabel>{RAISE_FINANCIALS.eyebrow}</SectionLabel>
          <h2 className="lk-display mt-3 max-w-3xl text-[clamp(1.85rem,4vw,2.75rem)] leading-[1.08]">
            {RAISE_FINANCIALS.headline}
          </h2>
          <p className="mt-4 text-sm text-[var(--lk-muted)]">{RAISE_FINANCIALS.note}</p>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--lk-line)]">
                  <th className="py-3 pr-4 font-medium text-[var(--lk-muted)]"> </th>
                  {RAISE_FINANCIALS.headers.map((h) => (
                    <th key={h} className="py-3 pr-4 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RAISE_FINANCIALS.rows.map((row) => (
                  <tr key={row[0]} className="border-b border-[var(--lk-line)]">
                    {row.map((cell, i) => (
                      <td
                        key={`${row[0]}-${i}`}
                        className={`py-3 pr-4 ${i === 0 || row[0] === "Revenue" || row[0] === "EBITDA" ? "font-medium" : "text-[var(--lk-muted)]"}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {RAISE_FINANCIALS.highlights.map((line) => (
              <li key={line} className="text-sm font-medium">
                {line}
              </li>
            ))}
          </ul>
        </FadeIn>
      </section>

      <section className="border-b border-[var(--lk-line)] px-[var(--lk-section-x)] py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px]">
          <FadeIn>
            <SectionLabel>{RAISE_GTM.eyebrow}</SectionLabel>
            <h2 className="lk-display mt-3 max-w-3xl text-[clamp(1.85rem,4vw,2.75rem)] leading-[1.08]">
              {RAISE_GTM.headline}
            </h2>
          </FadeIn>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {RAISE_GTM.channels.map((channel, i) => (
              <FadeIn key={channel.title} delay={i * 0.04} className="lk-card rounded-2xl p-6">
                <h3 className="lk-display text-xl">{channel.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--lk-muted)]">{channel.body}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--lk-line)] px-[var(--lk-section-x)] py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px]">
          <FadeIn>
            <SectionLabel>{RAISE_ROADMAP.eyebrow}</SectionLabel>
          </FadeIn>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {RAISE_ROADMAP.items.map((item, i) => (
              <FadeIn key={item.when} delay={i * 0.05} className="rounded-2xl border border-[var(--lk-line)] p-6">
                <p className="text-xs uppercase tracking-[0.12em] text-[var(--lk-muted)]">{item.when}</p>
                <h3 className="lk-display mt-2 text-xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--lk-muted)]">{item.body}</p>
              </FadeIn>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-[var(--lk-section-x)] py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-2">
          <FadeIn>
            <SectionLabel>{RAISE_TEAM.eyebrow}</SectionLabel>
            <h2 className="lk-display mt-3 text-[clamp(1.85rem,4vw,2.75rem)] leading-[1.08]">
              {RAISE_TEAM.headline}
            </h2>
            <ul className="mt-8 space-y-5">
              {RAISE_TEAM.people.map((person) => (
                <li key={person.name}>
                  <p className="lk-display text-xl">{person.name}</p>
                  <p className="mt-1 text-sm text-[var(--lk-muted)]">{person.role}</p>
                </li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn delay={0.06}>
            <SectionLabel>{RAISE_EXIT.eyebrow}</SectionLabel>
            <h2 className="lk-display mt-3 text-[clamp(1.85rem,4vw,2.75rem)] leading-[1.08]">
              {RAISE_EXIT.headline}
            </h2>
            <p className="mt-5 text-[0.975rem] leading-relaxed text-[var(--lk-ink)]/75">{RAISE_EXIT.body}</p>
          </FadeIn>
        </div>
      </section>
    </article>
  );
}
