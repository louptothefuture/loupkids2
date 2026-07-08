"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { LOUPKIDS_CTA } from "@/lib/content/loupkids-conversion";
import { LOUPKIDS_NAV } from "@/lib/content/loupkids-site";
import { LoupLogoLink } from "./LoupLogo";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-5" aria-hidden="true">
      <span
        className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ${
          open ? "top-2 rotate-45" : "top-0"
        }`}
      />
      <span
        className={`absolute left-0 top-2 block h-px w-full bg-current transition-opacity duration-300 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ${
          open ? "top-2 -rotate-45" : "top-4"
        }`}
      />
    </span>
  );
}

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

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const linkClass = transparent
    ? "text-white/85 transition-colors hover:text-white"
    : "text-[var(--lk-muted)] transition-colors hover:text-[var(--lk-ink)]";
  const logoVariant = transparent ? "light" : "dark";
  const ctaClass = transparent ? "lk-btn lk-btn-sm lk-btn-white" : "lk-btn lk-btn-sm";
  const iconClass = transparent ? "text-white" : "text-[var(--lk-ink)]";

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
          <LoupLogoLink href="/" variant={logoVariant} height={26} priority />

          <div className="flex items-center gap-3 sm:gap-4">
            {(!isHome || scrolled || menuOpen) && (
              <Link href="/shop/loup" className={ctaClass}>
                {LOUPKIDS_CTA.primaryShort}
              </Link>
            )}
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className={`flex cursor-pointer items-center justify-center p-1 ${iconClass}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-20">
          <nav aria-label="Main" className="flex flex-col px-8 py-6">
            {LOUPKIDS_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`border-b border-[var(--lk-line)] py-4 text-lg ${
                  pathname === item.href ? "font-medium text-[var(--lk-ink)]" : "text-[var(--lk-muted)]"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/account"
              onClick={() => setMenuOpen(false)}
              className="border-b border-[var(--lk-line)] py-4 text-lg text-[var(--lk-muted)]"
            >
              Account
            </Link>
            <button
              type="button"
              onClick={() => {
                openCart();
                setMenuOpen(false);
              }}
              className="cursor-pointer border-b border-[var(--lk-line)] py-4 text-left text-lg text-[var(--lk-muted)]"
            >
              Cart{count > 0 ? ` (${count})` : ""}
            </button>
            <Link href="/shop/loup" onClick={() => setMenuOpen(false)} className="lk-btn mt-8 w-full">
              {LOUPKIDS_CTA.primary}
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
