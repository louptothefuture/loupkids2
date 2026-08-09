import Image from "next/image";
import { LOUPKIDS_BUILT_LIKE_GEAR } from "@/lib/content/loupkids-conversion";
import { FadeIn } from "./FadeIn";

export function LoupkidsBuiltLikeGear({ compact = false }: { compact?: boolean }) {
  const { title, cards } = LOUPKIDS_BUILT_LIKE_GEAR;

  return (
    <section
      className={`bg-[var(--lk-bg)] ${
        compact ? "px-[var(--lk-section-x)] py-16 sm:py-20 lg:py-24" : "lk-section"
      }`}
    >
      <div className={compact ? "mx-auto w-full max-w-[calc(1200px-2*var(--lk-section-x))]" : "lk-container"}>
        <FadeIn>
          <h2
            className={`lk-display leading-[1.08] ${
              compact
                ? "text-[clamp(1.5rem,3.5vw,2.15rem)]"
                : "text-2xl sm:text-3xl"
            }`}
          >
            {title}
          </h2>
        </FadeIn>
        <div
          className={`grid gap-4 md:grid-cols-3 ${
            compact ? "mt-6 sm:mt-8 md:gap-5" : "mt-8 gap-8 sm:mt-10"
          }`}
        >
          {cards.map((card, i) => (
            <FadeIn key={card.title} delay={i * 0.04}>
              <figure className="lk-image-hover lk-card lk-card-flush h-full overflow-hidden">
                <div
                  className={`relative overflow-hidden bg-[var(--lk-cream)] ${
                    compact ? "aspect-[4/5]" : "aspect-[3/4]"
                  }`}
                >
                  <Image
                    src={card.src}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain object-center p-3 sm:p-4"
                  />
                </div>
                <figcaption className={compact ? "p-4" : "p-5"}>
                  <h3
                    className={`lk-display ${
                      compact ? "text-base sm:text-lg" : "text-lg"
                    }`}
                  >
                    {card.title}
                  </h3>
                  <p
                    className={`mt-2 text-[var(--lk-muted)] ${
                      compact ? "text-[0.8125rem] leading-snug" : "text-sm"
                    }`}
                  >
                    {card.body}
                  </p>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
