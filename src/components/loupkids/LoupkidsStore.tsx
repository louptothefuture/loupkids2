import Link from "next/link";
import { LOUPKIDS_CTA } from "@/lib/content/loupkids-conversion";
import { LOUPKIDS_STORE, LOUPKIDS_STORE_PRODUCTS } from "@/lib/content/loupkids-site";
import { FadeIn } from "./FadeIn";
import { LoupkidsImage } from "./LoupkidsImage";
import { LoupkidsGuaranteeBadge } from "./conversion";

function formatPrice(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

const STORE_PRODUCTS = LOUPKIDS_STORE_PRODUCTS.filter((p) => p.price > 1);

export function LoupkidsStore() {
  return (
    <div>
      <section className="lk-section-white lk-section-header border-b border-[var(--lk-line)]">
        <FadeIn className="lk-container-narrow text-center">
          <h1 className="lk-display lk-h2">{LOUPKIDS_STORE.headline}</h1>
          <p className="lk-lead lk-prose-muted mx-auto mt-4 max-w-xl">{LOUPKIDS_STORE.subheadline}</p>
        </FadeIn>
      </section>

      <section className="lk-section-white lk-section-content">
        <div className="lk-container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {STORE_PRODUCTS.map((product, i) => (
              <FadeIn key={product.title} delay={i * 0.04}>
                <article className="lk-product-tile group flex h-full flex-col">
                  <Link href={product.href} className="lk-image-hover relative block aspect-square overflow-hidden bg-neutral-50">
                    <LoupkidsImage
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-contain p-6"
                    />
                    {product.compareAt ? (
                      <span className="lk-label absolute left-3 top-3 bg-[var(--lk-ink)] px-2 py-1 text-white">
                        Sale
                      </span>
                    ) : null}
                  </Link>
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="lk-display text-lg leading-snug">
                      <Link href={product.href} className="hover:opacity-80">
                        {product.title}
                      </Link>
                    </h2>
                    <div className="mt-3 flex flex-wrap items-baseline gap-2">
                      <span className="font-medium">{formatPrice(product.price)}</span>
                      {product.compareAt ? (
                        <span className="text-sm text-[var(--lk-muted)] line-through">
                          {formatPrice(product.compareAt)}
                        </span>
                      ) : null}
                    </div>
                    {product.note ? <p className="mt-2 text-sm text-[var(--lk-muted)]">{product.note}</p> : null}
                    <Link href={product.href} className="lk-btn mt-auto inline-flex w-full justify-center pt-5">
                      {LOUPKIDS_CTA.primaryShort}
                    </Link>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>

          <div className="mt-12 border-t border-[var(--lk-line)] pt-8 text-center">
            <LoupkidsGuaranteeBadge className="mb-4" />
            <p className="text-sm text-[var(--lk-muted)]">
              Questions before you buy?{" "}
              <Link href="/faq" className="underline underline-offset-4 hover:text-[var(--lk-ink)]">
                Read the FAQ
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
