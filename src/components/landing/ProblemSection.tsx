import { LANDING_STATS } from "@/lib/content/story";
import { PopHeadline } from "@/components/typography/PopType";

export function ProblemSection() {
  return (
    <section id="problem" className="relative overflow-hidden bg-block-cobalt py-24 text-white">
      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
        <PopHeadline as="h2" size="xl">
          The smartphone
          <br />
          trap is real.
        </PopHeadline>
        <p className="mx-auto mt-5 max-w-xl text-lg font-semibold text-white">
          Loup is the escape hatch — connection without the feed.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {LANDING_STATS.map((item) => (
            <div key={item.stat} className="pop-card bg-white p-6 text-ink">
              <p className="stat-number">{item.stat}</p>
              <p className="mt-2 text-sm font-semibold text-ink">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
