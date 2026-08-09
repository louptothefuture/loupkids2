import type { Metadata } from "next";
import { LoupkidsHome } from "@/components/loupkids/LoupkidsHome";
import { getFeaturedTestimonials, getMarketingHomepage } from "@/lib/content/cms";
import { SITE } from "@/lib/site";
import "@/components/wrapped/wrapped.css";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Wrapped — Fun visual concept",
  description:
    "Same Loup homepage structure with a brighter color and motion skin. Not the production homepage.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE.url}/wrapped` },
};

export default async function WrappedPage() {
  const [content, testimonials] = await Promise.all([
    getMarketingHomepage(),
    getFeaturedTestimonials(),
  ]);

  return <LoupkidsHome content={content} testimonials={testimonials} fun />;
}
