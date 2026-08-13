import { LOUPKIDS_WHY_NOT_JUST } from "@/lib/content/loupkids-conversion";
import { FadeIn } from "./FadeIn";
import { RevealHeadline } from "./RevealHeadline";

export function LoupkidsWhyNotJustSection() {
  const { headline, blocks } = LOUPKIDS_WHY_NOT_JUST;

  return (
    <section className="lk-section-muted lk-section">
      <div className="lk-container">
        <FadeIn>
          <RevealHeadline
            as="h2"
            className="lk-display max-w-3xl text-[clamp(1.85rem,4vw,2.75rem)] leading-[1.08]"
            instant
          >
            {headline}
          </RevealHeadline>
        </FadeIn>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-12 md:grid-cols-3 md:gap-6 lg:gap-8">
          {blocks.map((block, i) => (
            <FadeIn key={block.title} delay={i * 0.05}>
              <div className="lk-card flex h-full flex-col border border-[var(--lk-line)] bg-[var(--lk-surface)] p-6 sm:p-7">
                <h3 className="lk-display text-[1.25rem] font-bold leading-tight sm:text-[1.35rem]">
                  {block.title}
                </h3>
                <div className="mt-4 space-y-3">
                  {block.body.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="lk-prose-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <p className="mt-auto pt-5 text-base font-medium text-[var(--lk-ink)]">{block.but}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
