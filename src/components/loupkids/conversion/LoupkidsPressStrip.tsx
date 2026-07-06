import { LOUPKIDS_PRESS_QUOTES } from "@/lib/content/loupkids-conversion";
import { FadeIn } from "../FadeIn";

export function LoupkidsPressStrip() {
  return (
    <section className="border-b border-[var(--lk-line)] bg-white px-[var(--lk-section-x)] py-8">
      <FadeIn className="lk-container">
        <p className="lk-label mb-5 text-center">As seen in</p>
        <div className="grid gap-6 sm:grid-cols-3">
          {LOUPKIDS_PRESS_QUOTES.map((item, i) => (
            <figure key={item.outlet} className="text-center">
              <p className="lk-display text-sm font-medium uppercase tracking-wide">{item.outlet}</p>
              <blockquote className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--lk-muted)]">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
            </figure>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
