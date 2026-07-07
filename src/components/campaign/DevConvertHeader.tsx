"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { LOUPKIDS_CTA } from "@/lib/content/loupkids-conversion";

/** ponytail: LP header — logo + CTA only, no nav leaks */
export function DevConvertHeader() {
  const { openCart, cart } = useCart();
  const count = cart?.totalQuantity ?? 0;

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/convert" className="display text-2xl tracking-tight text-ink">
          Loup
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={openCart}
            className="label-mono cursor-pointer text-sm text-ink-soft hover:text-ink"
          >
            Bag{count > 0 ? ` (${count})` : ""}
          </button>
          <Link
            href="/shop/loup"
            className="btn-sticker border-2 border-ink bg-ink px-4 py-2 text-sm text-white sm:px-5 sm:text-base"
          >
            {LOUPKIDS_CTA.primaryShort}
          </Link>
        </div>
      </div>
    </header>
  );
}
