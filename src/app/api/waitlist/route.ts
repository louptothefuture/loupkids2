import { NextRequest, NextResponse } from "next/server";
import { isEmail, sendResendEmail } from "@/lib/email";

/**
 * Pre-order waitlist — emails the signup to your inbox (Resend).
 * Set RESEND_API_KEY in Vercel. Optional: WAITLIST_NOTIFY_EMAIL (defaults to SITE.email).
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const source = typeof body?.source === "string" ? body.source.slice(0, 80) : "site";

  if (!email || !isEmail(email)) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }

  const sent = await sendResendEmail({
    replyTo: email,
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
  });

  if (!sent.ok) {
    return NextResponse.json(
      {
        error:
          sent.status === 503
            ? "Email isn’t configured yet — try again soon."
            : "Couldn’t send that — try again.",
      },
      { status: sent.status },
    );
  }

  return NextResponse.json({ ok: true });
}
