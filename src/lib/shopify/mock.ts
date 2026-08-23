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
    "The phone before their first smartphone. Kids stay reachable. You stay in control. Parent-approved contacts only — no feeds, no apps, no open internet. First 500 for $129. Loup↔Loup always free. First 500: 1 year unlimited calls to external contacts · then $10/mo.",
  descriptionHtml:
    "<p>The phone before their first smartphone.</p><p>Kids stay reachable. You stay in control. Parent-approved contacts only — no feeds, no apps, no open internet.</p>",
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
      compareAtPrice: money(199),
      selectedOptions: [{ name: "Finish", value: "Silver" }],
      image: {
        url: "/images/renders/shop/studio-three-quarter.png",
        altText: "Loup — studio product shot",
        width: 768,
        height: 1024,
      },
    },
  ],
  images: [
    {
      url: "/images/renders/shop/studio-three-quarter.png",
      altText: "Loup silver — three-quarter studio view",
      width: 768,
      height: 1024,
    },
    {
      url: "/images/renders/shop/studio-front.png",
      altText: "Loup silver — front studio view",
      width: 768,
      height: 1024,
    },
    {
      url: "/images/renders/shop/studio-side-scroll.png",
      altText: "Loup silver — scroll dial side",
      width: 768,
      height: 1024,
    },
    {
      url: "/images/renders/shop/studio-side-volume.png",
      altText: "Loup silver — volume rocker side",
      width: 768,
      height: 1024,
    },
    {
      url: "/images/renders/shop/studio-back.png",
      altText: "Loup silver — back view",
      width: 768,
      height: 1024,
    },
    {
      url: "/images/renders/shop/studio-bottom.png",
      altText: "Loup silver — USB-C bottom edge",
      width: 768,
      height: 1024,
    },
  ],
  seo: {
    title: "Order Loup — Silver | $129",
    description:
      "Loup is the smartphone alternative for kids. Aluminum sides and buttons, ABS front. Voice calls to a parent-approved list. First 500 for $129 (Save 33% vs $199). Loup↔Loup always free. First 500: 1 year unlimited calls to external contacts · then $10/mo. Ships within 60 days.",
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
