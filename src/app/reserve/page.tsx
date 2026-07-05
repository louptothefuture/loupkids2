"use client";

import { useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export default function ReservePage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mx-auto max-w-xl px-4 py-20 sm:px-6">
      <Reveal>
        <p className="label-mono text-loup-red">Pre-order / reserve</p>
        <h1 className="display mt-2 text-5xl sm:text-6xl">Reserve your LOUP</h1>
        <p className="mt-4 text-ink-soft">
          Join the waitlist for cellular LOUP or get notified about launch batches. No payment
          required — we&apos;ll email you when it&apos;s your turn.
        </p>
      </Reveal>

      {submitted ? (
        <Reveal delay={0.1}>
          <div className="mt-10 rounded-2xl border-2 border-ink bg-sun p-8 shadow-sticker">
            <p className="display text-2xl">You&apos;re on the list.</p>
            <p className="mt-3 text-ink-soft">
              Check your inbox for confirmation. Ready to buy now?{" "}
              <Link href="/shop/loup" className="underline">
                Pre-order Wi-Fi LOUP →
              </Link>
            </p>
          </div>
        </Reveal>
      ) : (
        <Reveal delay={0.1}>
          <form
            className="mt-10 space-y-4 rounded-2xl border-2 border-ink bg-paper p-8 shadow-sticker"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <div>
              <label htmlFor="name" className="label-mono block text-ink-soft">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                className="mt-1 w-full rounded-lg border-2 border-ink/20 px-4 py-2 focus:border-ink focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="email" className="label-mono block text-ink-soft">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 w-full rounded-lg border-2 border-ink/20 px-4 py-2 focus:border-ink focus:outline-none"
              />
            </div>
            <fieldset>
              <legend className="label-mono text-ink-soft">Interested in</legend>
              <div className="mt-2 space-y-2 text-sm">
                <label className="flex gap-2">
                  <input type="radio" name="tier" value="cellular" defaultChecked />
                  Cellular LOUP waitlist
                </label>
                <label className="flex gap-2">
                  <input type="radio" name="tier" value="launch" />
                  Launch batch notification (Wi-Fi)
                </label>
              </div>
            </fieldset>
            <label className="flex gap-2 text-xs text-ink-soft">
              <input type="checkbox" required />
              I agree to receive LOUP updates. See{" "}
              <Link href="/legal/privacy" className="underline">
                Privacy Policy
              </Link>
              .
            </label>
            <button type="submit" className="btn-sticker w-full bg-loup-red py-3 text-paper">
              Join waitlist
            </button>
          </form>
        </Reveal>
      )}
    </div>
  );
}
