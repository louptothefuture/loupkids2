import Stripe from "stripe";
import { SITE } from "@/lib/site";

/** Server-only Stripe client. Requires STRIPE_SECRET_KEY. */
export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Missing STRIPE_SECRET_KEY");
  // ponytail: let SDK pin its release API version — avoid hardcoding drift
  return new Stripe(key);
}

export const STRIPE_LOUP = {
  name: "Loup — Silver",
  description: "Pre-order · ships October 2026 · aluminum sides & buttons, ABS front",
  unitAmountCents: SITE.price * 100,
  currency: "usd",
} as const;

export function isStripeConfigured() {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}
