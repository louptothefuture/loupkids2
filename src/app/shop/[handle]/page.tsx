import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/shopify";
import { getSpecs } from "@/lib/content";
import { ProductView } from "@/components/product/ProductView";
import { BreadcrumbJsonLd, ProductJsonLd } from "@/components/seo/JsonLd";
import { LOUPKIDS_TRUST } from "@/lib/content/loupkids-conversion";
import { FALLBACK_TESTIMONIALS } from "@/lib/content/fallback";
import { LoupkidsBuiltLikeGear } from "@/components/loupkids/LoupkidsBuiltLikeGear";
import { LoupkidsCallingPricingSection } from "@/components/loupkids/LoupkidsCallingPricingSection";
import { LoupkidsModelsCompare } from "@/components/loupkids/LoupkidsModelsCompare";
import { LoupkidsCustomizeStoreSection } from "@/components/loupkids/LoupkidsCustomizeStoreSection";
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
  title,
  children,
  id,
}: {
  title: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="lk-section border-t border-[var(--lk-line)]">
      <div className="lk-container">
        <h2 className="lk-display text-2xl sm:text-3xl">{title}</h2>
        <div className="mt-8 sm:mt-10">{children}</div>
      </div>
    </section>
  );
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();

  const specs = await getSpecs();
  const isDevice = handle === "loup";

  const specGroups = [...new Set(specs.map((s) => s.group))];

  const reviewData = isDevice
    ? {
        rating: LOUPKIDS_TRUST.rating,
        count: LOUPKIDS_TRUST.reviewCount,
        items: FALLBACK_TESTIMONIALS.slice(0, 5).map((t) => ({
          author: t.attribution,
          rating: t.rating,
          body: t.quote,
        })),
      }
    : undefined;

  return (
    <>
      <ProductJsonLd product={product} reviews={reviewData} />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", url: SITE.url },
          { name: "Shop", url: `${SITE.url}/shop` },
          { name: product.title, url: `${SITE.url}/shop/${product.handle}` },
        ]}
      />

      <section className="lk-section-header border-b border-[var(--lk-line)]">
        <div className="lk-container">
          <ProductView product={product} />
        </div>
      </section>

      {isDevice && (
        <>
          <LoupkidsModelsCompare />
          <LoupkidsBuiltLikeGear />
          <LoupkidsCallingPricingSection />

          <LoupkidsCustomizeStoreSection />

          <Section title="Loup vs. the other options">
            <div className="overflow-x-auto rounded-2xl bg-[var(--lk-surface)] shadow-[var(--lk-card-shadow)]">
              <table className="w-full min-w-[720px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[var(--lk-line)] bg-[var(--lk-cream)] text-left">
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
                          className={`p-4 align-top ${i === 0 ? "bg-[var(--lk-cream)]/80 font-medium" : "text-[var(--lk-muted)]"}`}
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

          <Section title="The fine print" id="specs">
            <div className="grid gap-8 md:grid-cols-2">
              {specGroups.map((group) => (
                <div key={group} className="lk-card p-6">
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
        </>
      )}
    </>
  );
}
