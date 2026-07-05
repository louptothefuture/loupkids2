"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/lib/shopify/types";
import { useCart } from "@/components/cart/CartProvider";
import { PopLabel, PopPrice } from "@/components/typography/PopType";
import { trackViewItem } from "@/lib/analytics";

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
        <div className="pop-card relative aspect-[4/5] overflow-hidden bg-white sm:aspect-[5/4]">
          <AnimatePresence mode="wait">
            <motion.div
              key={shown?.url}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.25 }}
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
              className={`relative h-20 w-16 shrink-0 cursor-pointer overflow-hidden rounded-xl border-3 bg-white transition-transform hover:-translate-y-1 ${
                i === activeImage ? "border-ink shadow-[3px_3px_0_#0a0a0a]" : "border-ink/20"
              }`}
            >
              <Image src={img.url} alt="" fill sizes="64px" className="object-contain p-1" />
            </button>
          ))}
        </div>
      </div>

      <div className="lg:pt-4">
        <PopLabel className="mb-3 block text-ink/70">The device</PopLabel>
        <h1 className="display text-left text-4xl sm:text-5xl">{product.title}</h1>
        <p className="mt-4 text-base font-semibold leading-relaxed text-ink/75">{product.description}</p>

        <div className="mt-6">
          <PopPrice>{formatPrice(selected.price.amount, selected.price.currencyCode)}</PopPrice>
          {selected.compareAtPrice && (
            <span className="ml-3 text-xl font-bold text-ink/40 line-through">
              {formatPrice(selected.compareAtPrice.amount, selected.compareAtPrice.currencyCode)}
            </span>
          )}
        </div>

        {optionName && (
          <fieldset className="mt-8">
            <legend className="mb-3 text-sm font-black uppercase tracking-wide text-ink">
              {optionName}: <span className="text-block-fuchsia">{selected.title}</span>
            </legend>
            <div className="flex flex-wrap gap-3">
              {product.options[0].values.map((value) => {
                const variant = product.variants.find((v) => v.title === value);
                const active = selected.title === value;
                return (
                  <button
                    key={value}
                    onClick={() => selectVariant(value)}
                    disabled={!variant?.availableForSale}
                    className={`cursor-pointer rounded-full border-3 px-5 py-2 text-sm font-black uppercase transition-all disabled:cursor-not-allowed disabled:opacity-40 ${
                      active
                        ? "border-ink bg-ink text-white shadow-[3px_3px_0_#1e4bff]"
                        : "border-ink/25 bg-white hover:border-ink"
                    }`}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        <motion.button
          whileHover={{ scale: 1.02, rotate: -0.5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() =>
            addItem(selected.id, {
              title: product.title,
              variantTitle: selected.title,
              price: parseFloat(selected.price.amount),
            })
          }
          disabled={pending || !selected.availableForSale}
          className="mt-8 w-full cursor-pointer rounded-full border-3 border-ink bg-block-fuchsia px-8 py-5 text-xl font-black uppercase text-white shadow-[6px_6px_0_#0a0a0a] disabled:opacity-60"
        >
          {selected.availableForSale ? (pending ? "Adding…" : "Add to bag") : "Sold out"}
        </motion.button>

        <ul className="mt-6 space-y-2 text-sm font-semibold text-ink/75">
          <li>✓ Free US shipping, arrives in 3–5 days</li>
          <li>✓ 30-day returns, no questions</li>
          <li>✓ 2-year kid-proof warranty (drops included)</li>
          <li>✓ Free LOUP-to-LOUP calls forever · real numbers $10/mo, cancel anytime</li>
        </ul>
      </div>
    </div>
  );
}
