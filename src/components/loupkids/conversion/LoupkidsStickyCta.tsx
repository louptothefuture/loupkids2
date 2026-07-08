"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LOUPKIDS_CTA } from "@/lib/content/loupkids-conversion";
import { LOUPKIDS_GUARANTEE } from "@/lib/content/loupkids-conversion";

export function LoupkidsStickyCta() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  const hidden =
    pathname === "/shop/loup" ||
    pathname.startsWith("/studio") ||
    pathname === "/home-full";

  useEffect(() => {
    if (hidden) return;
    const onScroll = () => {
      const scrolled = window.scrollY > 520;
      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 160;
      setVisible(scrolled && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hidden]);

  if (hidden || !visible) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-40 w-[min(calc(100vw-2rem),18.5rem)] border border-[var(--lk-line)] bg-white p-4 shadow-[0_12px_40px_rgba(0,0,0,0.14)] sm:bottom-6 sm:right-6"
      role="complementary"
      aria-label="Reserve Loup"
    >
      <p className="mb-2.5 text-sm text-[var(--lk-muted)]">Pre-order open</p>
      <Link href="/shop/loup" className="lk-btn lk-btn-lg w-full text-center">
        {LOUPKIDS_CTA.primary}
      </Link>
      <p className="mt-2.5 text-center text-sm leading-snug text-[var(--lk-muted)]">
        {LOUPKIDS_GUARANTEE.title}
      </p>
    </div>
  );
}
