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
    "The phone before their first smartphone. Silver anodized aluminum. Approved contacts only, no apps, no algorithms. E-Ink display, Wi-Fi connected, parent-controlled. Free Loup-to-Loup calling; add real phone numbers for $10/month.",
  descriptionHtml:
    "<p>The screenless voice phone for kids 6–16. Silver anodized aluminum. Real calls and voice messages to a parent-approved contact list. No apps, no feeds, no screen.</p><p>Free Loup-to-Loup calling forever. Add calling to real phone numbers for $10/month.</p>",
  availableForSale: true,
  options: [{ name: "Finish", values: ["Silver"] }],
  priceRange: {
    minVariantPrice: money(149),
    maxVariantPrice: money(149),
  },
  variants: [
    {
      id: "gid://shopify/ProductVariant/loup-silver",
      title: "Silver",
      availableForSale: true,
      quantityAvailable: 250,
      price: money(149),
      compareAtPrice: money(199),
      selectedOptions: [{ name: "Finish", value: "Silver" }],
      image: {
        url: "/images/product/loup-silver-front.png",
        altText: "Loup in silver anodized aluminum",
        width: 900,
        height: 1024,
      },
    },
  ],
  images: [
    {
      url: "/images/product/loup-silver-front.png",
      altText: "Loup silver — front",
      width: 900,
      height: 1024,
    },
    {
      url: "/images/product/loup-three-quarter.jpg",
      altText: "Loup three-quarter view showing e-ink contact list",
      width: 765,
      height: 1024,
    },
    {
      url: "/images/product/loup-ports.jpg",
      altText: "Loup bottom edge — USB-C and headphone jack",
      width: 765,
      height: 1024,
    },
    {
      url: "/images/product/loup-back-plate.jpg",
      altText: "Loup swappable back plate and volume rocker",
      width: 1024,
      height: 878,
    },
    {
      url: "/images/product/loup-box.jpg",
      altText: "Loup in its box — get ready to start intentional connection",
      width: 903,
      height: 1024,
    },
  ],
  seo: {
    title: "Reserve Loup — Silver | $149 Pre-Order",
    description:
      "Loup is the smartphone alternative for kids 6–16. Silver anodized aluminum. Voice calls to a parent-approved list, zero screen time. Free shipping, 30-day returns.",
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
