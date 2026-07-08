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
    align === "end"
      ? "justify-end text-right"
      : align === "start"
        ? "justify-start text-left"
        : "justify-center text-center";

  const content = (
    <>
      <span aria-hidden="true" className="shrink-0">
        🛡️
      </span>
      <span className="text-pretty">
        <strong className={strong}>{LOUPKIDS_GUARANTEE.title}</strong>
        {" — "}
        {LOUPKIDS_GUARANTEE.body}
      </span>
    </>
  );

  if (compact) {
    return (
      <p className={`flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-sm ${alignClass} ${text} ${className}`}>
        {content}
      </p>
    );
  }

  return (
    <p className={`flex w-full flex-wrap items-center gap-x-1.5 gap-y-0.5 text-sm leading-relaxed ${alignClass} ${text} ${className}`}>
      {content}
    </p>
  );
}
