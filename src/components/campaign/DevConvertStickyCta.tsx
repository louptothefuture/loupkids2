"use client";

import Link from "next/link";
import { LOUPKIDS_CTA } from "@/lib/content/loupkids-conversion";

export function DevConvertStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-ink bg-white/95 p-3 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-center gap-4 px-1 sm:justify-between sm:px-2">
        <p className="hidden text-sm text-ink-soft sm:block">Ships October 2026 · 30-day guarantee</p>
        <Link
          href="/shop/loup"
          className="btn-sticker flex w-full max-w-md items-center justify-center border-2 border-ink bg-ink py-3.5 text-base text-white sm:w-auto sm:px-8"
        >
          {LOUPKIDS_CTA.primary}
        </Link>
      </div>
    </div>
  );
}
