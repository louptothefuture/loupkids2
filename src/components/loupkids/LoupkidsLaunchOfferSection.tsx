import Link from "next/link";
import {
  LOUPKIDS_CTA,
  LOUPKIDS_IN_THE_BOX,
  LOUPKIDS_PRICE,
} from "@/lib/content/loupkids-conversion";
import { HOME_LAUNCH } from "@/lib/content/loupkids-home-arc";
import { FadeIn } from "./FadeIn";

export function LoupkidsLaunchOfferSection() {
  return (
    <section className="lk-band bg-[var(--lk-bg)] text-[var(--lk-ink)]">
      <div className="mx-auto max-w-[720px] text-center">
        <FadeIn>
          <h2 className="lk-display text-[clamp(2rem,4vw,3rem)] leading-[1.08] text-[var(--lk-accent-ink)]">
            Order Loup.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[var(--lk-muted)]">
            First 500 · Save 33%. Year 1 domestic included · Loup↔Loup always free.
          </p>

          <div className="lk-card mt-8 text-left">
            <p className="text-sm font-medium text-[var(--lk-accent-b)]">{HOME_LAUNCH.scarcityLine}</p>
            <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <p className="lk-display text-3xl sm:text-4xl">{HOME_LAUNCH.priceHeader}</p>
              <p className="text-base text-[var(--lk-muted)] line-through">
                {LOUPKIDS_PRICE.compareFormatted}
              </p>
            </div>
            <p className="mt-3 text-sm font-medium leading-snug">{HOME_LAUNCH.bonusBanner}</p>
            <ul className="mt-5 space-y-2 text-sm leading-snug text-[var(--lk-muted)]">
              {HOME_LAUNCH.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>

            <Link href="/shop/loup" className="lk-btn lk-btn-convert lk-btn-lg mt-8 w-full">
              {LOUPKIDS_CTA.primary}
            </Link>
            <p className="mt-4 text-xs leading-relaxed text-[var(--lk-muted)]">{HOME_LAUNCH.e911}</p>
          </div>

          <details className="mt-8 border-t border-[var(--lk-line-soft)] pt-4 text-left">
            <summary className="cursor-pointer text-sm font-medium">In the box</summary>
            <ul className="mt-3 space-y-1.5 text-sm text-[var(--lk-muted)]">
              {LOUPKIDS_IN_THE_BOX.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </details>

          <p className="mt-8 text-sm text-[var(--lk-muted)]">
            Questions?{" "}
            <Link href="/faq" className="font-semibold text-[var(--lk-ink)] underline underline-offset-4">
              Read the FAQ
            </Link>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
