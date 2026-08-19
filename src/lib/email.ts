import { SITE } from "@/lib/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmail(value: string) {
  return EMAIL_RE.test(value);
}

export function formatContactEmail(input: {
  name: string;
  email: string;
  topic: string;
  message: string;
}) {
  const name = input.name.trim().slice(0, 120);
  const email = input.email.trim().toLowerCase().slice(0, 160);
  const topic = input.topic.trim().slice(0, 80);
  const message = input.message.trim().slice(0, 8000);
  return {
    subject: `Contact (${topic}): ${name}`,
    replyTo: email,
    text: [
      "New contact form submission",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Topic: ${topic}`,
      `When: ${new Date().toISOString()}`,
      "",
      message,
      "",
      "Reply to this message to email them directly.",
    ].join("\n"),
  };
}

export async function sendResendEmail(opts: {
  subject: string;
  text: string;
  replyTo?: string;
  from?: string;
}): Promise<{ ok: true } | { ok: false; status: 502 | 503 }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.WAITLIST_NOTIFY_EMAIL || SITE.email;
  const from = opts.from || process.env.WAITLIST_FROM_EMAIL || "Loup <onboarding@resend.dev>";

  if (!apiKey) return { ok: false, status: 503 };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: opts.replyTo,
      subject: opts.subject,
      text: opts.text,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("[resend] failed", res.status, detail);
    return { ok: false, status: 502 };
  }

  return { ok: true };
}
