"use client";

import Link from "next/link";
import { useState } from "react";
import {
  LOUPKIDS_STORE,
  LOUPKIDS_STORE_PRODUCTS,
} from "@/lib/content/loupkids-site";
import { FadeIn } from "./FadeIn";
import { LoupkidsImage } from "./LoupkidsImage";

function formatPrice(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

export function LoupkidsStore() {
  const [filter, setFilter] = useState("");

  const products = LOUPKIDS_STORE_PRODUCTS.filter((p) =>
    p.title.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div>
      <section className="lk-section border-b border-[var(--lk-line)] text-center">
        <FadeIn className="lk-container">
          <h1 className="lk-display text-[clamp(2rem,5vw,3.5rem)]">{LOUPKIDS_STORE.headline}</h1>
          <p className="lk-display mt-2 text-[clamp(1.5rem,3vw,2.5rem)] text-[var(--lk-muted)]">
            {LOUPKIDS_STORE.subheadline}
          </p>
          <p className="lk-label mt-8">{LOUPKIDS_STORE.sectionLabel}</p>
        </FadeIn>
      </section>

      <section className="lk-section">
        <div className="lk-container">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <input
              type="search"
              placeholder="Search products"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full max-w-xs border border-[var(--lk-line)] px-4 py-2 text-sm focus:border-[var(--lk-ink)] focus:outline-none"
            />
            {filter && (
              <button type="button" onClick={() => setFilter("")} className="lk-label cursor-pointer hover:text-[var(--lk-ink)]">
                Clear
              </button>
            )}
          </div>

          {products.length === 0 ? (
            <p className="text-center text-[var(--lk-muted)]">No results match your search. Try removing a few filters.</p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, i) => (
                <FadeIn key={product.title} delay={i * 0.04}>
                  <article className="group flex h-full flex-col border border-[var(--lk-line)]">
                    <Link href={product.href} className="lk-image-hover relative aspect-square block overflow-hidden bg-neutral-50">
                      <LoupkidsImage
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-contain p-6 transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      {product.compareAt && (
                        <span className="lk-label absolute left-3 top-3 bg-[var(--lk-ink)] px-2 py-1 text-white">
                          Sale
                        </span>
                      )}
                    </Link>
                    <div className="flex flex-1 flex-col p-5">
                      <h2 className="lk-display text-lg leading-snug">
                        <Link href={product.href} className="hover:opacity-80">
                          {product.title}
                        </Link>
                      </h2>
                      <div className="mt-3 flex flex-wrap items-baseline gap-2">
                        <span className="font-medium">{formatPrice(product.price)}</span>
                        {product.compareAt && (
                          <span className="text-sm text-[var(--lk-muted)] line-through">
                            {formatPrice(product.compareAt)}
                          </span>
                        )}
                      </div>
                      {product.note && (
                        <p className="mt-2 text-sm text-[var(--lk-muted)]">{product.note}</p>
                      )}
                      {product.sizes.length > 0 && (
                        <p className="lk-label mt-3">{product.sizes.join(" · ")}</p>
                      )}
                      <Link href={product.href} className="lk-btn mt-auto inline-flex w-full justify-center pt-6">
                        Add to cart
                      </Link>
                    </div>
                  </article>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-[var(--lk-line)] px-4 py-12 text-center sm:px-8">
        <FadeIn>
          <h2 className="lk-display text-2xl">{LOUPKIDS_STORE.footerCta}</h2>
          <Link href="/faq" className="lk-btn lk-btn-outline mt-6 inline-flex">
            Read the FAQ
          </Link>
        </FadeIn>
      </section>
    </div>
  );
}
