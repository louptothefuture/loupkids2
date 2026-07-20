import { LOUPKIDS_COMPARISON } from "@/lib/content/loupkids-site";
import { Reveal } from "@/components/Reveal";

const loupCell = "bg-ink px-4 py-4 text-sm font-medium leading-relaxed text-white sm:px-5 sm:py-5 sm:text-base";

export function DevCampaignComparisonSection() {
  const { columns, rows } = LOUPKIDS_COMPARISON;

  return (
    <section id="compare" className="border-b-2 border-ink bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <h2 className="display text-4xl text-ink sm:text-5xl">
            Loup vs. the other options
          </h2>
          <p className="mt-4 max-w-2xl text-base text-ink-soft">
            What you get with Loup — and what smartphones, watches, and flip phones can&apos;t match.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-10 overflow-x-auto border-2 border-ink sm:mt-12">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm sm:text-base">
              <thead>
                <tr className="border-b-2 border-ink">
                  <th className="bg-neutral-50 p-4 sm:p-5" scope="col" />
                  {columns.map((col, i) => (
                    <th
                      key={col}
                      scope="col"
                      className={
                        i === 0
                          ? `${loupCell} display text-lg sm:text-xl`
                          : "bg-neutral-50 p-4 sm:p-5 font-medium text-ink-soft sm:p-5"
                      }
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="border-b border-ink last:border-0">
                    <th
                      scope="row"
                      className="bg-neutral-50/80 p-4 text-left align-top text-xs font-medium uppercase tracking-wide text-ink-soft sm:p-5 sm:text-sm sm:normal-case sm:tracking-normal"
                    >
                      {row.label}
                    </th>
                    {row.values.map((value, i) => (
                      <td key={i} className={i === 0 ? `${loupCell} align-top` : "p-4 align-top text-ink-soft sm:p-5"}>
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
