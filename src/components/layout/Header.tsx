"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/components/cart/CartProvider";
import { LoupLogoLink } from "@/components/loupkids/LoupLogo";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/story", label: "Our Story" },
  { href: "/journal", label: "Journal" },
  { href: "/faq", label: "FAQ" },
  { href: "/help", label: "Help" },
];

export function Header() {
  const { cart, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const count = cart?.totalQuantity ?? 0;

  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-white">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <LoupLogoLink height={26} />

        <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-ink-soft hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={openCart}
            aria-label={`Bag, ${count} items`}
            className="cursor-pointer text-sm text-ink-soft hover:text-ink"
          >
            Bag{count > 0 ? ` (${count})` : ""}
          </button>
          <Link href="/shop/loup" className="btn-sticker hidden bg-ink px-4 py-2 text-white sm:inline-flex">
            Pre-order
          </Link>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="cursor-pointer text-sm font-medium md:hidden"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-ink/10 md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-2 text-base font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
