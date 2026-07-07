"use client";

import Link from "next/link";
import { LOUPKIDS_CTA } from "@/lib/content/loupkids-conversion";

export function DevConvertStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-ink bg-white p-3 sm:hidden">
      <Link
        href="/shop/loup"
        className="btn-sticker flex w-full items-center justify-center border-2 border-ink bg-ink py-3.5 text-base text-white"
      >
        {LOUPKIDS_CTA.primary}
      </Link>
    </div>
  );
}
