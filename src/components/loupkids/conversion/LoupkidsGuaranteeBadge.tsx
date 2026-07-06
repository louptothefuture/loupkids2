import { LOUPKIDS_GUARANTEE } from "@/lib/content/loupkids-conversion";

export function LoupkidsGuaranteeBadge({
  variant = "light",
  className = "",
  compact = false,
  align = "center",
}: {
  variant?: "light" | "dark";
  className?: string;
  compact?: boolean;
  align?: "center" | "start" | "end";
}) {
  const text =
    variant === "dark"
      ? "text-white/90 [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]"
      : "text-[var(--lk-muted)]";
  const strong = variant === "dark" ? "text-white" : "text-[var(--lk-ink)]";
  const alignClass =
    align === "end" ? "text-right" : align === "start" ? "text-left" : "text-center";

  if (compact) {
    return (
      <p className={`text-sm ${alignClass} ${text} ${className}`}>
        <span aria-hidden="true">🛡️ </span>
        <strong className={strong}>{LOUPKIDS_GUARANTEE.title}</strong>
        {" — "}
        {LOUPKIDS_GUARANTEE.body}
      </p>
    );
  }

  return (
    <p className={`max-w-xs text-sm leading-relaxed ${alignClass} ${text} ${className}`}>
      <span aria-hidden="true">🛡️ </span>
      <span>
        <strong className={strong}>{LOUPKIDS_GUARANTEE.title}</strong>
        {" — "}
        {LOUPKIDS_GUARANTEE.body}
      </span>
    </p>
  );
}
