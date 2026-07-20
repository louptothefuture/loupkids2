"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LOUPKIDS_CTA, LOUPKIDS_GUARANTEE } from "@/lib/content/loupkids-conversion";

const DISMISS_KEY = "loup-sticky-cta-dismissed";

export function LoupkidsStickyCta() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true); // avoid flash until we read storage

  const hidden =
    pathname === "/shop/loup" ||
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
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 160;
      setVisible(scrolled && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hidden, dismissed]);

  if (hidden || dismissed || !visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--lk-line)] bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-sm sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[min(calc(100vw-2rem),18.5rem)] sm:border sm:bg-white sm:p-4 sm:pt-3 sm:pb-4 sm:shadow-[0_12px_40px_rgba(0,0,0,0.14)] sm:backdrop-blur-none"
      role="complementary"
      aria-label="Pre-order Loup"
    >
      <div className="mx-auto flex max-w-lg items-center gap-3 sm:mx-0 sm:block sm:max-w-none">
        <div className="mb-0 hidden items-start justify-between gap-3 sm:mb-2.5 sm:flex">
          <p className="text-sm text-[var(--lk-muted)]">Pre-order open</p>
          <button
            type="button"
            aria-label="Dismiss"
            className="relative -mr-1 -mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center text-[var(--lk-muted)] transition-colors hover:text-[var(--lk-ink)]"
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
        <Link href="/shop/loup" className="lk-btn lk-btn-lg w-full flex-1 text-center text-[0.8125rem] sm:text-[1rem]">
          {LOUPKIDS_CTA.primary}
        </Link>
        <button
          type="button"
          aria-label="Dismiss"
          className="flex h-10 w-10 shrink-0 items-center justify-center text-[var(--lk-muted)] sm:hidden"
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
        <p className="mt-2.5 hidden text-center text-sm leading-snug text-[var(--lk-muted)] sm:block">
          {LOUPKIDS_GUARANTEE.title}
        </p>
      </div>
    </div>
  );
}
