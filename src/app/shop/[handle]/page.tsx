import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/shopify";
import { getSpecs, getTestimonials } from "@/lib/content";
import { ProductView } from "@/components/product/ProductView";
import { ProductJsonLd } from "@/components/seo/JsonLd";
import { LOUPKIDS_COMPARISON } from "@/lib/content/loupkids-site";
import { SITE } from "@/lib/site";

export const revalidate = 300;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return {};
  return {
    title: product.seo.title ?? product.title,
    description: product.seo.description ?? product.description,
    alternates: { canonical: `${SITE.url}/shop/${product.handle}` },
    openGraph: {
      images: product.images[0] ? [{ url: product.images[0].url }] : [],
    },
  };
}

const COMPARISON = LOUPKIDS_COMPARISON;

function Section({
  eyebrow,
  title,
  children,
  id,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="lk-section border-t border-[var(--lk-line)]">
      <div className="lk-container">
        <p className="lk-label mb-3">{eyebrow}</p>
        <h2 className="lk-display text-2xl sm:text-3xl">{title}</h2>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();

  const [specs, testimonials] = await Promise.all([getSpecs(), getTestimonials()]);
  const isDevice = handle === "loup";

  const reviews = testimonials.map((t) => ({
    author: t.attribution.split(",")[0],
    rating: t.rating,
    body: t.quote,
  }));
  const avgRating = reviews.reduce((s, r) => s + r.rating, 0) / Math.max(reviews.length, 1);

  const specGroups = [...new Set(specs.map((s) => s.group))];

  return (
    <>
      <ProductJsonLd
        product={product}
        reviews={
          isDevice
            ? { rating: Math.round(avgRating * 10) / 10, count: reviews.length, items: reviews }
            : undefined
        }
      />

      <section className="lk-section border-b border-[var(--lk-line)]">
        <div className="lk-container">
          <ProductView product={product} />
        </div>
      </section>

      {isDevice && (
        <>
          <Section eyebrow="Hardware detail" title="Built like gear, not like a toy">
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  src: "/images/product/loup-ports.jpg",
                  title: "USB-C + headphone jack",
                  body: "Charges in 70 minutes, runs 5 days. Yes, a real headphone jack — car rides are long.",
                },
                {
                  src: "/images/product/loup-back-plate.jpg",
                  title: "Scroll dial + talk bar",
                  body: "Every control is physical, with detents you can feel. Operable inside a pocket, no looking.",
                },
                {
                  src: "/images/plates/friends.png",
                  title: "Swappable back plates",
                  body: "The anodized back pops off without tools. Patterns, teams, or a plate printed with your own photo.",
                },
              ].map((card) => (
                <figure key={card.title} className="lk-image-hover border border-[var(--lk-line)]">
                  <div className="relative aspect-square overflow-hidden bg-neutral-50">
                    <Image
                      src={card.src}
                      alt={card.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="p-5">
                    <h3 className="lk-display text-lg">{card.title}</h3>
                    <p className="mt-2 text-sm text-[var(--lk-muted)]">{card.body}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </Section>

          <Section eyebrow="The honest comparison" title="Loup vs. the other options">
            <div className="overflow-x-auto border border-[var(--lk-line)]">
              <table className="w-full min-w-[720px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[var(--lk-line)] bg-neutral-50 text-left">
                    <th className="p-4" />
                    {COMPARISON.columns.map((col, i) => (
                      <th key={col} className={`p-4 font-medium ${i === 0 ? "text-[var(--lk-ink)]" : "text-[var(--lk-muted)]"}`}>
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.rows.map((row) => (
                    <tr key={row.label} className="border-b border-[var(--lk-line)] last:border-0">
                      <th className="p-4 text-left align-top text-xs font-medium uppercase text-[var(--lk-muted)]">
                        {row.label}
                      </th>
                      {row.values.map((value, i) => (
                        <td
                          key={i}
                          className={`p-4 align-top ${i === 0 ? "bg-neutral-50/80 font-medium" : "text-[var(--lk-muted)]"}`}
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section eyebrow="Tech specs" title="The fine print" id="specs">
            <div className="grid gap-8 md:grid-cols-2">
              {specGroups.map((group) => (
                <div key={group} className="border border-[var(--lk-line)] p-6">
                  <h3 className="lk-display text-lg">{group}</h3>
                  <dl className="mt-4 space-y-3">
                    {specs
                      .filter((s) => s.group === group)
                      .map((s) => (
                        <div
                          key={s.label}
                          className="flex justify-between gap-6 border-b border-[var(--lk-line)] pb-2 text-sm last:border-0"
                        >
                          <dt className="text-[var(--lk-muted)]">{s.label}</dt>
                          <dd className="text-right font-medium">{s.value}</dd>
                        </div>
                      ))}
                  </dl>
                </div>
              ))}
            </div>
          </Section>

          <Section
            eyebrow="Reviews"
            title={`${avgRating.toFixed(1)} ★ from ${reviews.length} families`}
            id="reviews"
          >
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <figure key={t.attribution} className="border border-[var(--lk-line)] p-6">
                  <div className="text-[var(--lk-muted)]" aria-label={`${t.rating} of 5 stars`}>
                    {"★".repeat(t.rating)}
                  </div>
                  <blockquote className="mt-3 text-sm leading-relaxed">"{t.quote}"</blockquote>
                  <figcaption className="lk-label mt-4">{t.attribution}</figcaption>
                </figure>
              ))}
            </div>
          </Section>
        </>
      )}
    </>
  );
}
