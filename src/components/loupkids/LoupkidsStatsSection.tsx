import { HOME_RELEVANCY } from "@/lib/content/loupkids-home-arc";
import { FadeIn } from "./FadeIn";

/** Black proof band after soft hero */
export function LoupkidsStatsSection() {
  return (
    <section className="bg-[var(--lk-ink)] text-white">
      <div className="mx-auto max-w-[1200px] px-[var(--lk-section-x)] py-16 sm:py-20 lg:py-24">
        <FadeIn className="mx-auto max-w-3xl text-center md:mx-0 md:max-w-2xl md:text-left">
          <h2 className="lk-display text-[clamp(1.85rem,4vw,2.75rem)] leading-[1.08]">
            {HOME_RELEVANCY.header}
          </h2>
          <p className="mt-4 text-[0.975rem] leading-relaxed text-white/75 sm:text-lg">
            {HOME_RELEVANCY.subhead}
          </p>
        </FadeIn>

        <div className="mt-12 grid overflow-hidden rounded-2xl border border-white/20 bg-white/5 md:grid-cols-3">
          {HOME_RELEVANCY.metrics.map((m, i) => (
            <FadeIn
              key={m.stat}
              delay={i * 0.05}
              className={`px-6 py-8 md:px-8 md:py-10 ${
                i > 0 ? "border-t border-white/15 md:border-l md:border-t-0" : ""
              }`}
            >
              <p className="lk-display text-4xl tracking-tight md:text-[2.75rem]">{m.stat}</p>
              <p className="mt-3 text-sm leading-snug text-white/70 md:text-[0.9375rem]">{m.label}</p>
              {"cite" in m && m.cite && m.citeHref ? (
                <a
                  href={m.citeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-6 items-center text-xs text-white/70 underline underline-offset-2 hover:text-white"
                >
                  {m.cite}
                </a>
              ) : null}
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
