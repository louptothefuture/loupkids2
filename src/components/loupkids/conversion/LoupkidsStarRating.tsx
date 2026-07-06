import Link from "next/link";
import { LOUPKIDS_TRUST } from "@/lib/content/loupkids-conversion";

export function LoupkidsStarRating({
  variant = "dark",
  align = "center",
  className = "",
}: {
  variant?: "dark" | "light";
  align?: "center" | "start";
  className?: string;
}) {
  const muted = variant === "dark" ? "text-white/75" : "text-[var(--lk-muted)]";
  const strong = variant === "dark" ? "text-white" : "text-[var(--lk-ink)]";
  const link = variant === "dark" ? "text-white/80 hover:text-white" : "text-[var(--lk-muted)] hover:text-[var(--lk-ink)]";
  const alignClass = align === "start" ? "items-start text-left" : "items-center text-center";

  return (
    <div className={`flex flex-col gap-1.5 sm:flex-row sm:gap-3 ${alignClass} ${className}`}>
      <div
        className="flex items-center gap-0.5 text-amber-400"
        aria-label={`${LOUPKIDS_TRUST.rating} out of 5 stars`}
      >
        {"★★★★★".split("").map((star, i) => (
          <span key={i} className="text-base sm:text-lg">
            {star}
          </span>
        ))}
      </div>
      <p className={`text-sm ${muted}`}>
        <span className={`font-medium ${strong}`}>{LOUPKIDS_TRUST.rating}</span>
        {" · "}
        Loved by {LOUPKIDS_TRUST.reviewCount}+ families
        {" · "}
        <Link href={LOUPKIDS_TRUST.reviewHref} className={`underline underline-offset-2 ${link}`}>
          Read reviews
        </Link>
      </p>
    </div>
  );
}
