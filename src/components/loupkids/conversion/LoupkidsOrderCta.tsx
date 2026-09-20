"use client";

import Link from "next/link";
import { LOUPKIDS_CTA } from "@/lib/content/loupkids-conversion";
import { HOME_HERO } from "@/lib/content/loupkids-home-arc";

export function LoupkidsOrderCta({
  label = LOUPKIDS_CTA.primary,
  variant = "dark",
  className = "",
  size = "default",
  /** Hero: price + pill + short trust. Full: denser checkout stack. */
  density = "full",
  source: _source = "cta",
}: {
  label?: string;
  variant?: "dark" | "light";
  className?: string;
  size?: "default" | "large";
  density?: "hero" | "full";
  source?: string;
}) {
  const btnClass =
    variant === "dark"
      ? `lk-btn lk-btn-white${size === "large" ? " lk-btn-lg" : ""}`
      : `lk-btn${size === "large" ? " lk-btn-lg" : ""}`;

  const alignStart = className.includes("items-start");
  const muted = variant === "dark" ? "text-white/75" : "text-[var(--lk-muted)]";
  const ink = variant === "dark" ? "text-white" : "text-[var(--lk-ink)]";
  const pillBg =
    variant === "dark" ? "bg-white/12 text-white ring-white/25" : "bg-[var(--lk-ink)]/5 text-[var(--lk-ink)] ring-[var(--lk-line)]";

  return (
    <div
      className={`flex w-full max-w-md flex-col gap-3 ${alignStart ? "items-start" : "items-center"} ${size === "large" ? "max-w-lg" : ""} ${className}`}
    >
      <p
        className={`flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5 ${alignStart ? "justify-start" : "justify-center"} ${muted}`}
      >
        <span className={`text-2xl font-medium tracking-tight ${ink}`}>From $149</span>
        <span className={`text-sm font-medium opacity-70 ${ink}`}>WiFi or LTE</span>
      </p>

      <Link
        href="/shop/loup"
        className={`${btnClass} w-full cursor-pointer text-center sm:w-auto`}
      >
        See both models
      </Link>

      <p
        className={`max-w-sm text-[0.8125rem] leading-snug ${alignStart ? "text-left" : "text-center"} ${muted}`}
      >
        {HOME_HERO.trustLine}
      </p>
    </div>
  );
}
