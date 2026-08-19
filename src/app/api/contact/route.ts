import { NextRequest, NextResponse } from "next/server";
import { formatContactEmail, isEmail, sendResendEmail } from "@/lib/email";

/**
 * Contact form → inbox via Resend (same key as waitlist).
 * Optional CONTACT_WEBHOOK_URL still forwards a copy if set.
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name : "";
  const email = typeof body?.email === "string" ? body.email : "";
  const topic = typeof body?.topic === "string" ? body.topic : "";
  const message = typeof body?.message === "string" ? body.message : "";

  if (!name.trim() || !isEmail(email.trim()) || !topic.trim() || !message.trim()) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const payload = formatContactEmail({ name, email, topic, message });
  const sent = await sendResendEmail(payload);
  if (!sent.ok) {
    return NextResponse.json(
      { error: sent.status === 503 ? "Email isn’t configured yet." : "Delivery failed" },
      { status: sent.status },
    );
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: "loupkids.com/contact", name, email, topic, message }),
    });
    if (!res.ok) console.error("[contact] webhook failed", res.status);
  }

  return NextResponse.json({ ok: true });
}
