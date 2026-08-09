import Link from "next/link";
import {
  LOUPKIDS_CTA,
  LOUPKIDS_OFFER,
  LOUPKIDS_PRICE,
} from "@/lib/content/loupkids-conversion";
import { HOME_HERO } from "@/lib/content/loupkids-home-arc";

export function LoupkidsOrderCta({
  href = "/shop/loup",
  label = LOUPKIDS_CTA.primary,
  variant = "dark",
  className = "",
  size = "default",
  /** Hero: price + pill + short trust. Full: denser checkout stack. */
  density = "full",
}: {
  href?: string;
  label?: string;
  variant?: "dark" | "light";
  className?: string;
  size?: "default" | "large";
  density?: "hero" | "full";
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
        <span className={`text-2xl font-medium tracking-tight ${ink}`}>{LOUPKIDS_PRICE.formatted}</span>
        <span className="text-base line-through opacity-55">{LOUPKIDS_PRICE.compareFormatted}</span>
        <span className={`text-sm font-medium ${ink}`}>{LOUPKIDS_PRICE.launchNote}</span>
      </p>

      {/* Hero stays tight — 1yr calling lives on shop + launch offer */}
      {density !== "hero" ? (
        <span
          className={`inline-flex max-w-full rounded-full px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.06em] ring-1 ${pillBg}`}
        >
          {LOUPKIDS_OFFER.callingPill}
        </span>
      ) : null}

      <Link href={href} className={`${btnClass} w-full sm:w-auto`}>
        {label}
      </Link>

      <p
        className={`max-w-sm text-[0.8125rem] leading-snug ${alignStart ? "text-left" : "text-center"} ${muted}`}
      >
        {density === "hero" ? HOME_HERO.trustLine : "Ships within 60 days. 100% refundable anytime prior to dispatch."}
      </p>
    </div>
  );
}
