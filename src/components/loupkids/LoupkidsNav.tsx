"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { LOUPKIDS_CTA } from "@/lib/content/loupkids-conversion";
import { LOUPKIDS_NAV, LOUPKIDS_NAV_DESKTOP } from "@/lib/content/loupkids-site";
import { LoupLogoLink } from "./LoupLogo";
import { StripeCheckoutButton } from "./conversion/StripeCheckoutButton";

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

/** Always solid — transparent-over-split-hero made links disappear. */
export function LoupkidsNav() {
  const pathname = usePathname();
  const { cart, openCart } = useCart();
  const count = cart?.totalQuantity ?? 0;
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const linkClass =
    "inline-flex min-h-11 items-center text-[var(--lk-muted)] transition-colors hover:text-[var(--lk-ink)]";

  return (
    <>
      <header className="lk-nav fixed inset-x-0 top-0 z-50 border-b border-[var(--lk-line)] bg-[var(--lk-surface)]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between gap-2 px-[var(--lk-section-x)] sm:gap-4">
          <LoupLogoLink href="/" variant="dark" height={26} priority />

          <nav
            aria-label="Primary"
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 lg:flex"
          >
            {LOUPKIDS_NAV_DESKTOP.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm whitespace-nowrap ${linkClass} ${
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                    ? "font-medium text-[var(--lk-ink)]"
                    : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex min-w-0 shrink items-center justify-end gap-1 sm:gap-3">
            <StripeCheckoutButton
              label={LOUPKIDS_CTA.nav}
              className="lk-btn lk-btn-sm min-w-0 cursor-pointer"
            />
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center text-[var(--lk-ink)] lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <MenuIcon open={menuOpen} />
            </button>
            <button
              type="button"
              aria-label={`Cart${count > 0 ? `, ${count} items` : ""}`}
              className={`hidden cursor-pointer text-sm lg:inline-flex ${linkClass}`}
              onClick={openCart}
            >
              Cart{count > 0 ? ` (${count})` : ""}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[var(--lk-surface)] pt-20 lg:hidden">
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
            <div className="mt-8 w-full">
              <StripeCheckoutButton
                label={LOUPKIDS_CTA.primary}
                className="lk-btn w-full cursor-pointer"
              />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
