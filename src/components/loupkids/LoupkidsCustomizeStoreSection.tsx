import Link from "next/link";
import { LOUPKIDS_CUSTOMIZE } from "@/lib/content/loupkids-site";
import { FadeIn } from "./FadeIn";

/** After-launch plates — one line, no Coming soon carousel. */
export function LoupkidsCustomizeStoreSection() {
  const { headline, body } = LOUPKIDS_CUSTOMIZE;

  return (
    <section className="bg-[var(--lk-bg)] px-[var(--lk-section-x)] py-12 sm:py-14">
      <FadeIn className="lk-container">
        <h2 className="lk-display text-[clamp(1.5rem,3.5vw,2.15rem)] leading-[1.08]">{headline}</h2>
        <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-[var(--lk-muted)]">
          {body}{" "}
          <Link href="/faq" className="font-medium text-[var(--lk-ink)] underline underline-offset-4">
            Patterns after launch →
          </Link>
        </p>
      </FadeIn>
    </section>
  );
}
