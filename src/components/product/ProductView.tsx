"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/lib/shopify/types";
import { trackViewItem } from "@/lib/analytics";
import {
  connectivityFromVariantTitle,
  LOUPKIDS_CONNECTIVITY,
  LOUPKIDS_IN_THE_BOX,
  LOUPKIDS_OFFER_CARD,
} from "@/lib/content/loupkids-conversion";
import { StripeCheckoutButton } from "@/components/loupkids/conversion/StripeCheckoutButton";

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
  const connectivity = LOUPKIDS_CONNECTIVITY[connectivityFromVariantTitle(selected.title)];

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
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={shown?.url}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0"
            >
              {shown && (
                <Image
                  src={shown.url}
                  alt={shown.altText ?? product.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain object-center"
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
              <Image src={img.url} alt="" fill sizes="80px" className="object-contain object-center" />
            </button>
          ))}
        </div>
      </div>

      {/* Buy box */}
      <div className="flex flex-col gap-5 lg:sticky lg:top-24 lg:max-w-md lg:justify-self-end xl:max-w-lg">
        <div>
          <h1 className="lk-display text-3xl sm:text-4xl">Loup</h1>
          <p className="mt-2 text-sm leading-snug text-[var(--lk-muted)]">
            {LOUPKIDS_OFFER_CARD.productLine}
          </p>
        </div>

        {/* Model chooser — the whole card is the selector */}
        <fieldset className="grid grid-cols-2 gap-3">
          <legend className="sr-only">Choose model</legend>
          {product.options[0].values.map((value) => {
            const variant = product.variants.find((v) => v.title === value);
            const c = LOUPKIDS_CONNECTIVITY[connectivityFromVariantTitle(value)];
            const active = selected.title === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => selectVariant(value)}
                disabled={!variant?.availableForSale}
                className={`group relative flex flex-col rounded-2xl border-2 p-4 text-left transition-all disabled:cursor-not-allowed disabled:opacity-40 ${
                  active
                    ? "border-[var(--lk-ink)] bg-[var(--lk-ink)] text-white"
                    : "border-[var(--lk-line)] hover:border-[var(--lk-ink)]/40"
                }`}
              >
                <span className={`text-[0.65rem] font-semibold uppercase tracking-[0.1em] ${active ? "text-white/70" : "text-[var(--lk-muted)]"}`}>
                  {active ? "Selected" : "Select"}
                </span>
                <span className={`lk-display mt-1 text-base font-medium leading-tight ${active ? "text-white" : "text-[var(--lk-ink)]"}`}>
                  {c.name}
                </span>
                <span className={`mt-2 lk-display text-2xl ${active ? "text-white" : "text-[var(--lk-ink)]"}`}>
                  ${c.preorder}
                </span>
                <span className={`text-xs ${active ? "text-white/60" : "text-[var(--lk-muted)]"}`}>
                  ${c.launch} at launch
                </span>
                <span className={`mt-3 text-xs leading-snug ${active ? "text-white/75" : "text-[var(--lk-muted)]"}`}>
                  {c.tagline}
                </span>
                {c.monthlyTotal && (
                  <span className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide ${active ? "bg-white/20 text-white" : "bg-[var(--lk-ink)]/8 text-[var(--lk-ink)]"}`}>
                    ${c.monthlyTotal}/mo
                  </span>
                )}
                {!c.monthlyTotal && (
                  <span className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide ${active ? "bg-white/20 text-white" : "bg-[var(--lk-ink)]/8 text-[var(--lk-ink)]"}`}>
                    $10/mo
                  </span>
                )}
              </button>
            );
          })}
        </fieldset>

        {/* What's included for the selected model */}
        <div className="rounded-xl bg-[var(--lk-surface)] p-4 text-sm">
          <p className="font-medium text-[var(--lk-ink)]">{connectivity.coverage}</p>
          <ul className="mt-3 space-y-1.5 text-[var(--lk-muted)]">
            {connectivity.monthlyBreakdown.map((b) => (
              <li key={b} className="flex items-baseline gap-2">
                <span className="shrink-0 text-[var(--lk-ink)]">·</span>
                {b}
              </li>
            ))}
          </ul>
          {connectivity.note && (
            <p className="mt-3 text-xs text-[var(--lk-muted)]">{connectivity.note}</p>
          )}
        </div>

        <div>
          <StripeCheckoutButton
            connectivity={connectivity.id}
            label={connectivity.cta}
            className="lk-btn lk-btn-lg w-full cursor-pointer"
            showGuarantee
          />
          <StripeCheckoutButton
            connectivity={connectivity.id}
            pack="pair"
            label={connectivity.pairLabel}
            className="lk-btn lk-btn-outline lk-btn-lg mt-2 w-full cursor-pointer"
          />
          <div className="mt-4 space-y-1 text-xs leading-relaxed text-[var(--lk-muted)]">
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
