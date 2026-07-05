"use client";

import { useState } from "react";

export function NewsletterSignup({ className = "" }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "done">("idle");

  return (
    <form
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        setStatus("done");
      }}
    >
      <p className="label-mono text-surface/40">Newsletter</p>
      <p className="mt-2 text-sm text-surface/60">
        Useful stuff for parents. No spam.
      </p>
      {status === "done" ? (
        <p className="mt-4 text-sm text-surface/80">You&apos;re on the list.</p>
      ) : (
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="flex-1 rounded-full border border-surface/15 bg-surface/5 px-4 py-2 text-sm text-surface placeholder:text-surface/30 focus:border-surface/30 focus:outline-none"
          />
          <button type="submit" className="btn-sticker bg-surface px-5 py-2 text-sm text-ink">
            Subscribe
          </button>
        </div>
      )}
    </form>
  );
}
