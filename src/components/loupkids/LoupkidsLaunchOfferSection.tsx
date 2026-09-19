"use client";

import Link from "next/link";
import { LOUPKIDS_CONNECTIVITY, LOUPKIDS_IN_THE_BOX, LOUPKIDS_OFFER_CARD } from "@/lib/content/loupkids-conversion";
import { FadeIn } from "./FadeIn";

const wifi = LOUPKIDS_CONNECTIVITY.wifi;
const lte = LOUPKIDS_CONNECTIVITY.lte;

export function LoupkidsLaunchOfferSection() {
  return (
    <section className="lk-band bg-[var(--lk-bg)] text-[var(--lk-ink)]">
      <FadeIn className="mx-auto max-w-[860px] text-center">
        <h2 className="lk-display text-[clamp(2rem,4vw,3rem)] leading-[1.08]">
          Ready when you are.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[0.975rem] leading-relaxed text-[var(--lk-muted)]">
          {LOUPKIDS_OFFER_CARD.productLine}
        </p>
      </FadeIn>

      {/* Two model cards */}
      <div className="mx-auto mt-10 grid max-w-[860px] gap-4 sm:grid-cols-2">

        {/* WiFi */}
        <FadeIn>
          <div className="flex h-full flex-col rounded-2xl border border-[var(--lk-line)] bg-[var(--lk-surface)] p-7">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-[var(--lk-muted)]">WiFi</p>
            <p className="lk-display mt-2 text-4xl">${wifi.preorder}</p>
            <p className="mt-1 text-sm text-[var(--lk-muted)]">${wifi.launch} at launch</p>
            <p className="mt-4 text-sm font-medium text-[var(--lk-ink)]">{wifi.tagline}</p>
            <ul className="mt-4 flex-1 space-y-2 text-sm text-[var(--lk-muted)]">
              <li className="flex gap-2"><span>✓</span> LOUP↔LOUP — always free</li>
              <li className="flex gap-2"><span>✓</span> External contacts — $10/mo</li>
              <li className="flex gap-2"><span>✓</span> Works on saved WiFi &amp; hotspot</li>
              <li className="flex gap-2"><span>✓</span> No carrier contract</li>
            </ul>
            <div className="mt-4 rounded-lg bg-[var(--lk-bg)] px-3 py-2 text-center">
              <span className="text-xs font-semibold text-[var(--lk-muted)] uppercase tracking-wide">Monthly total</span>
              <p className="lk-display mt-0.5 text-xl">$10<span className="text-sm font-normal">/mo</span></p>
            </div>
            <Link
              href="/shop/loup"
              className="mt-6 inline-flex w-full justify-center border border-[var(--lk-ink)] px-6 py-3.5 text-sm font-medium uppercase tracking-wider transition-colors hover:bg-[var(--lk-ink)] hover:text-white"
            >
              Pre-order WiFi — $149
            </Link>
          </div>
        </FadeIn>

        {/* LTE */}
        <FadeIn delay={0.06}>
          <div className="flex h-full flex-col rounded-2xl bg-[var(--lk-ink)] p-7 text-white">
            <div className="flex items-center justify-between">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-white/60">WiFi + LTE</p>
              <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-white">Always reachable</span>
            </div>
            <p className="lk-display mt-2 text-4xl text-white">${lte.preorder}</p>
            <p className="mt-1 text-sm text-white/60">${lte.launch} at launch</p>
            <p className="mt-4 text-sm font-medium text-white">{lte.tagline}</p>
            <ul className="mt-4 flex-1 space-y-2 text-sm text-white/75">
              <li className="flex gap-2"><span>✓</span> LOUP↔LOUP — always free</li>
              <li className="flex gap-2"><span>✓</span> External contacts — $10/mo</li>
              <li className="flex gap-2"><span>✓</span> LTE connectivity — $10/mo</li>
              <li className="flex gap-2"><span>✓</span> eSIM through LOUP — no carrier contract</li>
              <li className="flex gap-2"><span>✓</span> No open internet</li>
            </ul>
            <div className="mt-4 rounded-lg bg-white/10 px-3 py-2 text-center">
              <span className="text-[0.65rem] font-semibold text-white/60 uppercase tracking-wide">Monthly total</span>
              <p className="lk-display mt-0.5 text-xl text-white">$20<span className="text-sm font-normal text-white/70">/mo</span></p>
            </div>
            <Link
              href="/shop/loup"
              className="mt-6 inline-flex w-full justify-center bg-white px-6 py-3.5 text-sm font-medium uppercase tracking-wider text-[var(--lk-ink)] transition-opacity hover:opacity-90"
            >
              Pre-order LTE — $199
            </Link>
          </div>
        </FadeIn>
      </div>

      <FadeIn className="mx-auto mt-8 max-w-[860px] text-center">
        <p className="text-xs text-[var(--lk-muted)]">
          {LOUPKIDS_OFFER_CARD.logistics[0]}
        </p>
        <p className="mt-1 text-xs text-[var(--lk-muted)]">
          {LOUPKIDS_OFFER_CARD.disclaimer[0]} · {LOUPKIDS_OFFER_CARD.disclaimer[1]}
        </p>
        <details className="mt-6 inline-block text-left">
          <summary className="cursor-pointer text-sm font-medium underline underline-offset-4 hover:text-[var(--lk-ink)]">In the box</summary>
          <ul className="mt-3 space-y-1.5 text-sm text-[var(--lk-muted)]">
            {LOUPKIDS_IN_THE_BOX.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </details>
      </FadeIn>
    </section>
  );
}
