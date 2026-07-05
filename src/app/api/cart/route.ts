import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  addToCart,
  createCart,
  getCart,
  isShopifyConfigured,
  removeFromCart,
  updateCart,
} from "@/lib/shopify";
import {
  emptyMockCart,
  hydrateMockCart,
  mockCartAdd,
  mockCartRemove,
  mockCartUpdate,
  type MockCartState,
} from "@/lib/shopify/mock";

const CART_ID_COOKIE = "loup_cart_id";
const MOCK_CART_COOKIE = "loup_mock_cart";

type CartAction =
  | { action: "get" }
  | { action: "add"; variantId: string; quantity: number }
  | { action: "update"; lineId: string; variantId: string; quantity: number }
  | { action: "remove"; lineId: string; variantId: string };

async function readMockCart(): Promise<MockCartState> {
  const jar = await cookies();
  const raw = jar.get(MOCK_CART_COOKIE)?.value;
  if (!raw) return emptyMockCart();
  try {
    return JSON.parse(raw) as MockCartState;
  } catch {
    return emptyMockCart();
  }
}

function mockResponse(state: MockCartState) {
  const res = NextResponse.json({ cart: hydrateMockCart(state), mock: true });
  res.cookies.set(MOCK_CART_COOKIE, JSON.stringify(state), {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
  return res;
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as CartAction;

  if (!isShopifyConfigured) {
    const state = await readMockCart();
    switch (body.action) {
      case "get":
        return mockResponse(state);
      case "add":
        return mockResponse(mockCartAdd(state, body.variantId, body.quantity));
      case "update":
        return mockResponse(mockCartUpdate(state, body.variantId, body.quantity));
      case "remove":
        return mockResponse(mockCartRemove(state, body.variantId));
    }
  }

  const jar = await cookies();
  let cartId = jar.get(CART_ID_COOKIE)?.value;

  try {
    let cart = null;
    switch (body.action) {
      case "get": {
        cart = cartId ? await getCart(cartId) : null;
        break;
      }
      case "add": {
        if (!cartId) {
          cart = await createCart([{ merchandiseId: body.variantId, quantity: body.quantity }]);
          cartId = cart.id;
        } else {
          cart = await addToCart(cartId, [{ merchandiseId: body.variantId, quantity: body.quantity }]);
        }
        break;
      }
      case "update": {
        if (!cartId) break;
        cart = await updateCart(cartId, [{ id: body.lineId, quantity: body.quantity }]);
        break;
      }
      case "remove": {
        if (!cartId) break;
        cart = await removeFromCart(cartId, [body.lineId]);
        break;
      }
    }
    const res = NextResponse.json({ cart, mock: false });
    if (cartId) {
      res.cookies.set(CART_ID_COOKIE, cartId, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
    }
    return res;
  } catch (e) {
    console.error("Cart API error", e);
    return NextResponse.json({ error: "Cart operation failed" }, { status: 500 });
  }
}
