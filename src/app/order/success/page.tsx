import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/loupkids/FadeIn";

export const metadata: Metadata = {
  title: "Order confirmed",
  robots: { index: false },
};

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  return (
    <section className="lk-section-white lk-section">
      <FadeIn className="lk-container-narrow text-center">
        <p className="lk-label">Pre-order confirmed</p>
        <h1 className="lk-display lk-h2 mt-3">You&apos;re in.</h1>
        <p className="lk-lead lk-prose-muted mx-auto mt-4 max-w-md">
          Thanks for pre-ordering Loup. We&apos;ll email you with shipping updates — October 2026.
        </p>
        {session_id ? (
          <p className="mt-3 text-sm text-[var(--lk-muted)]">Reference: {session_id}</p>
        ) : null}
        <Link href="/" className="lk-btn mt-8 inline-flex">
          Back home
        </Link>
      </FadeIn>
    </section>
  );
}
