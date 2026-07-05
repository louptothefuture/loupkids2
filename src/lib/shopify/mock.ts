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
  title: "LOUP",
  description:
    "The phone before their first smartphone. Approved contacts only, no apps, no algorithms. E-Ink display, Wi-Fi connected, parent-controlled. Free LOUP-to-LOUP calling; add real phone numbers for $10/month.",
  descriptionHtml:
    "<p>The screenless voice phone for kids 6–16. Real calls and voice messages to a parent-approved contact list. No apps, no feeds, no screen.</p><p>Free LOUP-to-LOUP calling forever. Add calling to real phone numbers for $10/month.</p>",
  availableForSale: true,
  options: [{ name: "Color", values: ["Silver", "Signal Red", "Black"] }],
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
      compareAtPrice: null,
      selectedOptions: [{ name: "Color", value: "Silver" }],
      image: {
        url: "/images/product/loup-silver-front.png",
        altText: "LOUP in silver anodized aluminum",
        width: 900,
        height: 1024,
      },
    },
    {
      id: "gid://shopify/ProductVariant/loup-red",
      title: "Signal Red",
      availableForSale: true,
      quantityAvailable: 180,
      price: money(149),
      compareAtPrice: null,
      selectedOptions: [{ name: "Color", value: "Signal Red" }],
      image: {
        url: "/images/product/loup-red-front.jpg",
        altText: "LOUP in signal red anodized aluminum",
        width: 905,
        height: 1024,
      },
    },
    {
      id: "gid://shopify/ProductVariant/loup-black",
      title: "Black",
      availableForSale: true,
      quantityAvailable: 140,
      price: money(149),
      compareAtPrice: null,
      selectedOptions: [{ name: "Color", value: "Black" }],
      image: {
        url: "/images/product/loup-black-front.jpg",
        altText: "LOUP in matte black anodized aluminum",
        width: 905,
        height: 1024,
      },
    },
  ],
  images: [
    {
      url: "/images/product/loup-silver-front.png",
      altText: "LOUP silver — front",
      width: 900,
      height: 1024,
    },
    {
      url: "/images/product/loup-red-front.jpg",
      altText: "LOUP signal red — front",
      width: 905,
      height: 1024,
    },
    {
      url: "/images/product/loup-black-front.jpg",
      altText: "LOUP black — front",
      width: 905,
      height: 1024,
    },
    {
      url: "/images/product/loup-three-quarter.jpg",
      altText: "LOUP three-quarter view showing e-ink contact list",
      width: 765,
      height: 1024,
    },
    {
      url: "/images/product/loup-ports.jpg",
      altText: "LOUP bottom edge — USB-C and headphone jack",
      width: 765,
      height: 1024,
    },
    {
      url: "/images/product/loup-back-plate.jpg",
      altText: "LOUP swappable back plate and volume rocker",
      width: 1024,
      height: 878,
    },
    {
      url: "/images/product/loup-box.jpg",
      altText: "LOUP in its box — get ready to start intentional connection",
      width: 903,
      height: 1024,
    },
  ],
  seo: {
    title: "Buy LOUP — The Screenless Phone for Kids | $149",
    description:
      "LOUP is the smartphone alternative for kids 6–16. Voice calls to a parent-approved list, zero screen time. Free shipping, 30-day returns, 2-year warranty.",
  },
};

export const MOCK_PLATES: Product = {
  id: "gid://shopify/Product/loup-plates",
  handle: "custom-back-plates",
  title: "Custom Back Plates",
  description:
    "Snap-on anodized back plates. Print your own photo, rep your team, or grab a pattern. Tool-free swap in seconds.",
  descriptionHtml:
    "<p>Snap-on anodized back plates. Print your own photo, rep your team, or grab a pattern. Tool-free swap in seconds.</p>",
  availableForSale: true,
  options: [
    {
      name: "Design",
      values: ["Friends Photo", "Baseball", "Gymnastics", "Palm Trees", "Panda", "Purple Pattern"],
    },
  ],
  priceRange: {
    minVariantPrice: money(24),
    maxVariantPrice: money(24),
  },
  variants: [
    "Friends Photo",
    "Baseball",
    "Gymnastics",
    "Palm Trees",
    "Panda",
    "Purple Pattern",
  ].map((design, i) => ({
    id: `gid://shopify/ProductVariant/plate-${i}`,
    title: design,
    availableForSale: true,
    quantityAvailable: 500,
    price: money(24),
    compareAtPrice: null,
    selectedOptions: [{ name: "Design", value: design }],
    image: {
      url: `/images/plates/${design.toLowerCase().replace(" photo", "").replace(" ", "-")}.png`,
      altText: `LOUP custom back plate — ${design}`,
      width: 800,
      height: 700,
    },
  })),
  images: [
    { url: "/images/plates/friends.png", altText: "Friends photo plate", width: 800, height: 700 },
    { url: "/images/plates/baseball.png", altText: "Baseball plate", width: 800, height: 700 },
    { url: "/images/plates/gymnastics.png", altText: "Gymnastics plate", width: 800, height: 700 },
    { url: "/images/plates/palm-trees.png", altText: "Palm trees plate", width: 800, height: 700 },
    { url: "/images/plates/panda.png", altText: "Panda plate", width: 800, height: 700 },
    { url: "/images/plates/purple-pattern.png", altText: "Purple pattern plate", width: 800, height: 700 },
  ],
  seo: {
    title: "LOUP Custom Back Plates — Make It Yours",
    description:
      "Swappable anodized back plates for LOUP. Custom photos, sports, patterns. $24.",
  },
};

export const MOCK_PRODUCTS = [MOCK_LOUP, MOCK_PLATES];

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
