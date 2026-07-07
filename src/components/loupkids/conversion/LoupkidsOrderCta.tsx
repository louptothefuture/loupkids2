import Link from "next/link";
import { LOUPKIDS_CTA } from "@/lib/content/loupkids-conversion";
import { LoupkidsGuaranteeBadge } from "./LoupkidsGuaranteeBadge";

export function LoupkidsOrderCta({
  href = "/shop/loup",
  label = LOUPKIDS_CTA.primary,
  variant = "dark",
  className = "",
  showGuarantee = true,
  size = "default",
}: {
  href?: string;
  label?: string;
  variant?: "dark" | "light";
  className?: string;
  showGuarantee?: boolean;
  size?: "default" | "large";
}) {
  const btnClass =
    variant === "dark"
      ? `lk-btn lk-btn-white${size === "large" ? " lk-btn-lg" : ""}`
      : `lk-btn${size === "large" ? " lk-btn-lg" : ""}`;

  return (
    <div className={`flex w-full max-w-md flex-col gap-4 ${size === "large" ? "max-w-lg" : ""} ${className}`}>
      <Link href={href} className={`${btnClass} w-full sm:w-auto`}>
        {label}
      </Link>
      {showGuarantee ? (
        <LoupkidsGuaranteeBadge
          variant={variant === "dark" ? "dark" : "light"}
          align={className.includes("items-start") ? "start" : "center"}
        />
      ) : null}
    </div>
  );
}
