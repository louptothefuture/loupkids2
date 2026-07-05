import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Checkout Preview",
  robots: { index: false, follow: false },
};

/**
 * Landing target for the mock cart's checkoutUrl. Replaced automatically by
 * Shopify's real hosted checkout once credentials are configured.
 */
export default function CheckoutPreviewPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <p className="label-mono text-loup-red">Preview mode</p>
      <h1 className="display mt-3 text-5xl">This is where Shopify checkout takes over</h1>
      <p className="mt-5 text-ink-soft">
        In production, the checkout button sends shoppers to Shopify&apos;s hosted checkout —
        real payment processing, tax calculation, shipping rates, discount codes, and abandoned
        cart recovery, all managed from the Shopify admin. Connect the store credentials in{" "}
        <code className="rounded bg-cream px-1.5 py-0.5 text-sm">.env.local</code> and this page
        disappears.
      </p>
      <Link href="/shop" className="btn-sticker mt-8 inline-flex bg-sun px-6 py-3">
        ← Back to the shop
      </Link>
    </div>
  );
}
