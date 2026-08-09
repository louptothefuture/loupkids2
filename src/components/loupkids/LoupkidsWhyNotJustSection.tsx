import { LOUPKIDS_WHY_NOT_JUST } from "@/lib/content/loupkids-conversion";
import { FadeIn } from "./FadeIn";
import { RevealHeadline } from "./RevealHeadline";

export function LoupkidsWhyNotJustSection() {
  const { headline, blocks } = LOUPKIDS_WHY_NOT_JUST;

  return (
    <section className="lk-section-muted lk-section">
      <div className="lk-container">
        <FadeIn>
          <RevealHeadline as="h2" className="lk-display lk-h2" instant>
            {headline}
          </RevealHeadline>
        </FadeIn>

        <div className="mt-8 grid gap-6 sm:mt-12 lg:grid-cols-3 lg:gap-8">
          {blocks.map((block, i) => (
            <FadeIn key={block.title} delay={i * 0.05}>
              <div className="lk-card flex h-full flex-col p-6 sm:p-8">
                <h3 className="lk-display text-xl sm:text-2xl">{block.title}</h3>
                <div className="mt-4 space-y-3">
                  {block.body.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="lk-prose-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <p className="mt-auto pt-4 text-base font-medium text-[var(--lk-ink)]">{block.but}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
