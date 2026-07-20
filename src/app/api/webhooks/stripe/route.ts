import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe, isStripeConfigured } from "@/lib/stripe";

/**
 * Stripe → purchase conversions (GA4 Measurement Protocol).
 * Configure: Developers → Webhooks → checkout.session.completed
 * → https://YOUR_DOMAIN/api/webhooks/stripe
 */

async function sendGa4Purchase(session: Stripe.Checkout.Session) {
  const measurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
  const apiSecret = process.env.GA4_API_SECRET;
  if (!measurementId || !apiSecret) return;

  const amountTotal = (session.amount_total ?? 0) / 100;
  const currency = (session.currency ?? "usd").toUpperCase();

  await fetch(
    `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
    {
      method: "POST",
      body: JSON.stringify({
        client_id: `stripe.${session.id}`,
        events: [
          {
            name: "purchase",
            params: {
              transaction_id: session.id,
              value: amountTotal,
              currency,
              items: [
                {
                  item_id: "loup-silver",
                  item_name: "Loup — Silver",
                  price: amountTotal,
                  quantity: 1,
                },
              ],
            },
          },
        ],
      }),
    },
  );
}

export async function POST(req: NextRequest) {
  if (!isStripeConfigured()) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Missing STRIPE_WEBHOOK_SECRET" }, { status: 500 });
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  const stripe = getStripe();
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, secret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    // ponytail: analytics must not fail Stripe retries — isolate outbound send
    try {
      await sendGa4Purchase(session);
    } catch (err) {
      console.error("Stripe purchase analytics failed", err);
    }
  }

  return NextResponse.json({ received: true });
}
