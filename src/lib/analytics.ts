"use client";

/**
 * Client-side analytics helpers. Fire GA4 + Meta Pixel events in one call.
 * Purchase events are fired server-side from the Shopify orders/paid webhook
 * (see /api/webhooks/shopify) — these cover the browsing funnel.
 */

type Item = {
  item_id: string;
  item_name: string;
  item_variant?: string;
  price: number;
  quantity: number;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  window.gtag?.(...args);
}

function fbq(...args: unknown[]) {
  window.fbq?.(...args);
}

export function trackViewItem(item: Item) {
  gtag("event", "view_item", {
    currency: "USD",
    value: item.price * item.quantity,
    items: [item],
  });
  fbq("track", "ViewContent", {
    content_ids: [item.item_id],
    content_name: item.item_name,
    content_type: "product",
    value: item.price,
    currency: "USD",
  });
}

export function trackAddToCart(item: Item) {
  gtag("event", "add_to_cart", {
    currency: "USD",
    value: item.price * item.quantity,
    items: [item],
  });
  fbq("track", "AddToCart", {
    content_ids: [item.item_id],
    content_name: item.item_name,
    content_type: "product",
    value: item.price * item.quantity,
    currency: "USD",
  });
}

export function trackBeginCheckout(items: Item[], value: number) {
  gtag("event", "begin_checkout", { currency: "USD", value, items });
  fbq("track", "InitiateCheckout", {
    content_ids: items.map((i) => i.item_id),
    content_type: "product",
    value,
    currency: "USD",
    num_items: items.reduce((s, i) => s + i.quantity, 0),
  });
}

export function trackLead(label: string) {
  gtag("event", "generate_lead", { event_label: label });
  fbq("track", "Lead");
}
