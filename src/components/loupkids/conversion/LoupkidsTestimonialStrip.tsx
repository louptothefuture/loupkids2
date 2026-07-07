import { FALLBACK_TESTIMONIALS } from "@/lib/content/fallback";
import { FadeIn } from "../FadeIn";

export function LoupkidsTestimonialStrip({ index = 0 }: { index?: number }) {
  const t = FALLBACK_TESTIMONIALS[index % FALLBACK_TESTIMONIALS.length];

  return (
    <section className="border-y border-[var(--lk-line)] bg-white px-[var(--lk-section-x)] py-12 sm:py-14">
      <FadeIn className="lk-container mx-auto max-w-3xl text-center">
        <blockquote className="lk-display text-xl leading-snug sm:text-2xl">
          &ldquo;{t.quote}&rdquo;
        </blockquote>
        <p className="lk-label mt-4">{t.attribution}</p>
      </FadeIn>
    </section>
  );
}
