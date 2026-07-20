import { LOUPKIDS_CUSTOMIZE } from "@/lib/content/loupkids-site";
import { FadeIn } from "./FadeIn";
import { LoupkidsImage } from "./LoupkidsImage";
import { RevealHeadline } from "./RevealHeadline";

/** Coming-soon custom plates — store / PDP */
export function LoupkidsCustomizeStoreSection() {
  const { headline, body, badge, plates } = LOUPKIDS_CUSTOMIZE;

  return (
    <section className="lk-section-white lk-section border-t border-[var(--lk-line)]">
      <div className="lk-container">
        <FadeIn className="max-w-2xl">
          <p className="lk-label">{badge}</p>
          <RevealHeadline as="h2" className="lk-display lk-h2 mt-3" instant>
            {headline}
          </RevealHeadline>
          <p className="lk-prose-muted mt-4">{body}</p>
        </FadeIn>

        <div className="mt-8 grid grid-cols-2 gap-2.5 sm:mt-12 sm:grid-cols-3 sm:gap-4">
          {plates.map((plate, i) => (
            <FadeIn
              key={plate.src}
              delay={i * 0.04}
              className="relative aspect-square overflow-hidden border border-[var(--lk-line)] bg-neutral-50"
            >
              <LoupkidsImage
                src={plate.src}
                alt={plate.alt}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-contain p-3 sm:p-6"
              />
              <span className="absolute bottom-2 left-2 bg-[var(--lk-ink)] px-1.5 py-0.5 text-[0.6rem] font-medium uppercase tracking-wider text-white sm:bottom-3 sm:left-3 sm:px-2 sm:py-1 sm:text-[0.65rem]">
                {badge}
              </span>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
