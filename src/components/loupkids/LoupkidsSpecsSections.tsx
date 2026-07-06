"use client";

import { LOUPKIDS_COMPARISON, LOUPKIDS_SPECS } from "@/lib/content/loupkids-site";
import { FadeIn } from "./FadeIn";
import { RevealHeadline } from "./RevealHeadline";

export function LoupkidsComparisonSection() {
  const { columns, rows } = LOUPKIDS_COMPARISON;

  return (
    <section className="lk-section-white lk-section-content">
      <FadeIn className="lk-container">
        <p className="lk-eyebrow mb-3">The honest comparison</p>
        <RevealHeadline as="h2" className="lk-display lk-h2">
          Loup vs. the other options
        </RevealHeadline>

        <div className="lk-table-wrap mt-10 overflow-x-auto border border-[var(--lk-line)] bg-white sm:mt-12">
          <table className="w-full min-w-[720px] border-collapse text-[0.9375rem] sm:text-base">
            <thead>
              <tr className="border-b border-[var(--lk-line)] bg-neutral-50/90 text-left">
                <th className="p-4 sm:p-5" scope="col" />
                {columns.map((col, i) => (
                  <th
                    key={col}
                    scope="col"
                    className={`p-4 sm:p-5 text-base font-medium sm:text-lg ${i === 0 ? "text-[var(--lk-ink)]" : "text-[var(--lk-muted)]"}`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-[var(--lk-line)] last:border-0">
                  <th
                    scope="row"
                    className="p-4 sm:p-5 text-left align-top text-xs font-medium uppercase tracking-wide text-[var(--lk-muted)] sm:text-sm sm:font-normal sm:normal-case sm:tracking-normal"
                  >
                    {row.label}
                  </th>
                  {row.values.map((value, i) => (
                    <td
                      key={i}
                      className={`p-4 sm:p-5 align-top leading-relaxed ${i === 0 ? "bg-neutral-50/80 font-medium text-[var(--lk-ink)]" : "text-[var(--lk-muted)]"}`}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FadeIn>
    </section>
  );
}

export function LoupkidsSpecsSection() {
  const groups = [...new Set(LOUPKIDS_SPECS.map((s) => s.group))];

  return (
    <section className="lk-section-white lk-section" id="specs">
      <FadeIn className="lk-container">
        <p className="lk-eyebrow mb-3">Tech specs</p>
        <RevealHeadline as="h2" className="lk-display lk-h2">
          The fine print
        </RevealHeadline>

        <div className="mt-10 grid gap-5 sm:mt-12 md:grid-cols-2 md:gap-6">
          {groups.map((group, gi) => (
            <FadeIn key={group} delay={gi * 0.05}>
              <div className="lk-spec-card h-full">
                <h3 className="lk-display lk-h3">{group}</h3>
                <dl className="mt-5">
                  {LOUPKIDS_SPECS.filter((s) => s.group === group).map((spec, si) => (
                    <div
                      key={spec.label}
                      className={`flex items-start justify-between gap-6 py-3.5 text-[0.9375rem] sm:text-base ${si > 0 ? "border-t border-[var(--lk-line)]" : ""}`}
                    >
                      <dt className="text-[var(--lk-muted)]">{spec.label}</dt>
                      <dd className="max-w-[58%] text-right font-medium leading-snug">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </FadeIn>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
