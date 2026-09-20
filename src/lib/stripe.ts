import Stripe from "stripe";

/** Server-only Stripe client. Requires STRIPE_SECRET_KEY. */
export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Missing STRIPE_SECRET_KEY");
  // ponytail: let SDK pin its release API version — avoid hardcoding drift
  return new Stripe(key);
}

export const STRIPE_LOUP = {
  wifi: {
    name: "LOUP WiFi",
    description: "Pre-order · $149 · LOUP↔LOUP free · external $10/mo · ships within 60 days",
    unitAmountCents: 14_900,
    pairUnitAmountCents: 14_900,
    pairDescription: "2-pack · $298 · LOUP WiFi · ships within 60 days",
  },
  lte: {
    name: "LOUP WiFi + LTE",
    description: "Pre-order · $199 · LOUP↔LOUP free · external $10/mo · LTE included · ships within 60 days",
    unitAmountCents: 19_900,
    pairUnitAmountCents: 19_900,
    pairDescription: "2-pack · $398 · LOUP WiFi + LTE · ships within 60 days",
  },
  pairQuantity: 2,
  currency: "usd",
} as const;

export function isStripeConfigured() {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}
