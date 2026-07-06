import Link from "next/link";
import { LOUPKIDS_CTA } from "@/lib/content/loupkids-conversion";
import { LoupkidsGuaranteeBadge } from "./LoupkidsGuaranteeBadge";

export function LoupkidsOrderCta({
  href = "/shop/loup",
  label = LOUPKIDS_CTA.primary,
  variant = "dark",
  className = "",
}: {
  href?: string;
  label?: string;
  variant?: "dark" | "light";
  className?: string;
}) {
  const btnClass =
    variant === "dark" ? "lk-btn lk-btn-white" : "lk-btn";

  return (
    <div className={`flex w-full max-w-md flex-col items-center gap-4 ${className}`}>
      <Link href={href} className={btnClass}>
        {label}
      </Link>
      <LoupkidsGuaranteeBadge variant={variant === "dark" ? "dark" : "light"} />
    </div>
  );
}
