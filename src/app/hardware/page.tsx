import type { Metadata } from "next";
import Link from "next/link";
import { LoupkidsHardware3D } from "@/components/loupkids/LoupkidsHardware3D";
import { LoupkidsHardwareHotspots } from "@/components/loupkids/LoupkidsHardwareHotspots";

export const metadata: Metadata = {
  title: "Hardware explorer (prototype)",
  robots: { index: false, follow: false },
};

/** Unlinked prototype — 3D composite + hotspot callouts from product photos */
export default function HardwareExplorerPage() {
  return (
    <article className="border-b border-[var(--lk-line)] bg-[var(--lk-surface)] px-[var(--lk-section-x)] py-12 sm:py-14">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--lk-muted)]">
          Prototype · not in nav
        </p>
        <h1 className="lk-display mt-3 text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.08]">
          Hardware explorer
        </h1>
        <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-[var(--lk-muted)]">
          A CSS 3D composite from the gallery angles, plus interactive hotspots on the
          clean side/bottom shots. No WebGL — light enough to reuse on shop later.
        </p>

        <div className="mt-10 sm:mt-12">
          <LoupkidsHardware3D />
        </div>

        <div className="mt-16 border-t border-[var(--lk-line)] pt-12 sm:mt-20">
          <h2 className="lk-display text-xl sm:text-2xl">Hotspots</h2>
          <p className="mt-2 max-w-xl text-sm text-[var(--lk-muted)]">
            Tap a number on the photo or a row in the list.
          </p>
          <div className="mt-8">
            <LoupkidsHardwareHotspots />
          </div>
        </div>

        <p className="mt-10 text-sm text-[var(--lk-muted)]">
          <Link href="/shop/loup" className="underline underline-offset-4 hover:text-[var(--lk-ink)]">
            ← Back to shop
          </Link>
        </p>
      </div>
    </article>
  );
}
