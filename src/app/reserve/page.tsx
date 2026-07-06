import type { Metadata } from "next";
import Link from "next/link";
import { LOUPKIDS_CTA } from "@/lib/content/loupkids-conversion";
import { FadeIn } from "@/components/loupkids/FadeIn";
import { LoupkidsPageHeader } from "@/components/loupkids/LoupkidsPageHeader";
import { LoupkidsGuaranteeBadge } from "@/components/loupkids/conversion";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cellular Waitlist",
  description: "Join the cellular Loup waitlist or order Wi-Fi Loup today for $149.",
  alternates: { canonical: `${SITE.url}/reserve` },
};

export default function ReservePage() {
  return (
    <div>
      <LoupkidsPageHeader
        eyebrow="Cellular waitlist"
        title="Join the cellular waitlist"
        description="Wi-Fi Loup ships now for $149. Join the waitlist if you need cellular — no payment required."
        centered
      />

      <section className="lk-section-white lk-section-content">
        <FadeIn className="lk-container-narrow">
          <div className="lk-card lk-card-pad text-center">
            <p className="lk-display lk-h3">Ready to order Wi-Fi Loup?</p>
            <p className="lk-prose-muted mt-3">
              Most families start with Wi-Fi Loup at home and school. Ships in 3–5 days.
            </p>
            <Link href="/shop/loup" className="lk-btn mt-6 inline-flex">
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
