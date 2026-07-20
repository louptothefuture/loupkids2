import type { Metadata } from "next";
import { LoupkidsHome } from "@/components/loupkids/LoupkidsHome";
import { getFeaturedTestimonials, getMarketingHomepage } from "@/lib/content/cms";
import { SITE } from "@/lib/site";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Loup | Phones for the Anti-Screen Age",
  description: SITE.description,
  alternates: { canonical: SITE.url },
};

export default async function HomePage() {
  const [content, testimonials] = await Promise.all([
    getMarketingHomepage(),
    getFeaturedTestimonials(),
  ]);

  return <LoupkidsHome content={content} testimonials={testimonials} />;
}
