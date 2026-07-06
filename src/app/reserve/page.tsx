"use client";

import Link from "next/link";
import { useState } from "react";
import { FadeIn } from "@/components/loupkids/FadeIn";
import { LoupkidsPageHeader } from "@/components/loupkids/LoupkidsPageHeader";

export default function ReservePage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      <LoupkidsPageHeader
        eyebrow="Pre-order / waitlist"
        title="Reserve your Loup"
        description="Join the waitlist for cellular Loup or get notified about launch batches. No payment required — we'll email you when it's your turn."
        centered
      />

      <section className="lk-section-cards lk-section-white">
        <FadeIn className="lk-container-narrow">
          {submitted ? (
            <div className="lk-card lk-card-pad text-center">
              <p className="lk-display lk-h3">You&apos;re on the list.</p>
              <p className="lk-prose-muted mt-3">
                Check your inbox for confirmation. Ready to buy now?{" "}
                <Link href="/shop/loup" className="underline underline-offset-4 hover:text-[var(--lk-ink)]">
                  Pre-order Wi-Fi Loup →
                </Link>
              </p>
            </div>
          ) : (
            <form
              className="lk-card lk-card-pad space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <div>
                <label htmlFor="name" className="lk-label block">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className="mt-2 w-full border border-[var(--lk-line)] px-4 py-3 text-base focus:border-[var(--lk-ink)] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="lk-label block">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-2 w-full border border-[var(--lk-line)] px-4 py-3 text-base focus:border-[var(--lk-ink)] focus:outline-none"
                />
              </div>
              <fieldset>
                <legend className="lk-label">Interested in</legend>
                <div className="mt-3 space-y-2 text-[0.9375rem]">
                  <label className="flex gap-2">
                    <input type="radio" name="tier" value="cellular" defaultChecked />
                    Cellular Loup waitlist
                  </label>
                  <label className="flex gap-2">
                    <input type="radio" name="tier" value="launch" />
                    Launch batch notification (Wi-Fi)
                  </label>
                </div>
              </fieldset>
              <label className="flex gap-2 text-sm text-[var(--lk-muted)]">
                <input type="checkbox" required className="mt-1" />
                I agree to receive Loup updates. See{" "}
                <Link href="/legal/privacy" className="underline underline-offset-4">
                  Privacy Policy
                </Link>
                .
              </label>
              <button type="submit" className="lk-btn w-full">
                Join waitlist
              </button>
            </form>
          )}
        </FadeIn>
      </section>
    </div>
  );
}
