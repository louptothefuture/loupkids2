import { NextRequest, NextResponse } from "next/server";
import { getStripe, isStripeConfigured, STRIPE_LOUP } from "@/lib/stripe";
import { SITE } from "@/lib/site";

export async function POST(req: NextRequest) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: "Stripe is not configured. Set STRIPE_SECRET_KEY." },
      { status: 503 },
    );
  }

  const body = (await req.json().catch(() => null)) as { pack?: string } | null;
  const pair = body?.pack === "pair";

  // Canonical origin only — never trust Host / X-Forwarded-Host for redirects.
  const origin = SITE.url.replace(/\/$/, "");
  const stripe = getStripe();

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: pair ? STRIPE_LOUP.pairQuantity : 1,
          price_data: {
            currency: STRIPE_LOUP.currency,
            unit_amount: pair ? STRIPE_LOUP.pairUnitAmountCents : STRIPE_LOUP.unitAmountCents,
            product_data: {
              name: pair ? `${STRIPE_LOUP.name} × 2` : STRIPE_LOUP.name,
              description: pair ? STRIPE_LOUP.pairDescription : STRIPE_LOUP.description,
              images: [`${origin}/images/renders/shop/studio/01-three-quarter.jpg`],
            },
          },
        },
      ],
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      phone_number_collection: { enabled: true },
      success_url: `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/shop/loup`,
      metadata: {
        product: "loup-silver",
        pack: pair ? "pair" : "single",
        quantity: pair ? String(STRIPE_LOUP.pairQuantity) : "1",
        fulfillment: "preorder-october-2026",
      },
    });

    if (!session.url) {
      return NextResponse.json({ error: "No checkout URL returned" }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout session failed", err);
    return NextResponse.json(
      { error: "Checkout unavailable. Try again in a moment." },
      { status: 500 },
    );
  }
}
