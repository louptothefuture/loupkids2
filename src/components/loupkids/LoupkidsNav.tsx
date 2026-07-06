"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { LOUPKIDS_CTA } from "@/lib/content/loupkids-conversion";
import { LOUPKIDS_NAV } from "@/lib/content/loupkids-site";
import { LoupkidsGuaranteeBadge } from "./conversion";

export function LoupkidsNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { cart, openCart } = useCart();
  const count = cart?.totalQuantity ?? 0;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const transparent = isHome && !scrolled && !menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const linkClass = transparent
    ? "text-[0.9375rem] text-white/85 transition-colors hover:text-white"
    : "text-[0.9375rem] text-[var(--lk-muted)] transition-colors hover:text-[var(--lk-ink)]";
  const logoClass = transparent ? "text-white" : "text-[var(--lk-ink)]";
  const ctaClass = transparent
    ? "lk-btn lk-btn-sm lk-btn-white"
    : "lk-btn lk-btn-sm";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          transparent
            ? "bg-transparent"
            : "border-b border-[var(--lk-line)] bg-white/95 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-[var(--lk-section-x)] py-4">
          <Link href="/" className={`lk-display text-xl tracking-tight ${logoClass}`}>
            Loup
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-7 xl:flex">
            {LOUPKIDS_NAV.map((item) => (
              <Link key={item.href} href={item.href} className={linkClass}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/shop/loup" className={`hidden sm:inline-flex ${ctaClass}`}>
              {LOUPKIDS_CTA.primaryShort}
            </Link>
            <button
              type="button"
              onClick={openCart}
              aria-label={`Cart, ${count} items`}
              className={`hidden cursor-pointer md:inline ${linkClass}`}
            >
              Cart{count > 0 ? ` (${count})` : ""}
            </button>
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className={`cursor-pointer xl:hidden ${linkClass}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="lk-label">{menuOpen ? "Close" : "Menu"}</span>
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-20 xl:hidden">
          <nav aria-label="Mobile" className="flex flex-col px-8 py-6">
            {LOUPKIDS_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-[var(--lk-line)] py-4 text-lg"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/shop/loup"
              onClick={() => setMenuOpen(false)}
              className="lk-btn mt-8 w-full"
            >
              {LOUPKIDS_CTA.primary}
            </Link>
            <LoupkidsGuaranteeBadge compact className="mt-3" />
            <button
              type="button"
              onClick={() => {
                openCart();
                setMenuOpen(false);
              }}
              className="mt-4 cursor-pointer py-4 text-left text-lg text-[var(--lk-muted)]"
            >
              Cart{count > 0 ? ` (${count})` : ""}
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
