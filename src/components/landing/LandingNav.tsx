"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";

const LINKS = [
  { href: "/#who", label: "Who it's for" },
  { href: "/story", label: "Our Story" },
  { href: "/journal", label: "Journal" },
  { href: "/shop", label: "Shop" },
];

export function LandingNav() {
  const { cart, openCart } = useCart();
  const count = cart?.totalQuantity ?? 0;

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="display-landing text-xl text-ink sm:text-2xl"
          aria-label="LOUP home"
        >
          LOUP
        </Link>
        <nav aria-label="Landing" className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-bold text-ink hover:opacity-70"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openCart}
            aria-label={`Bag, ${count} items`}
            className="cursor-pointer text-sm font-bold text-ink"
          >
            Bag{count > 0 ? ` (${count})` : ""}
          </button>
          <Link
            href="/shop/loup"
            className="rounded-full bg-block-fuchsia px-5 py-2 text-sm font-bold text-white"
          >
            Pre-order
          </Link>
        </div>
      </div>
    </header>
  );
}
