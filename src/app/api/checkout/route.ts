import { NextResponse } from "next/server";
import { getStripe, isStripeConfigured, STRIPE_LOUP } from "@/lib/stripe";
import { SITE } from "@/lib/site";

export async function POST() {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: "Stripe is not configured. Set STRIPE_SECRET_KEY." },
      { status: 503 },
    );
  }

  // Canonical origin only — never trust Host / X-Forwarded-Host for redirects.
  const origin = SITE.url.replace(/\/$/, "");
  const stripe = getStripe();

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: STRIPE_LOUP.currency,
            unit_amount: STRIPE_LOUP.unitAmountCents,
            product_data: {
              name: STRIPE_LOUP.name,
              description: STRIPE_LOUP.description,
              images: [`${origin}/images/renders/shop/a_4.jpg`],
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
