import { NextRequest, NextResponse } from "next/server";
import { SITE } from "@/lib/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Pre-order waitlist — emails the signup to your inbox (Resend).
 * Set RESEND_API_KEY in Vercel. Optional: WAITLIST_NOTIFY_EMAIL (defaults to SITE.email).
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const source = typeof body?.source === "string" ? body.source.slice(0, 80) : "site";

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.WAITLIST_NOTIFY_EMAIL || SITE.email;
  const from =
    process.env.WAITLIST_FROM_EMAIL || "Loup Waitlist <onboarding@resend.dev>";

  if (!apiKey) {
    console.log("[waitlist]", JSON.stringify({ email, source, to }));
    return NextResponse.json(
      { error: "Email isn’t configured yet — try again soon." },
      { status: 503 },
    );
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Waitlist signup: ${email}`,
      text: [
        "New pre-order waitlist signup",
        "",
        `Email: ${email}`,
        `Source: ${source}`,
        `When: ${new Date().toISOString()}`,
        "",
        "Reply to this message to email them directly.",
      ].join("\n"),
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("[waitlist] resend failed", res.status, detail);
    return NextResponse.json({ error: "Couldn’t send that — try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
