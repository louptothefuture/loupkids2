"use client";

import { useState } from "react";
import { COMPARISON } from "@/lib/content/architecture";
import { Reveal } from "@/components/Reveal";

function Cell({ value }: { value: boolean }) {
  return (
    <td className="px-3 py-3 text-center">
      {value ? (
        <span className="text-ink" aria-label="Yes">
          ✓
        </span>
      ) : (
        <span className="text-ink/25" aria-label="No">
          —
        </span>
      )}
    </td>
  );
}

export function ComparisonSection() {
  const [openRow, setOpenRow] = useState<number | null>(null);

  return (
    <section id="compare" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <Reveal>
        <p className="label-mono text-steel">Compare</p>
        <h2 className="display mt-3 max-w-2xl text-4xl sm:text-5xl">
          LOUP vs everything else
        </h2>
        <p className="mt-4 max-w-xl text-ink-soft">
          How LOUP stacks up against other kids&apos; devices — and the smartphone you&apos;re
          trying to avoid.
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="card mt-10 hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-ink/10 bg-cream/50">
                <th className="px-4 py-4" scope="col" />
                {COMPARISON.columns.map((col, i) => (
                  <th
                    key={col}
                    scope="col"
                    className={`label-mono px-3 py-4 text-center ${i === 0 ? "text-ink" : "text-steel"}`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON.rows.map((row) => (
                <tr key={row.label} className="border-b border-ink/5 last:border-0">
                  <th scope="row" className="px-4 py-3 font-normal text-ink-soft">
                    {row.label}
                  </th>
                  {row.values.map((v, i) => (
                    <Cell key={`${row.label}-${COMPARISON.columns[i]}`} value={v} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      <div className="mt-10 space-y-2 lg:hidden">
        {COMPARISON.rows.map((row, i) => (
          <Reveal key={row.label} delay={i * 0.03}>
            <div className="card overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenRow(openRow === i ? null : i)}
                className="flex w-full items-center justify-between px-4 py-3 text-left"
                aria-expanded={openRow === i}
              >
                <span className="text-sm font-medium">{row.label}</span>
                <span className="text-steel">{openRow === i ? "−" : "+"}</span>
              </button>
              {openRow === i && (
                <div className="border-t border-ink/5 px-4 pb-3">
                  {COMPARISON.columns.map((col, ci) => (
                    <div key={col} className="flex items-center justify-between py-2 text-sm">
                      <span className={ci === 0 ? "font-medium" : "text-ink-soft"}>{col}</span>
                      <span>{row.values[ci] ? "✓" : "—"}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
