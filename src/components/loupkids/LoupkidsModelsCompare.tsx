import { LOUPKIDS_MODELS_COMPARE } from "@/lib/content/loupkids-conversion";
import { FadeIn } from "./FadeIn";

export function LoupkidsModelsCompare({ compact = false }: { compact?: boolean }) {
  const { eyebrow, headline, subline, columns, rows } = LOUPKIDS_MODELS_COMPARE;

  return (
    <section
      className={
        compact
          ? "bg-[var(--lk-surface)] px-[var(--lk-section-x)] py-16 sm:py-20"
          : "lk-section border-t border-[var(--lk-line)]"
      }
    >
      <div className={compact ? "mx-auto max-w-[1200px]" : "lk-container"}>
        <FadeIn>
          <p className="lk-eyebrow">{eyebrow}</p>
          <h2 className="lk-display mt-3 max-w-3xl text-[clamp(1.65rem,3.5vw,2.35rem)] leading-[1.08]">
            {headline}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--lk-muted)] sm:text-[0.975rem]">
            {subline}
          </p>
        </FadeIn>
        <FadeIn className="mt-8 overflow-x-auto rounded-2xl bg-[var(--lk-bg)] shadow-[var(--lk-card-shadow)]">
          <table className="w-full min-w-[36rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-[var(--lk-line)] text-left">
                <th className="p-4 sm:p-5" scope="col" />
                {columns.map((col, i) => (
                  <th
                    key={col}
                    scope="col"
                    className={
                      i === 1
                        ? "bg-[var(--lk-ink)] p-4 font-medium text-white sm:p-5"
                        : "p-4 font-medium sm:p-5"
                    }
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
                    className="p-4 text-left text-xs font-medium uppercase tracking-wide text-[var(--lk-muted)] sm:p-5"
                  >
                    {row.label}
                  </th>
                  {row.values.map((value, i) => (
                    <td
                      key={`${row.label}-${i}`}
                      className={
                        i === 1
                          ? "bg-[var(--lk-ink)] p-4 font-medium text-white sm:p-5"
                          : "p-4 sm:p-5"
                      }
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </FadeIn>
      </div>
    </section>
  );
}
