import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/shopify";
import { LandingNav } from "@/components/landing/LandingNav";
import { TrustMarquee } from "@/components/landing/TrustMarquee";
import { PopHeadline, PopLabel, PopPrice } from "@/components/typography/PopType";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shop — LOUP Devices & Custom Plates",
  description: "Buy LOUP — $149. Anodized colorways, custom plates, free shipping.",
  alternates: { canonical: `${SITE.url}/shop` },
};

export const revalidate = 300;

const BLOCKS = ["bg-block-fuchsia", "bg-block-cobalt", "bg-block-coral", "bg-block-sun"];

function formatPrice(amount: string, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(parseFloat(amount));
}

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="overflow-x-hidden">
      <LandingNav />

      {/* Hero strip */}
      <section className="bg-block-cobalt px-4 py-16 text-center text-white sm:px-6 sm:py-20">
        <PopLabel className="mb-3 block">The shop</PopLabel>
        <PopHeadline as="h1" size="hero">
          Get
          <br />
          LOUP
        </PopHeadline>
        <p className="mx-auto mt-6 max-w-md text-lg font-semibold text-white/90">
          One phone. Snap-on plates. Free shipping · 30-day returns · 2-year warranty.
        </p>
      </section>

      {/* Products */}
      <section className="bg-block-sun px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-2">
          {products.map((product, i) => {
            const block = BLOCKS[i % BLOCKS.length];
            const lightText = block !== "bg-block-sun";
            return (
              <Link
                key={product.id}
                href={`/shop/${product.handle}`}
                className={`pop-card group block overflow-hidden transition-transform hover:-translate-y-2 hover:rotate-[-1deg] ${block} ${lightText ? "text-white" : "text-ink"}`}
              >
                <div className="relative aspect-square bg-white/10">
                  {product.images[0] && (
                    <Image
                      src={product.images[0].url}
                      alt={product.images[0].altText ?? product.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-contain p-10 transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="border-t-3 border-ink bg-white p-6 text-ink">
                  <h2 className="display text-left text-2xl">{product.title}</h2>
                  <p className="mt-2 line-clamp-2 text-sm font-medium text-ink/75">
                    {product.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <PopPrice>
                      {formatPrice(
                        product.priceRange.minVariantPrice.amount,
                        product.priceRange.minVariantPrice.currencyCode,
                      )}
                    </PopPrice>
                    <span className="text-sm font-black uppercase">Shop →</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <TrustMarquee />
    </div>
  );
}
