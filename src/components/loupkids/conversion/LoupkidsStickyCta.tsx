"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LOUPKIDS_CTA } from "@/lib/content/loupkids-conversion";
import { StripeCheckoutButton } from "./StripeCheckoutButton";

const DISMISS_KEY = "loup-sticky-cta-dismissed";

export function LoupkidsStickyCta() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  const hidden =
    pathname === "/" ||
    pathname === "/shop/loup" ||
    pathname === "/hardware" ||
    pathname === "/raise" ||
    pathname.startsWith("/raise/") ||
    pathname.startsWith("/studio") ||
    pathname === "/home-full";

  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem(DISMISS_KEY) === "1");
    } catch {
      setDismissed(false);
    }
  }, []);

  useEffect(() => {
    if (hidden || dismissed) return;
    const onScroll = () => {
      const scrolled = window.scrollY > 520;
      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 420;
      setVisible(scrolled && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hidden, dismissed]);

  if (hidden || dismissed) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-[var(--lk-line)] bg-[var(--lk-surface)]/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-sm transition-transform duration-300 ease-out sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[min(calc(100vw-2rem),20rem)] sm:border sm:bg-[var(--lk-surface)] sm:p-4 sm:pt-3 sm:pb-4 sm:shadow-[0_12px_40px_rgba(0,0,0,0.14)] sm:backdrop-blur-none ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-[110%]"
      }`}
      role="complementary"
      aria-label="Pre-order Loup"
      aria-hidden={!visible}
    >
      <div className="mx-auto flex max-w-lg items-center gap-3 sm:mx-0 sm:block sm:max-w-none">
        <div className="mb-0 hidden items-start justify-between gap-3 sm:mb-2.5 sm:flex">
          <p className="text-sm text-[var(--lk-muted)]">First 500 · $129</p>
          <button
            type="button"
            aria-label="Dismiss"
            className="relative -mr-2 -mt-2 flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center text-[var(--lk-muted)] transition-colors hover:text-[var(--lk-ink)]"
            onClick={() => {
              try {
                sessionStorage.setItem(DISMISS_KEY, "1");
              } catch {
                /* ignore */
              }
              setDismissed(true);
              setVisible(false);
            }}
          >
            <span aria-hidden="true" className="text-lg leading-none">
              ×
            </span>
          </button>
        </div>
        <div className="min-w-0 flex-1" tabIndex={visible ? undefined : -1}>
          <StripeCheckoutButton
            label={LOUPKIDS_CTA.sticky}
            className="lk-btn w-full cursor-pointer whitespace-nowrap px-4 py-3 text-center text-sm sm:text-[0.9375rem]"
          />
        </div>
        <button
          type="button"
          aria-label="Dismiss"
          className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center text-[var(--lk-muted)] sm:hidden"
          tabIndex={visible ? undefined : -1}
          onClick={() => {
            try {
              sessionStorage.setItem(DISMISS_KEY, "1");
            } catch {
              /* ignore */
            }
            setDismissed(true);
            setVisible(false);
          }}
        >
          <span aria-hidden="true" className="text-xl leading-none">
            ×
          </span>
        </button>
        <p className="mt-2.5 hidden text-center text-xs leading-snug text-[var(--lk-muted)] sm:block">
          Ships within 60 days. 30-day trial on delivery.
        </p>
      </div>
    </div>
  );
}
