"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/lib/shopify/types";
import { trackViewItem } from "@/lib/analytics";
import {
  LOUPKIDS_CTA,
  LOUPKIDS_IN_THE_BOX,
  LOUPKIDS_OFFER_CARD,
  LOUPKIDS_PRICE,
} from "@/lib/content/loupkids-conversion";
import { useWaitlist } from "@/components/loupkids/waitlist/WaitlistProvider";

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
  const multiVariant = Boolean(optionName && product.options[0].values.length > 1);
  const { openWaitlist } = useWaitlist();

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
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-[var(--lk-cream)] shadow-[var(--lk-card-shadow)]">
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
              className={`relative aspect-square cursor-pointer overflow-hidden border bg-[var(--lk-cream)] transition-opacity hover:opacity-80 ${
                i === activeImage ? "border-[var(--lk-ink)]" : "border-[var(--lk-line)]"
              }`}
            >
              <Image src={img.url} alt="" fill sizes="80px" className="object-contain p-2.5" />
            </button>
          ))}
        </div>
      </div>

      {/* Buy box — matches homepage offer card hierarchy */}
      <div className="flex flex-col gap-5 lg:sticky lg:top-24 lg:max-w-md lg:justify-self-end xl:max-w-lg">
        <div>
          <h1 className="lk-display text-3xl sm:text-4xl">{product.title}</h1>
          <p className="mt-3 text-sm font-medium uppercase tracking-[0.06em] text-[var(--lk-ink)]">
            {LOUPKIDS_OFFER_CARD.label}
          </p>
          <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-2xl font-medium tracking-tight sm:text-3xl">
              {formatPrice(selected.price.amount, selected.price.currencyCode)}
            </span>
            <span className="text-base text-[var(--lk-muted)] line-through">
              {selected.compareAtPrice
                ? formatPrice(selected.compareAtPrice.amount, selected.compareAtPrice.currencyCode)
                : LOUPKIDS_PRICE.compareFormatted}
            </span>
            <span className="text-sm font-medium text-[var(--lk-ink)]">
              {LOUPKIDS_OFFER_CARD.saveNote}
            </span>
          </div>
          <p className="mt-3 text-sm leading-snug text-[var(--lk-ink)]">
            {LOUPKIDS_OFFER_CARD.productLine}
          </p>
        </div>

        <div className="border-t border-[var(--lk-line-soft)]" />

        <ul className="space-y-2 text-sm leading-snug text-[var(--lk-muted)]">
          {LOUPKIDS_OFFER_CARD.callingBullets.map((b) => (
            <li key={b}>✓ {b}</li>
          ))}
        </ul>

        <div className="border-t border-[var(--lk-line-soft)]" />

        {multiVariant && (
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

        <div>
          <button
            type="button"
            onClick={() => openWaitlist("pdp")}
            className="lk-btn lk-btn-lg w-full cursor-pointer"
          >
            {LOUPKIDS_CTA.product}
          </button>
          <div className="mt-4 space-y-1 text-xs leading-relaxed text-[var(--lk-muted)]">
            <p>{LOUPKIDS_CTA.comingSoon} — we&apos;ll email you when founding pricing opens.</p>
            {LOUPKIDS_OFFER_CARD.logistics.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className="mt-5 space-y-0.5 border-t border-[var(--lk-line-soft)] pt-4 text-[0.6875rem] leading-relaxed text-[var(--lk-muted)]">
            {LOUPKIDS_OFFER_CARD.disclaimer.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>

        <details className="border-t border-[var(--lk-line)] pt-4">
          <summary className="cursor-pointer text-sm font-medium text-[var(--lk-ink)]">In the box</summary>
          <ul className="mt-3 space-y-1.5 text-sm leading-snug text-[var(--lk-muted)]">
            {LOUPKIDS_IN_THE_BOX.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </details>
      </div>
    </div>
  );
}
