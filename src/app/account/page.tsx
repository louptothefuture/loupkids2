import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/loupkids/FadeIn";
import { LoupkidsPageHeader } from "@/components/loupkids/LoupkidsPageHeader";
import { LOUPKIDS_CTA } from "@/lib/content/loupkids-conversion";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Account & Order Tracking",
  description: "Track your Loup order, returns, and warranty through your Shopify customer account.",
  alternates: { canonical: `${SITE.url}/account` },
  robots: { index: false },
};

const accountUrl = process.env.NEXT_PUBLIC_SHOPIFY_ACCOUNT_URL;

export default function AccountPage() {
  return (
    <div>
      <LoupkidsPageHeader
        eyebrow="Account"
        title="Orders & tracking"
        description="Order history, shipment tracking, returns, and your calling plan live in your secure customer account."
      />

      <section className="lk-section-white lk-page-body">
        <FadeIn className="lk-container-prose">
          {accountUrl ? (
            <a href={accountUrl} className="lk-btn inline-flex">
              Sign in to your account →
            </a>
          ) : (
            <div className="lk-card lk-card-pad">
              <p className="lk-display text-xl">Customer accounts activate at launch</p>
              <p className="lk-prose-muted mt-3">
                Sign-in is powered by Shopify customer accounts (passwordless email codes). Once the store is
                connected, this button links straight to it. Order questions meanwhile:{" "}
                <a href={`mailto:${SITE.email}`} className="underline underline-offset-4 hover:text-[var(--lk-ink)]">
                  {SITE.email}
                </a>
                .
              </p>
            </div>
          )}

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Track a shipment",
                body: "Tracking links are emailed the moment your Loup ships — check your inbox for the shipping confirmation.",
                href: "/contact",
                label: "Ask about an order",
              },
              {
                title: "Start a return",
                body: "30 days, free label, full refund. Reply to your order confirmation or contact us.",
                href: "/legal/shipping",
                label: "Shipping & returns",
              },
              {
                title: "Warranty claim",
                body: "Broke doing normal kid things? Covered for 2 years. Email a photo and your order number.",
                href: "/help/warranty-claim",
                label: "Start a warranty claim",
              },
              {
                title: "Manage calling plan",
                body: "Upgrade, downgrade, or cancel the $10/month real-numbers plan anytime.",
                href: "/help/calling-plan",
                label: "Calling plan help",
              },
            ].map((card) => (
              <div key={card.title} className="lk-card lk-card-pad">
                <h2 className="lk-display text-lg">{card.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--lk-muted)]">{card.body}</p>
                <Link
                  href={card.href}
                  className="mt-3 inline-flex text-sm underline underline-offset-4 hover:text-[var(--lk-ink)]"
                >
                  {card.label} →
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t border-[var(--lk-line)] pt-8">
            <Link href="/shop/loup" className="lk-btn inline-flex">
              {LOUPKIDS_CTA.primary}
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
