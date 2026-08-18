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
  description:
    "First 500 · $129 · Loup↔Loup + App→Loup free · year-1 external calling · ships within 60 days",
  unitAmountCents: SITE.price * 100,
  pairQuantity: 2,
  pairUnitAmountCents: 12_500, // $125 each → $250
  pairDescription:
    "2-pack · $250 · Loup↔Loup + App→Loup free · year-1 external calling · ships within 60 days",
  currency: "usd",
} as const;

export function isStripeConfigured() {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}
