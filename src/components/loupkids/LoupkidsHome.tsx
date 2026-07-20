import type { MarketingHomepage } from "@/lib/content/cms";
import {
  LOUPKIDS_CTA,
  LOUPKIDS_HERO_COPY,
  LOUPKIDS_PULL_QUOTE,
} from "@/lib/content/loupkids-conversion";
import { LOUPKIDS_ACCORDION, LOUPKIDS_FOOTER, LOUPKIDS_IMAGES, LOUPKIDS_PHONE } from "@/lib/content/loupkids-site";
import type { Testimonial } from "@/lib/content/types";
import { LoupkidsHomeClient } from "./LoupkidsHomeClient";

export type LoupkidsHomeProps = {
  content: MarketingHomepage;
  testimonials: Testimonial[];
};

export const DEFAULT_HOME_CONTENT: MarketingHomepage = {
  heroEyebrow: LOUPKIDS_HERO_COPY.eyebrow,
  heroHeadline: LOUPKIDS_HERO_COPY.headline,
  heroSubline: LOUPKIDS_HERO_COPY.subline,
  heroPriceLine: LOUPKIDS_HERO_COPY.priceLine,
  heroCtaLabel: LOUPKIDS_CTA.hero,
  heroImage: LOUPKIDS_IMAGES.hero,
  heroImageAlt: "Hand holding Loup — hi.",
  pullQuote: LOUPKIDS_PULL_QUOTE,
  phoneSectionTitle: LOUPKIDS_PHONE.title,
  phoneSectionSubtitle: LOUPKIDS_PHONE.subtitle,
  accordionItems: LOUPKIDS_ACCORDION.map((item) => ({ title: item.title, body: item.body })),
  finalCtaHeadline: "Ready when you are.",
  finalCtaBody: "The phone before their first smartphone — 30-day guarantee, ships October 2026.",
  finalCtaLabel: LOUPKIDS_CTA.primary,
  footerBody: LOUPKIDS_FOOTER.body,
  testimonialHeadline: "What beta testers are saying",
};

export function LoupkidsHome({ content, testimonials }: LoupkidsHomeProps) {
  return <LoupkidsHomeClient content={content} testimonials={testimonials} />;
}
