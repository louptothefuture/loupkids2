"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "./CartProvider";
import { trackBeginCheckout } from "@/lib/analytics";

function formatMoney(amount: string, currencyCode: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 0,
  }).format(parseFloat(amount));
}

export function CartDrawer() {
  const { cart, isMock, isOpen, pending, closeCart, updateItem, removeItem } = useCart();

  const handleCheckout = () => {
    if (!cart) return;
    trackBeginCheckout(
      cart.lines.map((l) => ({
        item_id: l.merchandise.id,
        item_name: l.merchandise.product.title,
        item_variant: l.merchandise.title,
        price: parseFloat(l.merchandise.price.amount),
        quantity: l.quantity,
      })),
      parseFloat(cart.cost.totalAmount.amount),
    );
    window.location.href = cart.checkoutUrl;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            aria-label="Close cart"
            className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            role="dialog"
            aria-label="Shopping cart"
            className="fixed right-0 top-0 z-50 flex h-dvh w-full max-w-md flex-col border-l-2 border-ink bg-paper"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="flex items-center justify-between border-b-2 border-ink px-6 py-4">
              <h2 className="display text-2xl">Your bag</h2>
              <button
                onClick={closeCart}
                aria-label="Close"
                className="label-mono cursor-pointer hover:text-loup-red"
              >
                Close ✕
              </button>
            </div>

            {!cart || cart.lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                <p className="display text-3xl text-ink/30">Nothing here yet</p>
                <p className="text-sm text-ink-soft">Grab a LOUP. Give a kid their voice back.</p>
                <Link href="/shop/loup" onClick={closeCart} className="btn-sticker bg-loup-red px-6 py-3 text-paper">
                  Shop LOUP
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto px-6 py-4">
                  {cart.lines.map((line) => (
                    <li key={line.id} className="flex gap-4 border-b border-ink/10 py-4">
                      {line.merchandise.image && (
                        <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg border border-ink/10 bg-cream">
                          <Image
                            src={line.merchandise.image.url}
                            alt={line.merchandise.image.altText ?? line.merchandise.product.title}
                            fill
                            sizes="80px"
                            className="object-contain p-1"
                          />
                        </div>
                      )}
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-2">
                          <p className="font-semibold">{line.merchandise.product.title}</p>
                          <p className="font-semibold">
                            {formatMoney(line.cost.totalAmount.amount, line.cost.totalAmount.currencyCode)}
                          </p>
                        </div>
                        <p className="text-sm text-ink-soft">{line.merchandise.title}</p>
                        <div className="mt-auto flex items-center gap-3 pt-2">
                          <div className="flex items-center rounded-full border border-ink/20">
                            <button
                              aria-label="Decrease quantity"
                              disabled={pending}
                              onClick={() => updateItem(line.id, line.merchandise.id, line.quantity - 1)}
                              className="cursor-pointer px-3 py-1 hover:text-loup-red disabled:opacity-40"
                            >
                              −
                            </button>
                            <span className="min-w-6 text-center text-sm">{line.quantity}</span>
                            <button
                              aria-label="Increase quantity"
                              disabled={pending}
                              onClick={() => updateItem(line.id, line.merchandise.id, line.quantity + 1)}
                              className="cursor-pointer px-3 py-1 hover:text-loup-red disabled:opacity-40"
                            >
                              +
                            </button>
                          </div>
                          <button
                            disabled={pending}
                            onClick={() => removeItem(line.id, line.merchandise.id)}
                            className="label-mono cursor-pointer text-ink/50 hover:text-loup-red disabled:opacity-40"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t-2 border-ink px-6 py-5">
                  <div className="mb-1 flex justify-between">
                    <span className="label-mono text-ink-soft">Subtotal</span>
                    <span className="font-bold">
                      {formatMoney(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode)}
                    </span>
                  </div>
                  <p className="mb-4 text-xs text-ink-soft">
                    Free shipping · 30-day returns · shipping &amp; tax at checkout
                  </p>
                  <button
                    onClick={handleCheckout}
                    disabled={pending}
                    className="btn-sticker w-full justify-center bg-loup-red px-6 py-4 text-lg text-paper disabled:opacity-60"
                  >
                    Checkout →
                  </button>
                  {isMock && (
                    <p className="mt-3 text-center text-xs text-ink/40">
                      Preview mode — checkout activates when Shopify is connected.
                    </p>
                  )}
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
