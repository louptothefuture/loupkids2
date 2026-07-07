"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/lib/shopify/types";
import { useCart } from "@/components/cart/CartProvider";
import { trackViewItem } from "@/lib/analytics";
import { LOUPKIDS_CTA } from "@/lib/content/loupkids-conversion";
import { FALLBACK_TESTIMONIALS } from "@/lib/content/fallback";
import {
  LoupkidsGuaranteeBadge,
} from "@/components/loupkids/conversion";

function formatPrice(amount: string, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(parseFloat(amount));
}

export function ProductView({ product }: { product: Product }) {
  const { addItem, pending } = useCart();
  const optionName = product.options[0]?.name;
  const [selected, setSelected] = useState(product.variants[0]);
  const [activeImage, setActiveImage] = useState(0);
  const featuredQuote = FALLBACK_TESTIMONIALS.find((t) => t.featured) ?? FALLBACK_TESTIMONIALS[0];

  useEffect(() => {
    trackViewItem({
      item_id: selected.id,
      item_name: product.title,
      item_variant: selected.title,
      price: parseFloat(selected.price.amount),
      quantity: 1,
    });
    // fire once per product view
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

  const gallery = useMemo(() => {
    const variantImage = selected.image;
    if (!variantImage) return product.images;
    const rest = product.images.filter((i) => i.url !== variantImage.url);
    return [variantImage, ...rest];
  }, [product.images, selected]);

  const shown = gallery[Math.min(activeImage, gallery.length - 1)];

  const selectVariant = (value: string) => {
    const v = product.variants.find((v) => v.title === value);
    if (v) {
      setSelected(v);
      setActiveImage(0);
    }
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
      <div>
        <div className="relative aspect-[4/5] overflow-hidden border border-[var(--lk-line)] bg-neutral-50 sm:aspect-[5/4]">
          <AnimatePresence mode="wait">
            <motion.div
              key={shown?.url}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              {shown && (
                <Image
                  src={shown.url}
                  alt={shown.altText ?? product.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-contain p-8"
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
          {gallery.map((img, i) => (
            <button
              key={img.url}
              onClick={() => setActiveImage(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative h-20 w-16 shrink-0 cursor-pointer overflow-hidden border bg-white transition-opacity hover:opacity-80 ${
                i === activeImage ? "border-[var(--lk-ink)]" : "border-[var(--lk-line)]"
              }`}
            >
              <Image src={img.url} alt="" fill sizes="64px" className="object-contain p-1" />
            </button>
          ))}
        </div>
      </div>

      <div className="lg:pt-4">
        <p className="lk-label mb-3">Product</p>
        <h1 className="lk-display text-left text-3xl sm:text-4xl">{product.title}</h1>
        <p className="mt-4 leading-relaxed text-[var(--lk-muted)]">{product.description}</p>

        {featuredQuote ? (
          <blockquote className="mt-6 border-l-2 border-[var(--lk-line)] pl-4 text-sm leading-relaxed text-[var(--lk-muted)]">
            &ldquo;{featuredQuote.quote}&rdquo;
            <footer className="lk-label mt-2">{featuredQuote.attribution}</footer>
          </blockquote>
        ) : null}

        <div className="mt-6 text-2xl font-medium">
          {formatPrice(selected.price.amount, selected.price.currencyCode)}
          {selected.compareAtPrice && (
            <span className="ml-3 text-lg text-[var(--lk-muted)] line-through">
              {formatPrice(selected.compareAtPrice.amount, selected.compareAtPrice.currencyCode)}
            </span>
          )}
        </div>

        {optionName && (
          <fieldset className="mt-8">
            <legend className="lk-label mb-3">
              {optionName}: {selected.title}
            </legend>
            <div className="flex flex-wrap gap-2">
              {product.options[0].values.map((value) => {
                const variant = product.variants.find((v) => v.title === value);
                const active = selected.title === value;
                return (
                  <button
                    key={value}
                    onClick={() => selectVariant(value)}
                    disabled={!variant?.availableForSale}
                    className={`cursor-pointer border px-4 py-2 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                      active
                        ? "border-[var(--lk-ink)] bg-[var(--lk-ink)] text-white"
                        : "border-[var(--lk-line)] hover:border-[var(--lk-ink)]"
                    }`}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        <button
          onClick={() =>
            addItem(selected.id, {
              title: product.title,
              variantTitle: selected.title,
              price: parseFloat(selected.price.amount),
            })
          }
          disabled={pending || !selected.availableForSale}
          className="lk-btn lk-btn-lg mt-8 w-full disabled:opacity-60"
        >
          {selected.availableForSale ? (pending ? "Adding…" : LOUPKIDS_CTA.product) : "Sold out"}
        </button>
        <LoupkidsGuaranteeBadge className="mt-4" />

        <ul className="mt-4 space-y-2 text-sm text-[var(--lk-muted)]">
          <li>Pre-order · shipping Q4 2026</li>
          <li>2-year kid-proof warranty (drops included)</li>
          <li>10 contacts free · Loup-to-Loup always free · Plus from $10/mo for external numbers</li>
        </ul>
      </div>
    </div>
  );
}
