import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/shopify";
import { getSpecs, getTestimonials } from "@/lib/content";
import { ProductView } from "@/components/product/ProductView";
import { ProductJsonLd } from "@/components/seo/JsonLd";
import { LandingNav } from "@/components/landing/LandingNav";
import { TrustMarquee } from "@/components/landing/TrustMarquee";
import { PopHeadline, PopLabel } from "@/components/typography/PopType";
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

const COMPARISON = {
  columns: ["LOUP", "Smartphone", "Kids smartwatch", "Flip phone"],
  rows: [
    { label: "Screen time", values: ["Zero", "5+ hrs/day avg", "Creeping in (apps, games)", "Low but growing"] },
    { label: "Feeds & algorithms", values: ["None, physically impossible", "The whole product", "Some models", "Browser included"] },
    { label: "Works on Wi-Fi", values: ["Yes — no SIM, no cellular bill", "Yes (cellular)", "Yes (cellular)", "Yes (cellular)"] },
    { label: "Parent-approved contacts only", values: ["Yes, enforced in hardware", "No", "Usually", "No"] },
    { label: "Battery", values: ["5 days", "1 day", "1 day (less if used)", "2–3 days"] },
    { label: "Survives being a kid's", values: ["Built for it, 2-yr warranty", "Add a $60 case & pray", "Mostly", "It's disposable"] },
    { label: "Kid actually thinks it's cool", values: ["That's the whole design brief", "Yes (that's the problem)", "It's fine", "No"] },
    { label: "Price", values: ["$149", "$400–1,200", "$150–400 + plan", "$40–100"] },
  ],
};

function PopSection({
  eyebrow,
  title,
  children,
  bg = "bg-white",
  light = false,
  id,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  bg?: string;
  light?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className={`${bg} px-4 py-16 sm:px-6 sm:py-20`}>
      <div className="mx-auto max-w-6xl">
        <PopLabel className={`mb-3 block ${light ? "text-white/80" : "text-ink/70"}`}>
          {eyebrow}
        </PopLabel>
        <PopHeadline as="h2" size="lg" tone={light ? "light" : "dark"} className="text-left">
          {title}
        </PopHeadline>
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

      <div className="overflow-x-hidden">
        <LandingNav />

        <section className="bg-block-cobalt px-4 py-12 text-white sm:px-6 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <PopLabel className="mb-3 block">Shop</PopLabel>
            <PopHeadline as="h1" size="xl">
              {product.title}
            </PopHeadline>
          </div>
        </section>

        <section className="bg-block-sun px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <ProductView product={product} />
          </div>
        </section>

        <TrustMarquee />

        {isDevice && (
          <>
            <PopSection eyebrow="Hardware detail" title="Built like gear, not like a toy" bg="bg-white">
              <div className="grid gap-6 md:grid-cols-3">
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
                ].map((card, i) => (
                  <figure
                    key={card.title}
                    className={`pop-card h-full overflow-hidden bg-white ${i % 2 === 0 ? "pop-card-tilt-left" : "pop-card-tilt-right"}`}
                  >
                    <div className="relative aspect-square border-b-3 border-ink bg-block-fuchsia/10">
                      <Image
                        src={card.src}
                        alt={card.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="p-6">
                      <h3 className="display text-left text-2xl">{card.title}</h3>
                      <p className="mt-2 text-sm font-semibold text-ink-soft">{card.body}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </PopSection>

            <PopSection
              eyebrow="The honest comparison"
              title="LOUP vs. the other options"
              bg="bg-block-coral text-white"
              light
            >
              <div className="pop-card overflow-x-auto bg-white text-ink">
                <table className="w-full min-w-[720px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b-3 border-ink bg-block-sun text-left">
                      <th className="p-4" />
                      {COMPARISON.columns.map((col, i) => (
                        <th key={col} className={`p-4 text-lg font-black uppercase ${i === 0 ? "text-block-fuchsia" : ""}`}>
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON.rows.map((row) => (
                      <tr key={row.label} className="border-b border-ink/10 last:border-0">
                        <th className="p-4 text-left align-top text-xs font-black uppercase text-ink-soft">
                          {row.label}
                        </th>
                        {row.values.map((value, i) => (
                          <td
                            key={i}
                            className={`p-4 align-top ${i === 0 ? "bg-block-sun/40 font-bold" : "text-ink-soft"}`}
                          >
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </PopSection>

            <PopSection eyebrow="Tech specs" title="The fine print, printed large" bg="bg-white" id="specs">
              <div className="grid gap-6 md:grid-cols-2">
                {specGroups.map((group, gi) => (
                  <div
                    key={group}
                    className={`pop-card bg-white p-6 ${gi % 2 === 0 ? "pop-card-tilt-left" : "pop-card-tilt-right"}`}
                  >
                    <h3 className="display text-left text-2xl">{group}</h3>
                    <dl className="mt-4 space-y-3">
                      {specs
                        .filter((s) => s.group === group)
                        .map((s) => (
                          <div
                            key={s.label}
                            className="flex justify-between gap-6 border-b border-ink/10 pb-2 text-sm last:border-0"
                          >
                            <dt className="font-bold uppercase tracking-wide text-ink-soft">{s.label}</dt>
                            <dd className="text-right font-bold">{s.value}</dd>
                          </div>
                        ))}
                    </dl>
                  </div>
                ))}
              </div>
            </PopSection>

            <PopSection
              eyebrow="Reviews"
              title={`${avgRating.toFixed(1)} ★ from ${reviews.length} families`}
              bg="bg-block-fuchsia text-white"
              light
              id="reviews"
            >
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((t, i) => (
                  <figure
                    key={t.attribution}
                    className={`pop-card bg-white p-6 text-ink ${i % 2 === 0 ? "pop-card-tilt-right" : "pop-card-tilt-left"}`}
                  >
                    <div className="text-block-sun" aria-label={`${t.rating} of 5 stars`}>
                      {"★".repeat(t.rating)}
                    </div>
                    <blockquote className="mt-3 text-sm font-semibold leading-relaxed">“{t.quote}”</blockquote>
                    <figcaption className="mt-4 text-xs font-black uppercase text-ink-soft">{t.attribution}</figcaption>
                  </figure>
                ))}
              </div>
            </PopSection>
          </>
        )}
      </div>
    </>
  );
}
