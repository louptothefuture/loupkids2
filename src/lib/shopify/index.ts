import {
  ADD_TO_CART_MUTATION,
  CREATE_CART_MUTATION,
  GET_CART_QUERY,
  GET_PRODUCT_QUERY,
  GET_PRODUCTS_QUERY,
  REMOVE_FROM_CART_MUTATION,
  UPDATE_CART_MUTATION,
} from "./queries";
import { MOCK_PRODUCTS, findMockProduct } from "./mock";
import type { Cart, Product } from "./types";

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const API_VERSION = "2025-01";

export const isShopifyConfigured = Boolean(domain && token);

type Edge<T> = { node: T };
type Connection<T> = { edges: Edge<T>[] };

function flatten<T>(conn: Connection<T> | undefined): T[] {
  return conn?.edges.map((e) => e.node) ?? [];
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function reshapeProduct(raw: any): Product {
  return {
    ...raw,
    variants: flatten(raw.variants),
    images: flatten(raw.images),
  };
}

function reshapeCart(raw: any): Cart {
  return { ...raw, lines: flatten(raw.lines) };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export async function shopifyFetch<T>({
  query,
  variables,
  cache = "force-cache",
  revalidate,
}: {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
  revalidate?: number;
}): Promise<T> {
  if (!isShopifyConfigured) {
    throw new Error("Shopify is not configured. Set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN.");
  }
  const res = await fetch(`https://${domain}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token!,
    },
    body: JSON.stringify({ query, variables }),
    cache: revalidate !== undefined ? undefined : cache,
    ...(revalidate !== undefined ? { next: { revalidate } } : {}),
  });
  const json = await res.json();
  if (json.errors) {
    throw new Error(`Shopify error: ${JSON.stringify(json.errors)}`);
  }
  return json.data as T;
}

export async function getProduct(handle: string): Promise<Product | null> {
  if (!isShopifyConfigured) return findMockProduct(handle);
  const data = await shopifyFetch<{ product: unknown }>({
    query: GET_PRODUCT_QUERY,
    variables: { handle },
    revalidate: 300,
  });
  return data.product ? reshapeProduct(data.product) : null;
}

export async function getProducts(first = 20): Promise<Product[]> {
  if (!isShopifyConfigured) return MOCK_PRODUCTS;
  const data = await shopifyFetch<{ products: Connection<unknown> }>({
    query: GET_PRODUCTS_QUERY,
    variables: { first },
    revalidate: 300,
  });
  return flatten(data.products).map(reshapeProduct);
}

export async function createCart(lines: { merchandiseId: string; quantity: number }[]): Promise<Cart> {
  const data = await shopifyFetch<{ cartCreate: { cart: unknown } }>({
    query: CREATE_CART_MUTATION,
    variables: { lines },
    cache: "no-store",
  });
  return reshapeCart(data.cartCreate.cart);
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[],
): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: unknown } }>({
    query: ADD_TO_CART_MUTATION,
    variables: { cartId, lines },
    cache: "no-store",
  });
  return reshapeCart(data.cartLinesAdd.cart);
}

export async function updateCart(
  cartId: string,
  lines: { id: string; quantity: number }[],
): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: unknown } }>({
    query: UPDATE_CART_MUTATION,
    variables: { cartId, lines },
    cache: "no-store",
  });
  return reshapeCart(data.cartLinesUpdate.cart);
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: unknown } }>({
    query: REMOVE_FROM_CART_MUTATION,
    variables: { cartId, lineIds },
    cache: "no-store",
  });
  return reshapeCart(data.cartLinesRemove.cart);
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const data = await shopifyFetch<{ cart: unknown }>({
    query: GET_CART_QUERY,
    variables: { cartId },
    cache: "no-store",
  });
  return data.cart ? reshapeCart(data.cart) : null;
}
