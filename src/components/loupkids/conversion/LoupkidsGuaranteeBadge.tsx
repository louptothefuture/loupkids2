import { LOUPKIDS_GUARANTEE } from "@/lib/content/loupkids-conversion";

export function LoupkidsGuaranteeBadge({
  variant = "light",
  className = "",
  compact = false,
}: {
  variant?: "light" | "dark";
  className?: string;
  compact?: boolean;
}) {
  const text = variant === "dark" ? "text-white/70" : "text-[var(--lk-muted)]";
  const strong = variant === "dark" ? "text-white" : "text-[var(--lk-ink)]";

  if (compact) {
    return (
      <p className={`text-center text-xs ${text} ${className}`}>
        <span aria-hidden="true">🛡️ </span>
        <strong className={strong}>{LOUPKIDS_GUARANTEE.title}</strong>
        {" — "}
        {LOUPKIDS_GUARANTEE.body}
      </p>
    );
  }

  return (
    <p className={`max-w-sm text-center text-xs leading-relaxed ${text} ${className}`}>
      <span aria-hidden="true">🛡️ </span>
      <span>
        <strong className={strong}>{LOUPKIDS_GUARANTEE.title}</strong>
        {" — "}
        {LOUPKIDS_GUARANTEE.body}
      </span>
    </p>
  );
}
