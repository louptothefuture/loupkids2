import Link from "next/link";

/** Wordmark — text only (logo asset was invisible on the dark hero). */
export function LoupLogo({
  variant = "dark",
  height = 28,
  className = "",
}: {
  variant?: "dark" | "light";
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  const color = variant === "light" ? "text-white" : "text-[var(--lk-ink)]";
  const size = Math.max(18, Math.round(height * 0.85));

  return (
    <span
      className={`block shrink-0 font-semibold tracking-[-0.04em] ${color} ${className}`}
      style={{ fontSize: size, lineHeight: 1 }}
    >
      LOUP
    </span>
  );
}

export function LoupLogoLink({
  href = "/",
  variant = "dark",
  height = 28,
  className = "",
  label = "Loup home",
}: {
  href?: string;
  variant?: "dark" | "light";
  height?: number;
  className?: string;
  label?: string;
  priority?: boolean;
}) {
  return (
    <Link href={href} aria-label={label} className={`inline-flex items-center ${className}`}>
      <LoupLogo variant={variant} height={height} />
    </Link>
  );
}
