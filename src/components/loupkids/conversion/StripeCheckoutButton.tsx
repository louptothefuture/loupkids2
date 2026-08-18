"use client";

import { useState } from "react";
import { trackBeginCheckout } from "@/lib/analytics";
import { LOUPKIDS_CTA, LOUPKIDS_PRICE } from "@/lib/content/loupkids-conversion";
import { SITE } from "@/lib/site";
import { LoupkidsGuaranteeBadge } from "./LoupkidsGuaranteeBadge";

export function StripeCheckoutButton({
  label = LOUPKIDS_CTA.product,
  className = "lk-btn lk-btn-lg w-full",
  showGuarantee = false,
  guaranteeVariant = "light",
  pack = "single",
}: {
  label?: string;
  className?: string;
  showGuarantee?: boolean;
  guaranteeVariant?: "light" | "dark";
  pack?: "single" | "pair";
}) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCheckout = async () => {
    setPending(true);
    setError(null);
    const quantity = pack === "pair" ? LOUPKIDS_PRICE.pairQty : 1;
    const value = pack === "pair" ? LOUPKIDS_PRICE.pairAmount : SITE.price;
    trackBeginCheckout(
      [
        {
          item_id: pack === "pair" ? "loup-silver-pair" : "loup-silver",
          item_name: pack === "pair" ? "Loup — Silver × 2" : "Loup — Silver",
          item_variant: "Silver",
          price: value / quantity,
          quantity,
        },
      ],
      value,
    );
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pack }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error ?? "Checkout unavailable. Try again in a moment.");
        setPending(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Checkout unavailable. Try again in a moment.");
      setPending(false);
    }
  };

  return (
    <div className="w-full">
      <button type="button" onClick={startCheckout} disabled={pending} className={`${className} disabled:opacity-60`}>
        {pending ? "Redirecting…" : label}
      </button>
      {showGuarantee ? (
        <LoupkidsGuaranteeBadge align="start" variant={guaranteeVariant} className="mt-3 max-w-none" />
      ) : null}
      {error ? <p className="mt-2 text-sm text-red-700">{error}</p> : null}
    </div>
  );
}
