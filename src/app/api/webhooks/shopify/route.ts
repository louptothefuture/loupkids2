import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";

/**
 * Shopify orders/paid webhook → server-side purchase conversions.
 *
 * Sends the purchase event to:
 *  - GA4 Measurement Protocol (requires GA4_API_SECRET + NEXT_PUBLIC_GA4_MEASUREMENT_ID)
 *  - Meta Conversions API (requires META_CAPI_ACCESS_TOKEN + NEXT_PUBLIC_META_PIXEL_ID)
 *
 * Configure in Shopify admin: Settings → Notifications → Webhooks →
 * "Order payment" → https://loupkids.com/api/webhooks/shopify
 */

const WEBHOOK_SECRET = process.env.SHOPIFY_WEBHOOK_SECRET;

function verifyHmac(rawBody: string, hmacHeader: string | null): boolean {
  if (!WEBHOOK_SECRET || !hmacHeader) return false;
  const digest = crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(rawBody, "utf8")
    .digest("base64");
  try {
    return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(hmacHeader));
  } catch {
    return false;
  }
}

type ShopifyOrder = {
  id: number;
  total_price: string;
  currency: string;
  email?: string;
  line_items: { product_id: number; variant_id: number; title: string; price: string; quantity: number }[];
};

async function sendGa4Purchase(order: ShopifyOrder) {
  const measurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
  const apiSecret = process.env.GA4_API_SECRET;
  if (!measurementId || !apiSecret) return;

  await fetch(
    `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
    {
      method: "POST",
      body: JSON.stringify({
        client_id: `shopify.${order.id}`,
        events: [
          {
            name: "purchase",
            params: {
              transaction_id: String(order.id),
              currency: order.currency,
              value: parseFloat(order.total_price),
              items: order.line_items.map((li) => ({
                item_id: String(li.variant_id),
                item_name: li.title,
                price: parseFloat(li.price),
                quantity: li.quantity,
              })),
            },
          },
        ],
      }),
    },
  );
}

async function sendMetaPurchase(order: ShopifyOrder) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !accessToken) return;

  const hashedEmail = order.email
    ? crypto.createHash("sha256").update(order.email.trim().toLowerCase()).digest("hex")
    : undefined;

  await fetch(`https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${accessToken}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: [
        {
          event_name: "Purchase",
          event_time: Math.floor(Date.now() / 1000),
          event_id: `order.${order.id}`,
          action_source: "website",
          user_data: hashedEmail ? { em: [hashedEmail] } : {},
          custom_data: {
            currency: order.currency,
            value: parseFloat(order.total_price),
            content_ids: order.line_items.map((li) => String(li.variant_id)),
            content_type: "product",
          },
        },
      ],
    }),
  });
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const hmac = req.headers.get("x-shopify-hmac-sha256");

  if (!verifyHmac(rawBody, hmac)) {
    return NextResponse.json({ error: "Invalid HMAC" }, { status: 401 });
  }

  const topic = req.headers.get("x-shopify-topic");
  if (topic !== "orders/paid") {
    return NextResponse.json({ ok: true, skipped: topic });
  }

  const order = JSON.parse(rawBody) as ShopifyOrder;
  const results = await Promise.allSettled([sendGa4Purchase(order), sendMetaPurchase(order)]);
  results.forEach((r) => {
    if (r.status === "rejected") console.error("Conversion send failed", r.reason);
  });

  return NextResponse.json({ ok: true });
}
