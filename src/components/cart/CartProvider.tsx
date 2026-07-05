"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Cart } from "@/lib/shopify/types";
import { trackAddToCart } from "@/lib/analytics";

type CartContextValue = {
  cart: Cart | null;
  isMock: boolean;
  isOpen: boolean;
  pending: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string, opts: { title: string; variantTitle: string; price: number }) => Promise<void>;
  updateItem: (lineId: string, variantId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string, variantId: string) => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);

async function cartRequest(body: Record<string, unknown>): Promise<{ cart: Cart | null; mock: boolean }> {
  const res = await fetch("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Cart request failed");
  return res.json();
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isMock, setIsMock] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    cartRequest({ action: "get" })
      .then(({ cart, mock }) => {
        setCart(cart);
        setIsMock(mock);
      })
      .catch(() => {});
  }, []);

  const addItem = useCallback(
    async (variantId: string, opts: { title: string; variantTitle: string; price: number }) => {
      setPending(true);
      try {
        const { cart, mock } = await cartRequest({ action: "add", variantId, quantity: 1 });
        setCart(cart);
        setIsMock(mock);
        setIsOpen(true);
        trackAddToCart({
          item_id: variantId,
          item_name: opts.title,
          item_variant: opts.variantTitle,
          price: opts.price,
          quantity: 1,
        });
      } finally {
        setPending(false);
      }
    },
    [],
  );

  const updateItem = useCallback(async (lineId: string, variantId: string, quantity: number) => {
    setPending(true);
    try {
      const { cart } = await cartRequest({ action: "update", lineId, variantId, quantity });
      setCart(cart);
    } finally {
      setPending(false);
    }
  }, []);

  const removeItem = useCallback(async (lineId: string, variantId: string) => {
    setPending(true);
    try {
      const { cart } = await cartRequest({ action: "remove", lineId, variantId });
      setCart(cart);
    } finally {
      setPending(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      cart,
      isMock,
      isOpen,
      pending,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      updateItem,
      removeItem,
    }),
    [cart, isMock, isOpen, pending, addItem, updateItem, removeItem],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
