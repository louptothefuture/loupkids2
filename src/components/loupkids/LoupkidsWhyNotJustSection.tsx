import { LOUPKIDS_WHY_NOT_JUST } from "@/lib/content/loupkids-conversion";
import { FadeIn } from "./FadeIn";
import { RevealHeadline } from "./RevealHeadline";

export function LoupkidsWhyNotJustSection() {
  const { headline, blocks } = LOUPKIDS_WHY_NOT_JUST;

  return (
    <section className="lk-section-muted lk-section border-t border-[var(--lk-line)]">
      <div className="lk-container">
        <FadeIn>
          <RevealHeadline as="h2" className="lk-display lk-h2" instant>
            {headline}
          </RevealHeadline>
        </FadeIn>

        <div className="mt-8 grid gap-0 sm:mt-12 lg:grid-cols-3 lg:items-stretch lg:gap-10">
          {blocks.map((block, i) => (
            <FadeIn
              key={block.title}
              delay={i * 0.05}
              className={`flex flex-col border-[var(--lk-line)] py-6 first:pt-0 last:pb-0 sm:py-8 lg:border-0 lg:py-0 ${
                i > 0 ? "border-t lg:border-t-0" : ""
              }`}
            >
              <h3 className="lk-display text-xl sm:text-2xl">{block.title}</h3>
              <div className="mt-4 space-y-3">
                {block.body.map((p) => (
                  <p key={p.slice(0, 40)} className="lk-prose-muted">
                    {p}
                  </p>
                ))}
              </div>
              <p className="mt-auto pt-4 text-base font-medium text-[var(--lk-ink)]">{block.but}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
