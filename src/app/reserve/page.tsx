import type { Metadata } from "next";
import Link from "next/link";
import { LOUPKIDS_CTA } from "@/lib/content/loupkids-conversion";
import { FadeIn } from "@/components/loupkids/FadeIn";
import { LoupkidsPageHeader } from "@/components/loupkids/LoupkidsPageHeader";
import { LoupkidsGuaranteeBadge } from "@/components/loupkids/conversion";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cellular Waitlist",
  description: "Pre-order Wi-Fi Loup for $149 — shipping Q4 2026. Join the cellular waitlist for LTE Loup.",
  alternates: { canonical: `${SITE.url}/reserve` },
};

export default function ReservePage() {
  return (
    <div>
      <LoupkidsPageHeader
        eyebrow="Pre-order & waitlist"
        title="Reserve your Loup"
        description="Wi-Fi Loup is $149 — pre-order now, shipping Q4 2026. Join the cellular waitlist if you need LTE later."
        centered
      />

      <section className="lk-section-white lk-section-content">
        <FadeIn className="lk-container-narrow">
          <div className="lk-card lk-card-pad text-center">
            <p className="lk-display lk-h3">Pre-order Wi-Fi Loup — $149</p>
            <p className="lk-prose-muted mt-3">
              Loup-to-Loup calls are free forever. Pre-order now — shipping Q4 2026.
            </p>
            <Link href="/shop/loup" className="lk-btn lk-btn-lg mt-6 inline-flex">
              {LOUPKIDS_CTA.primary}
            </Link>
            <LoupkidsGuaranteeBadge className="mt-4" />
          </div>

          <div className="lk-card lk-card-pad mt-6">
            <p className="lk-display text-xl">Cellular Loup — coming later</p>
            <p className="lk-prose-muted mt-3">
              Email us to join the cellular waitlist. We&apos;ll notify you when LTE Loup is ready — no deposit required.
            </p>
            <a
              href={`mailto:${SITE.email}?subject=Cellular%20Loup%20waitlist`}
              className="lk-btn lk-btn-outline mt-6 inline-flex"
            >
              {LOUPKIDS_CTA.waitlist}
            </a>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
