"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Analytics } from "@/components/Analytics";
import {
  CONSENT_KEY,
  type CookieConsent,
  readCookieConsent,
} from "@/lib/analytics";

function hideBanner(pathname: string) {
  return (
    pathname.startsWith("/studio") ||
    pathname === "/glb" ||
    pathname === "/glb2" ||
    pathname === "/glb3"
  );
}

export function CookieBanner() {
  const pathname = usePathname();
  const [choice, setChoice] = useState<CookieConsent | null | "pending">("pending");

  useEffect(() => {
    setChoice(readCookieConsent());
  }, []);

  function decide(next: CookieConsent) {
    try {
      localStorage.setItem(CONSENT_KEY, next);
    } catch {
      /* ignore */
    }
    setChoice(next);
  }

  const ready = choice !== "pending";
  const show = ready && choice === null && !hideBanner(pathname);

  return (
    <>
      <Analytics enabled={choice === "all"} />
      {show ? (
        <div
          className="loupkids-theme fixed inset-x-0 bottom-0 z-[70] border-t border-[var(--lk-line)] bg-[var(--lk-surface)] px-[var(--lk-section-x)] py-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_-8px_32px_rgba(0,0,0,0.08)]"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="mx-auto flex max-w-[1200px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
            <p className="max-w-2xl text-sm leading-relaxed text-[var(--lk-ink)]">
              We use necessary cookies to run the cart. With your OK, we also use analytics cookies
              to see how people find Loup.{" "}
              <Link href="/legal/privacy" className="underline underline-offset-4 hover:opacity-70">
                Privacy
              </Link>
            </p>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => decide("necessary")}
                className="inline-flex min-h-11 cursor-pointer items-center px-3 text-sm font-medium text-[var(--lk-muted)] underline underline-offset-4 hover:text-[var(--lk-ink)]"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => decide("all")}
                className="lk-btn lk-btn-sm cursor-pointer"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
