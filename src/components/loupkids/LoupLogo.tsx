import Image from "next/image";
import Link from "next/link";

export const LOUP_LOGO = {
  src: "/images/loup-logo.png",
  width: 790,
  height: 340,
} as const;

export function LoupLogo({
  variant = "dark",
  height = 28,
  className = "",
  priority = false,
}: {
  variant?: "dark" | "light";
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  const width = Math.round((height * LOUP_LOGO.width) / LOUP_LOGO.height);

  return (
    <Image
      src={LOUP_LOGO.src}
      alt=""
      width={width}
      height={height}
      priority={priority}
      className={`block h-auto w-auto shrink-0 ${variant === "light" ? "brightness-0 invert" : ""} ${className}`}
    />
  );
}

export function LoupLogoLink({
  href = "/",
  variant = "dark",
  height = 28,
  className = "",
  label = "Loup home",
  priority = false,
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
      <LoupLogo variant={variant} height={height} priority={priority} />
    </Link>
  );
}
