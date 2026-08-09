import type { MarketingHomepage } from "@/lib/content/cms";
import {
  LOUPKIDS_CTA,
  LOUPKIDS_HERO_COPY,
  LOUPKIDS_PULL_QUOTE,
  LOUPKIDS_FINAL_CTA,
} from "@/lib/content/loupkids-conversion";
import { LOUPKIDS_ACCORDION, LOUPKIDS_FOOTER, LOUPKIDS_IMAGES, LOUPKIDS_PHONE } from "@/lib/content/loupkids-site";
import { LoupkidsHomeClient } from "./LoupkidsHomeClient";

export type LoupkidsHomeProps = {
  content: MarketingHomepage;
  /** Brighter color/motion skin — used by /wrapped concept route */
  fun?: boolean;
};

export const DEFAULT_HOME_CONTENT: MarketingHomepage = {
  heroEyebrow: LOUPKIDS_HERO_COPY.eyebrow,
  heroHeadline: LOUPKIDS_HERO_COPY.headline,
  heroSubline: LOUPKIDS_HERO_COPY.subline,
  heroPriceLine: LOUPKIDS_HERO_COPY.priceLine,
  heroCtaLabel: LOUPKIDS_CTA.primary,
  heroImage: LOUPKIDS_IMAGES.hero,
  heroImageAlt: "Hand holding Loup — hi.",
  pullQuote: LOUPKIDS_PULL_QUOTE,
  phoneSectionTitle: LOUPKIDS_PHONE.title,
  phoneSectionSubtitle: LOUPKIDS_PHONE.subtitle,
  accordionItems: LOUPKIDS_ACCORDION.map((item) => ({ title: item.title, body: item.body })),
  finalCtaHeadline: LOUPKIDS_FINAL_CTA.headline,
  finalCtaBody: LOUPKIDS_FINAL_CTA.body,
  finalCtaLabel: LOUPKIDS_CTA.primary,
  footerBody: LOUPKIDS_FOOTER.body,
  testimonialHeadline: "",
};

export function LoupkidsHome({ content, fun }: LoupkidsHomeProps) {
  const page = <LoupkidsHomeClient content={content} />;
  if (!fun) return page;
  return <div className="lk-fun-page">{page}</div>;
}
