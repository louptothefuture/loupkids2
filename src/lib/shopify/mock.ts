import type { Cart, CartLine, Product } from "./types";

/**
 * Mock Storefront API data used until real Shopify credentials are added.
 * Shapes mirror the Storefront API exactly so swapping in the real client
 * requires zero component changes.
 */

const money = (amount: number) => ({
  amount: amount.toFixed(2),
  currencyCode: "USD",
});

export const MOCK_LOUP: Product = {
  id: "gid://shopify/Product/loup-device",
  handle: "loup",
  title: "Loup",
  description:
    "The phone before their first smartphone. Your kid stays reachable. You stay in control. No feeds, no algorithms, no strangers — just the people you approve, and nothing else. Voice calls to a parent-built contact list. E-Ink display. Wi-Fi only — no SIM, no carrier bill. Aluminum sides and buttons built to survive being a kid's. Loup-to-Loup calling is always free; add real phone numbers for $10/month.",
  descriptionHtml:
    "<p>The phone before their first smartphone.</p><p>Your kid stays reachable. You stay in control. No feeds, no algorithms, no strangers — just the people you approve, and nothing else.</p><p>Voice calls to a parent-built contact list. E-Ink display. Wi-Fi only — no SIM, no carrier bill. Aluminum sides and buttons built to survive being a kid's. Loup-to-Loup calling is always free; add real phone numbers for $10/month.</p>",
  availableForSale: true,
  options: [{ name: "Finish", values: ["Silver"] }],
  priceRange: {
    minVariantPrice: money(129),
    maxVariantPrice: money(129),
  },
  variants: [
    {
      id: "gid://shopify/ProductVariant/loup-silver",
      title: "Silver",
      availableForSale: true,
      quantityAvailable: 250,
      price: money(129),
      compareAtPrice: money(169),
      selectedOptions: [{ name: "Finish", value: "Silver" }],
      image: {
        url: "/images/renders/shop/a_4.jpg",
        altText: "Loup — aluminum sides, ABS front",
        width: 1200,
        height: 1600,
      },
    },
  ],
  images: [
    {
      url: "/images/renders/shop/a_4.jpg",
      altText: "Loup silver — three-quarter with wordmark",
      width: 1200,
      height: 1600,
    },
    {
      url: "/images/renders/shop/a_10.jpg",
      altText: "Loup silver — front face",
      width: 1200,
      height: 1600,
    },
    {
      url: "/images/renders/shop/a_9.jpg",
      altText: "Loup silver — three-quarter view",
      width: 1200,
      height: 1600,
    },
    {
      url: "/images/renders/shop/a_3.jpg",
      altText: "Loup silver — scroll dial side",
      width: 1200,
      height: 1600,
    },
    {
      url: "/images/renders/shop/a_1.jpg",
      altText: "Loup silver — volume rocker side",
      width: 1200,
      height: 1600,
    },
    {
      url: "/images/renders/shop/a_8.jpg",
      altText: "Loup silver — back panel",
      width: 1200,
      height: 1600,
    },
    {
      url: "/images/renders/shop/a_11.jpg",
      altText: "Loup silver — back panel angled",
      width: 1200,
      height: 1600,
    },
  ],
  seo: {
    title: "Pre-order Loup — Silver | $129 Pre-Launch",
    description:
      "Loup is the smartphone alternative for kids. Aluminum sides and buttons, ABS front. Voice calls to a parent-approved list, zero screen time. Free shipping, 30-day returns.",
  },
};

export const MOCK_PRODUCTS = [MOCK_LOUP];

export function findMockProduct(handle: string): Product | null {
  return MOCK_PRODUCTS.find((p) => p.handle === handle) ?? null;
}

function findVariant(variantId: string) {
  for (const product of MOCK_PRODUCTS) {
    const v = product.variants.find((v) => v.id === variantId);
    if (v) return { product, variant: v };
  }
  return null;
}

/** Serializable mock cart state stored in a cookie. */
export type MockCartState = { id: string; lines: { variantId: string; quantity: number }[] };

export function emptyMockCart(): MockCartState {
  return { id: `mock-cart-${Math.random().toString(36).slice(2, 10)}`, lines: [] };
}

export function mockCartAdd(state: MockCartState, variantId: string, quantity: number): MockCartState {
  const existing = state.lines.find((l) => l.variantId === variantId);
  if (existing) existing.quantity += quantity;
  else state.lines.push({ variantId, quantity });
  return state;
}

export function mockCartUpdate(state: MockCartState, variantId: string, quantity: number): MockCartState {
  state.lines = state.lines
    .map((l) => (l.variantId === variantId ? { ...l, quantity } : l))
    .filter((l) => l.quantity > 0);
  return state;
}

export function mockCartRemove(state: MockCartState, variantId: string): MockCartState {
  state.lines = state.lines.filter((l) => l.variantId !== variantId);
  return state;
}

export function hydrateMockCart(state: MockCartState): Cart {
  const lines: CartLine[] = state.lines.flatMap((l) => {
    const found = findVariant(l.variantId);
    if (!found) return [];
    const { product, variant } = found;
    const lineTotal = parseFloat(variant.price.amount) * l.quantity;
    return [
      {
        id: `line-${l.variantId}`,
        quantity: l.quantity,
        merchandise: {
          id: variant.id,
          title: variant.title,
          selectedOptions: variant.selectedOptions,
          product: { id: product.id, handle: product.handle, title: product.title },
          image: variant.image,
          price: variant.price,
        },
        cost: { totalAmount: money(lineTotal) },
      },
    ];
  });
  const subtotal = lines.reduce((sum, l) => sum + parseFloat(l.cost.totalAmount.amount), 0);
  return {
    id: state.id,
    checkoutUrl: "/checkout-preview",
    totalQuantity: lines.reduce((sum, l) => sum + l.quantity, 0),
    lines,
    cost: {
      subtotalAmount: money(subtotal),
      totalAmount: money(subtotal),
      totalTaxAmount: null,
    },
  };
}
