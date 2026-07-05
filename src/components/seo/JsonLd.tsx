import type { FAQPage, Organization, Product as ProductSchema, WithContext } from "schema-dts";
import { SITE } from "@/lib/site";
import type { Product } from "@/lib/shopify/types";

function JsonLdScript({ data }: { data: WithContext<Organization | ProductSchema | FAQPage> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  const data: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/images/product/loup-silver-front.png`,
    description: SITE.description,
    email: SITE.email,
    sameAs: [SITE.social.instagram, SITE.social.tiktok, SITE.social.youtube],
  };
  return <JsonLdScript data={data} />;
}

export function ProductJsonLd({
  product,
  reviews,
}: {
  product: Product;
  reviews?: { rating: number; count: number; items: { author: string; rating: number; body: string }[] };
}) {
  const data: WithContext<ProductSchema> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images.map((i) => `${SITE.url}${i.url}`),
    brand: { "@type": "Brand", name: SITE.name },
    url: `${SITE.url}/shop/${product.handle}`,
    sku: product.handle,
    offers: product.variants.map((v) => ({
      "@type": "Offer" as const,
      name: v.title,
      price: v.price.amount,
      priceCurrency: v.price.currencyCode,
      availability: v.availableForSale
        ? ("https://schema.org/InStock" as const)
        : ("https://schema.org/OutOfStock" as const),
      url: `${SITE.url}/shop/${product.handle}`,
      shippingDetails: {
        "@type": "OfferShippingDetails" as const,
        shippingRate: {
          "@type": "MonetaryAmount" as const,
          value: 0,
          currency: "USD",
        },
        shippingDestination: {
          "@type": "DefinedRegion" as const,
          addressCountry: "US",
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy" as const,
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow" as const,
        merchantReturnDays: 30,
        returnMethod: "https://schema.org/ReturnByMail" as const,
        returnFees: "https://schema.org/FreeReturn" as const,
      },
    })),
    ...(reviews && reviews.count > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating" as const,
            ratingValue: reviews.rating,
            reviewCount: reviews.count,
          },
          review: reviews.items.map((r) => ({
            "@type": "Review" as const,
            author: { "@type": "Person" as const, name: r.author },
            reviewRating: { "@type": "Rating" as const, ratingValue: r.rating },
            reviewBody: r.body,
          })),
        }
      : {}),
  };
  return <JsonLdScript data={data} />;
}

export function FaqJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const data: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question" as const,
      name: f.question,
      acceptedAnswer: { "@type": "Answer" as const, text: f.answer },
    })),
  };
  return <JsonLdScript data={data} />;
}
