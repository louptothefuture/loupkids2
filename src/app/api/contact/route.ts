import { NextRequest, NextResponse } from "next/server";

/**
 * Contact form intake. Forwards to a webhook (Zapier/Make/Slack) if
 * CONTACT_WEBHOOK_URL is set; otherwise logs so submissions aren't lost
 * during pre-launch.
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: "loupkids.com/contact", ...body }),
    });
    if (!res.ok) {
      return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
    }
  } else {
    console.log("[contact]", JSON.stringify(body));
  }

  return NextResponse.json({ ok: true });
}
