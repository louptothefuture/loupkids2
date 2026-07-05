import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Account & Order Tracking",
  description:
    "Track your LOUP order, manage your calling plan, and view order history through your Shopify customer account.",
  alternates: { canonical: `${SITE.url}/account` },
  robots: { index: false },
};

const accountUrl = process.env.NEXT_PUBLIC_SHOPIFY_ACCOUNT_URL;

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <Reveal>
        <p className="label-mono text-loup-red">Account</p>
        <h1 className="display mt-2 text-6xl">Orders & tracking</h1>
        <p className="mt-4 text-ink-soft">
          Order history, shipment tracking, returns, and your calling plan all live in your
          secure customer account.
        </p>

        {accountUrl ? (
          <a href={accountUrl} className="btn-sticker mt-8 inline-flex bg-loup-red px-8 py-4 text-xl text-paper">
            Sign in to your account →
          </a>
        ) : (
          <div className="mt-8 rounded-2xl border-2 border-ink bg-cream p-8 shadow-sticker">
            <p className="display text-2xl">Customer accounts activate at launch</p>
            <p className="mt-3 text-ink-soft">
              Sign-in is powered by Shopify customer accounts (passwordless email codes — no
              password to forget). Once the store is connected, this button links straight to it.
              Meanwhile, any order question:{" "}
              <a href={`mailto:${SITE.email}`} className="underline">
                {SITE.email}
              </a>
              .
            </p>
          </div>
        )}

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {[
            { title: "Track a shipment", body: "Tracking links are emailed the moment your LOUP ships — check your inbox for 'Your LOUP is on the way.'" },
            { title: "Start a return", body: "30 days, free label, full refund. Reply to your order confirmation email or sign in above." },
            { title: "Warranty claim", body: "Broke doing normal kid things? Covered for 2 years. Email us a photo and your order number." },
            { title: "Manage calling plan", body: "Upgrade, downgrade, or cancel the $10/month real-numbers plan anytime from your account." },
          ].map((card) => (
            <div key={card.title} className="rounded-2xl border-2 border-ink bg-paper p-6 shadow-sticker-sm">
              <h2 className="display text-xl">{card.title}</h2>
              <p className="mt-2 text-sm text-ink-soft">{card.body}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
