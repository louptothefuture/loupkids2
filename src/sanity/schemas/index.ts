import { post } from "./post";
import { author } from "./author";
import { category } from "./category";
import { faqItem } from "./faqItem";
import { testimonial } from "./testimonial";
import { pressLogo } from "./pressLogo";
import { productSpec } from "./productSpec";
import { homepage } from "./homepage";
import { siteSettings } from "./siteSettings";
import { aboutPage } from "./aboutPage";
import { setupGuide } from "./setupGuide";
import { seoFields } from "./objects/seoFields";
import { accordionItem } from "./objects/accordionItem";
import { setupStep } from "./objects/setupStep";

export const schemaTypes = [
  seoFields,
  accordionItem,
  setupStep,
  post,
  author,
  category,
  faqItem,
  testimonial,
  pressLogo,
  productSpec,
  homepage,
  siteSettings,
  aboutPage,
  setupGuide,
];
