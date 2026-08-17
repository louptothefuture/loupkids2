"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { trackLead } from "@/lib/analytics";
import { LOUPKIDS_CTA } from "@/lib/content/loupkids-conversion";

const SEEN_KEY = "loup-waitlist-popup-seen";

export function WaitlistModal({
  open,
  source,
  onClose,
}: {
  open: boolean;
  source: string;
  onClose: () => void;
}) {
  const titleId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    setStatus("idle");
    setError("");
    const t = window.setTimeout(() => inputRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  // ponytail: auto-popup off while Stripe checkout is live — CTAs buy, not email-capture
  useEffect(() => {
    try {
      localStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setError(typeof data.error === "string" ? data.error : "Something went wrong.");
        return;
      }
      setStatus("ok");
      trackLead(source);
      try {
        localStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* ignore */
      }
    } catch {
      setStatus("error");
      setError("Network error — try again.");
    }
  }

  if (!open) return null;

  return (
    <div
      className="loupkids-theme fixed inset-0 z-[80] flex items-end justify-center p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:items-center sm:pb-4"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-pointer bg-black/45"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-[1] w-full max-w-md rounded-[1.75rem] border border-[var(--lk-line)] bg-[#fafaf8] p-6 shadow-[0_24px_64px_rgba(0,0,0,0.28)] sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 flex h-11 w-11 cursor-pointer items-center justify-center text-[var(--lk-muted)] hover:text-[var(--lk-ink)]"
          aria-label="Close"
        >
          <span aria-hidden className="text-xl leading-none">
            ×
          </span>
        </button>

        <p className="text-sm font-medium uppercase tracking-[0.06em] text-[var(--lk-muted)]">
          Updates
        </p>
        <h2 id={titleId} className="lk-display mt-2 text-2xl leading-tight sm:text-[1.75rem]">
          Stay in the loop
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--lk-muted)]">
          Leave your email for shipping and product updates — no spam.
        </p>

        {status === "ok" ? (
          <p className="mt-6 text-sm font-medium text-[var(--lk-ink)]">
            You&apos;re on the list. We&apos;ll be in touch.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 space-y-3">
            <label
              className="block text-left text-sm font-medium text-[var(--lk-ink)]"
              htmlFor={`${titleId}-email`}
            >
              Email
            </label>
            <input
              ref={inputRef}
              id={`${titleId}-email`}
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@family.com"
              className="w-full rounded-xl border border-[var(--lk-line)] bg-[var(--lk-bg)] px-4 py-3 text-base text-[var(--lk-ink)] outline-none focus:border-[var(--lk-ink)]"
            />
            {error ? <p className="text-sm text-red-700">{error}</p> : null}
            <button
              type="submit"
              disabled={status === "loading"}
              className="lk-btn lk-btn-lg w-full disabled:opacity-60"
            >
              {status === "loading" ? "Saving…" : LOUPKIDS_CTA.waitlist}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
