"use client";

import Link from "next/link";
import { LOUPKIDS_CONNECTIVITY } from "@/lib/content/loupkids-conversion";
import { FadeIn } from "./FadeIn";

export function LoupkidsCallingPricingSection({ compact = false }: { compact?: boolean }) {
  const wifi = LOUPKIDS_CONNECTIVITY.wifi;
  const lte = LOUPKIDS_CONNECTIVITY.lte;

  return (
    <section
      className={`bg-[var(--lk-bg)] ${
        compact
          ? "px-[var(--lk-section-x)] py-16 sm:py-20"
          : "lk-section-white lk-section"
      }`}
    >
      <div className={compact ? "mx-auto max-w-[1200px]" : "lk-container"}>
        <FadeIn>
          <h2
            className={`lk-display leading-[1.08] ${
              compact ? "text-[clamp(1.5rem,3.5vw,2.15rem)]" : "lk-h2"
            }`}
          >
            What it costs to stay connected
          </h2>
          <p className={`mt-3 max-w-2xl text-[var(--lk-muted)] ${compact ? "text-sm" : "mt-4 text-[0.975rem]"}`}>
            LOUP↔LOUP is always free on both models. The monthly cost depends on what you choose.
          </p>
        </FadeIn>

        <div className={`grid gap-6 md:grid-cols-2 ${compact ? "mt-8" : "mt-10 sm:mt-12"}`}>
          {/* WiFi model */}
          <FadeIn>
            <div className="flex h-full flex-col rounded-2xl border border-[var(--lk-line)] bg-[var(--lk-surface)] p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--lk-muted)]">
                {wifi.name}
              </p>
              <p className="lk-display mt-2 text-[clamp(1.5rem,3vw,2rem)]">$10<span className="text-base font-normal text-[var(--lk-muted)]">/mo total</span></p>
              <p className="mt-1 text-sm text-[var(--lk-muted)]">{wifi.tagline}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {wifi.monthlyBreakdown.map((line) => (
                  <li key={line} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--lk-ink)]" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/shop/loup"
                className="mt-8 inline-flex w-full justify-center border border-[var(--lk-ink)] px-6 py-3 text-sm font-medium uppercase tracking-wider transition-colors hover:bg-[var(--lk-ink)] hover:text-white"
              >
                Pre-order WiFi — $149
              </Link>
            </div>
          </FadeIn>

          {/* LTE model */}
          <FadeIn delay={0.06}>
            <div className="flex h-full flex-col rounded-2xl bg-[var(--lk-ink)] p-6 text-white sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-white/60">
                {lte.name}
              </p>
              <p className="lk-display mt-2 text-[clamp(1.5rem,3vw,2rem)]">$20<span className="text-base font-normal text-white/60">/mo total</span></p>
              <p className="mt-1 text-sm text-white/70">{lte.tagline}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {lte.monthlyBreakdown.map((line) => (
                  <li key={line} className={`flex items-start gap-3 text-sm ${line.startsWith("Total") ? "border-t border-white/15 pt-3 font-medium text-white" : "text-white/80"}`}>
                    {!line.startsWith("Total") && (
                      <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/60" />
                    )}
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-white/50">{lte.note}</p>
              <Link
                href="/shop/loup"
                className="mt-8 inline-flex w-full justify-center bg-white px-6 py-3 text-sm font-medium uppercase tracking-wider text-[var(--lk-ink)] transition-opacity hover:opacity-90"
              >
                Pre-order LTE — $199
              </Link>
            </div>
          </FadeIn>
        </div>

        {!compact && (
          <FadeIn delay={0.1} className="mt-8">
            <Link
              href="/help/calling-plan"
              className="text-sm text-[var(--lk-muted)] underline underline-offset-4 hover:text-[var(--lk-ink)]"
            >
              How calling plans work →
            </Link>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
