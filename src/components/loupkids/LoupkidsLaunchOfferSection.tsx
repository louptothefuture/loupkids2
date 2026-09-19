"use client";

import Link from "next/link";
import { LOUPKIDS_IN_THE_BOX, LOUPKIDS_OFFER_CARD } from "@/lib/content/loupkids-conversion";
import { FadeIn } from "./FadeIn";

export function LoupkidsLaunchOfferSection() {
  return (
    <section className="lk-band bg-[var(--lk-bg)] text-[var(--lk-ink)]">
      <div className="mx-auto max-w-[720px] text-center">
        <FadeIn>
          <h2 className="lk-display text-[clamp(2rem,4vw,3rem)] leading-[1.08] text-[var(--lk-accent-ink)]">
            Ready when you are.
          </h2>

          <div className="lk-card mt-8 text-left">
            <p className="text-sm font-medium uppercase tracking-[0.06em] text-[var(--lk-ink)]">
              {LOUPKIDS_OFFER_CARD.label}
            </p>
            <p className="mt-3 text-sm leading-snug text-[var(--lk-ink)]">
              {LOUPKIDS_OFFER_CARD.productLine}
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <p className="text-sm">
                <span className="font-medium">LOUP WiFi</span>
                <span className="mt-1 block lk-display text-2xl">$149</span>
                <span className="text-[var(--lk-muted)]">$199 at launch</span>
              </p>
              <p className="text-sm">
                <span className="font-medium">LOUP WiFi + LTE</span>
                <span className="mt-1 block lk-display text-2xl">$199</span>
                <span className="text-[var(--lk-muted)]">$249 at launch</span>
              </p>
            </div>

            <div className="my-5 border-t border-[var(--lk-line-soft)]" />

            <ul className="space-y-2 text-sm leading-snug text-[var(--lk-muted)]">
              <li>✓ Same closed contacts on both</li>
              <li>✓ LOUP↔LOUP always free · External $10/mo</li>
              <li>✓ LTE = coverage, not the internet</li>
            </ul>

            <div className="my-5 border-t border-[var(--lk-line-soft)]" />

            <Link href="/shop/loup" className="lk-btn lk-btn-convert lk-btn-lg inline-flex w-full justify-center">
              Choose WiFi or LTE
            </Link>

            <div className="mt-4 space-y-1 text-xs leading-relaxed text-[var(--lk-muted)]">
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
