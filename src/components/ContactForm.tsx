"use client";

import { useState } from "react";
import { trackLead } from "@/lib/analytics";

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
      <div className="rounded-2xl border-2 border-ink bg-mint p-10 text-center shadow-sticker">
        <p className="display text-4xl">Got it. 📬</p>
        <p className="mt-3 text-ink-soft">
          Your message is in — a human will reply shortly, usually same-day on weekdays.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border-2 border-ink bg-paper p-8 shadow-sticker">
      <div className="grid gap-5">
        <label className="grid gap-2">
          <span className="label-mono">Your name</span>
          <input
            name="name"
            required
            autoComplete="name"
            className="rounded-xl border-2 border-ink/25 bg-paper px-4 py-3 outline-none transition-colors focus:border-ink"
          />
        </label>
        <label className="grid gap-2">
          <span className="label-mono">Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="rounded-xl border-2 border-ink/25 bg-paper px-4 py-3 outline-none transition-colors focus:border-ink"
          />
        </label>
        <label className="grid gap-2">
          <span className="label-mono">Topic</span>
          <select
            name="topic"
            className="rounded-xl border-2 border-ink/25 bg-paper px-4 py-3 outline-none transition-colors focus:border-ink"
          >
            <option>Question before I buy</option>
            <option>Order / shipping</option>
            <option>Returns / warranty</option>
            <option>Calling plan</option>
            <option>Press</option>
            <option>Something else</option>
          </select>
        </label>
        <label className="grid gap-2">
          <span className="label-mono">Message</span>
          <textarea
            name="message"
            required
            rows={5}
            className="rounded-xl border-2 border-ink/25 bg-paper px-4 py-3 outline-none transition-colors focus:border-ink"
          />
        </label>
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-sticker justify-center bg-loup-red px-6 py-4 text-lg text-paper disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send it"}
        </button>
        {status === "error" && (
          <p className="text-sm text-loup-red">
            Something broke. Email us directly at hello@loupkids.com.
          </p>
        )}
      </div>
    </form>
  );
}
