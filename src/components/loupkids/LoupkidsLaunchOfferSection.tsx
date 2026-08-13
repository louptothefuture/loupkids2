"use client";

import Link from "next/link";
import {
  LOUPKIDS_CTA,
  LOUPKIDS_IN_THE_BOX,
  LOUPKIDS_OFFER_CARD,
  LOUPKIDS_PRICE,
} from "@/lib/content/loupkids-conversion";
import { HOME_LAUNCH } from "@/lib/content/loupkids-home-arc";
import { FadeIn } from "./FadeIn";
import { useWaitlist } from "./waitlist/WaitlistProvider";

export function LoupkidsLaunchOfferSection() {
  const { openWaitlist } = useWaitlist();

  return (
    <section className="lk-band bg-[var(--lk-bg)] text-[var(--lk-ink)]">
      <div className="mx-auto max-w-[720px] text-center">
        <FadeIn>
          <h2 className="lk-display text-[clamp(2rem,4vw,3rem)] leading-[1.08] text-[var(--lk-accent-ink)]">
            Pre-orders coming soon.
          </h2>

          <div className="lk-card mt-8 text-left">
            <p className="text-sm font-medium uppercase tracking-[0.06em] text-[var(--lk-ink)]">
              {LOUPKIDS_OFFER_CARD.label}
            </p>
            <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <p className="lk-display text-3xl sm:text-4xl">{HOME_LAUNCH.priceHeader}</p>
              <p className="text-base text-[var(--lk-muted)] line-through">
                {LOUPKIDS_PRICE.compareFormatted}
              </p>
              <p className="text-sm font-medium text-[var(--lk-ink)]">
                {LOUPKIDS_OFFER_CARD.saveNote}
              </p>
            </div>
            <p className="mt-3 text-sm leading-snug text-[var(--lk-ink)]">
              {LOUPKIDS_OFFER_CARD.productLine}
            </p>

            <div className="my-5 border-t border-[var(--lk-line-soft)]" />

            <ul className="space-y-2 text-sm leading-snug text-[var(--lk-muted)]">
              {LOUPKIDS_OFFER_CARD.callingBullets.map((b) => (
                <li key={b}>✓ {b}</li>
              ))}
            </ul>

            <div className="my-5 border-t border-[var(--lk-line-soft)]" />

            <button
              type="button"
              onClick={() => openWaitlist("offer")}
              className="lk-btn lk-btn-convert lk-btn-lg w-full cursor-pointer"
            >
              {LOUPKIDS_CTA.waitlist}
            </button>

            <div className="mt-4 space-y-1 text-xs leading-relaxed text-[var(--lk-muted)]">
              <p>{LOUPKIDS_CTA.comingSoon} — we&apos;ll email you when founding pricing opens.</p>
              {LOUPKIDS_OFFER_CARD.logistics.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>

            <div className="mt-5 space-y-0.5 border-t border-[var(--lk-line-soft)] pt-4 text-[0.6875rem] leading-relaxed text-[var(--lk-muted)]">
              {LOUPKIDS_OFFER_CARD.disclaimer.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
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
