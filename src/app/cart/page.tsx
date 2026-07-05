"use client";

import { useEffect } from "react";
import { useCart } from "@/components/cart/CartProvider";

/**
 * /cart opens the cart drawer over the homepage-equivalent context.
 * Checkout itself is Shopify-hosted (real inventory, tax, shipping, discounts).
 */
export default function CartPage() {
  const { openCart } = useCart();

  useEffect(() => {
    openCart();
  }, [openCart]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
      <h1 className="display text-5xl">Your bag</h1>
      <p className="mt-4 text-ink-soft">
        Your bag opens on the right. Checkout is secure, powered by Shopify — cards, Apple Pay,
        Google Pay, and Shop Pay all work.
      </p>
    </div>
  );
}
