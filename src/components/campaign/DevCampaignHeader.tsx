"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/components/cart/CartProvider";
import { LoupLogoLink } from "@/components/loupkids/LoupLogo";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/story", label: "Why LOUP" },
  { href: "/blog", label: "Journal" },
  { href: "/faq", label: "FAQ" },
];

export function DevCampaignHeader() {
  const { cart, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const count = cart?.totalQuantity ?? 0;

  return (
    <header className="sticky top-0 z-30 border-b-2 border-ink bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <LoupLogoLink href="/dev-home" label="Loup home" height={30} />

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="link-underline label-mono text-[0.78rem] text-ink-soft">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={openCart}
            aria-label={`Bag, ${count} items`}
            className="label-mono relative cursor-pointer rounded-full border-2 border-ink px-4 py-2 text-ink transition-colors hover:bg-neutral-100"
          >
            Bag
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-ink font-sans text-[0.7rem] font-bold text-white">
                {count}
              </span>
            )}
          </button>
          <Link
            href="/shop/loup"
            className="btn-sticker hidden border-2 border-ink bg-ink px-4 py-2 text-sm text-white sm:inline-flex"
          >
            Get LOUP $129
          </Link>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="label-mono cursor-pointer text-ink md:hidden"
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
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-ink/10 md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="display py-2 text-2xl text-ink"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/shop/loup"
                onClick={() => setMenuOpen(false)}
                className="btn-sticker mt-3 self-start border-2 border-ink bg-ink px-5 py-3 text-white"
              >
                Get LOUP $129
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
