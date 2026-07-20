"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/lib/shopify/types";
import { trackViewItem } from "@/lib/analytics";
import { LOUPKIDS_CTA } from "@/lib/content/loupkids-conversion";
import { FALLBACK_TESTIMONIALS } from "@/lib/content/fallback";
import { StripeCheckoutButton } from "@/components/loupkids/conversion";

function formatPrice(amount: string, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(parseFloat(amount));
}

export function ProductView({ product }: { product: Product }) {
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
    <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
      <div className="min-w-0">
        <div className="relative aspect-square overflow-hidden border border-[var(--lk-line)] bg-neutral-50">
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
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-3 sm:p-8"
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6">
          {gallery.map((img, i) => (
            <button
              key={img.url}
              type="button"
              onClick={() => setActiveImage(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={i === activeImage ? "true" : undefined}
              className={`relative aspect-square cursor-pointer overflow-hidden border bg-white transition-opacity hover:opacity-80 ${
                i === activeImage ? "border-[var(--lk-ink)]" : "border-[var(--lk-line)]"
              }`}
            >
              <Image src={img.url} alt="" fill sizes="80px" className="object-contain p-1.5" />
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-5 lg:sticky lg:top-24 lg:max-w-md lg:justify-self-end xl:max-w-lg">
        <div>
          <h1 className="lk-display text-3xl sm:text-4xl">{product.title}</h1>
          <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-2xl font-medium sm:text-3xl">
              {formatPrice(selected.price.amount, selected.price.currencyCode)}
            </span>
            {selected.compareAtPrice && (
              <span className="text-lg text-[var(--lk-muted)] line-through">
                {formatPrice(selected.compareAtPrice.amount, selected.compareAtPrice.currencyCode)}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-[var(--lk-muted)]">
            Aluminum sides & buttons · ABS front · Pre-order · ships October 2026
          </p>
        </div>

        <div
          className="space-y-3 text-[0.9375rem] leading-relaxed text-[var(--lk-muted)] [&_p]:m-0"
          dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
        />

        {featuredQuote ? (
          <blockquote className="border-l-2 border-[var(--lk-line)] pl-4 text-sm leading-relaxed text-[var(--lk-muted)]">
            &ldquo;{featuredQuote.quote}&rdquo;
            <footer className="mt-2 text-xs not-italic text-[var(--lk-muted)]">{featuredQuote.attribution}</footer>
          </blockquote>
        ) : null}

        {optionName && product.options[0].values.length > 1 && (
          <fieldset>
            <legend className="mb-2 text-sm font-medium text-[var(--lk-ink)]">
              {optionName}: {selected.title}
            </legend>
            <div className="flex flex-wrap gap-2">
              {product.options[0].values.map((value) => {
                const variant = product.variants.find((v) => v.title === value);
                const active = selected.title === value;
                return (
                  <button
                    key={value}
                    type="button"
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

        <div className="border-t border-[var(--lk-line)] pt-5">
          {selected.availableForSale ? (
            <StripeCheckoutButton label={LOUPKIDS_CTA.product} />
          ) : (
            <button type="button" disabled className="lk-btn lk-btn-lg w-full disabled:opacity-60">
              Sold out
            </button>
          )}
          <ul className="mt-4 space-y-1.5 text-sm leading-snug text-[var(--lk-muted)]">
            <li>Rechargeable and replaceable battery</li>
            <li>Customizable back plates</li>
            <li>Loup-to-Loup always free · parent-to-kid Loup free</li>
            <li>Plus from $10/mo for external numbers · cancel anytime</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
