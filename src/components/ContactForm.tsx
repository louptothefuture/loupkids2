"use client";

import { useState } from "react";
import { trackLead } from "@/lib/analytics";

const inputClass =
  "w-full border border-[var(--lk-line)] bg-white px-4 py-3 text-base outline-none transition-colors focus:border-[var(--lk-ink)]";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      trackLead("contact_form");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="lk-card lk-card-pad text-center">
        <p className="lk-display lk-h3">Got it.</p>
        <p className="lk-prose-muted mt-3">
          Your message is in — a human will reply shortly, usually same-day on weekdays.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="lk-card lk-card-pad">
      <div className="grid gap-5">
        <label className="grid gap-2">
          <span className="lk-label">Your name</span>
          <input name="name" required autoComplete="name" className={inputClass} />
        </label>
        <label className="grid gap-2">
          <span className="lk-label">Email</span>
          <input name="email" type="email" required autoComplete="email" className={inputClass} />
        </label>
        <label className="grid gap-2">
          <span className="lk-label">Topic</span>
          <select name="topic" className={inputClass}>
            <option>Question before I buy</option>
            <option>Order / shipping</option>
            <option>Returns / warranty</option>
            <option>Calling plan</option>
            <option>Press</option>
            <option>Interest in investing</option>
            <option>Something else</option>
          </select>
        </label>
        <label className="grid gap-2">
          <span className="lk-label">Message</span>
          <textarea name="message" required rows={5} className={inputClass} />
        </label>
        <button type="submit" disabled={status === "sending"} className="lk-btn disabled:opacity-60">
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        {status === "error" && (
          <p className="text-sm text-[var(--lk-muted)]">
            Something broke. Email us directly at hello@loupkids.com.
          </p>
        )}
      </div>
    </form>
  );
}
