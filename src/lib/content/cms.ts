import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import {
  LOUPKIDS_CTA,
  LOUPKIDS_FINAL_CTA,
  LOUPKIDS_GUARANTEE,
  LOUPKIDS_HERO_COPY,
  LOUPKIDS_PULL_QUOTE,
} from "./loupkids-conversion";
import {
  LOUPKIDS_ABOUT,
  LOUPKIDS_ACCORDION,
  LOUPKIDS_FAQ,
  LOUPKIDS_FOOTER,
  LOUPKIDS_IMAGES,
  LOUPKIDS_PHONE,
  type LoupkidsFaqAnswer,
} from "./loupkids-site";
import { LOUPKIDS_SETUP_STEPS } from "./loupkids-support";
import { FALLBACK_TESTIMONIALS } from "./fallback";
import type { Testimonial } from "./types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const readToken = process.env.SANITY_API_READ_TOKEN;

export const isSanityConfigured = Boolean(projectId);

const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2025-01-01",
      useCdn: !readToken,
      token: readToken,
    })
  : null;

const builder = client ? imageUrlBuilder(client) : null;

const fetchOpts = (tag: string) => ({ next: { revalidate: 300, tags: [tag] } });

/* eslint-disable @typescript-eslint/no-explicit-any */
function urlFor(source: any): string | null {
  if (!builder || !source) return null;
  return builder.image(source).width(2400).auto("format").url();
}

export type MarketingHomepage = {
  heroEyebrow: string;
  heroHeadline: string;
  heroSubline: string;
  heroPriceLine: string;
  heroCtaLabel: string;
  heroImage: string;
  heroImageAlt: string;
  pullQuote: string;
  phoneSectionTitle: string;
  phoneSectionSubtitle: string;
  accordionItems: { title: string; body: string }[];
  finalCtaHeadline: string;
  finalCtaBody: string;
  finalCtaLabel: string;
  footerBody: string;
  testimonialHeadline: string;
};

export type AboutPageContent = {
  title: string;
  introParagraphs: string[];
  timeline: {
    label: string;
    title: string;
    paragraphs: string[];
    image?: string;
    imageAlt?: string;
    imageCaption?: string;
  }[];
  teamBlocks: { title: string; body: string }[];
  manufacturingTitle: string;
  manufacturingBody: string;
  closing: string;
};

export type SetupGuideContent = {
  eyebrow: string;
  title: string;
  description: string;
  steps: {
    step: string;
    section: string;
    title: string;
    body: string;
    image?: string;
    imageAlt?: string;
  }[];
  heroImage: string;
  heroImageAlt: string;
  heroCaption: string;
};

const DEFAULT_HOMEPAGE: MarketingHomepage = {
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
  testimonialHeadline: "What parents are saying",
};

const DEFAULT_ABOUT: AboutPageContent = {
  title: LOUPKIDS_ABOUT.title,
  introParagraphs: LOUPKIDS_ABOUT.paragraphs.slice(0, 2),
  timeline: [
    {
      label: "01 / The Spark",
      title: "The calls started as pretend.",
      paragraphs: LOUPKIDS_ABOUT.paragraphs.slice(2, 5),
      image: "/images/about/01-old-phone-walkie.jpg",
      imageAlt: "Old landline phone next to kids’ walkie-talkies",
      imageCaption: "Old phone & walkie-talkies",
    },
    {
      label: "02 / Looking for balance",
      title: "We wanted connection — carefully.",
      paragraphs: LOUPKIDS_ABOUT.paragraphs.slice(5, 7),
      image: "/images/about/02-girl-with-phone.jpg",
      imageAlt: "Girl pretending to call on an old landline phone",
      imageCaption: "Girl with phone",
    },
    {
      label: "03 / A gentler first step",
      title: "Talk first. Feeds can wait.",
      paragraphs: LOUPKIDS_ABOUT.paragraphs.slice(7, 10),
      image: "/images/about/03-concept-sketch.png",
      imageAlt: "Early Loup concept sketch with dial and e-paper notes",
      imageCaption: "Sketch",
    },
    {
      label: "04 / The name found us",
      title: "Wolves howl to stay close.",
      paragraphs: [LOUPKIDS_ABOUT.paragraphs[11] ?? ""],
    },
  ],
  teamBlocks: [
    {
      title: "A parent who wanted another option",
      body: "The question was simple: how do you give a kid more independence while keeping connection feeling safe?",
    },
    {
      title: "A daughter who named the wolf",
      body: "She turned Loop into Loup—and gave the product its reason for being: staying close to the pack.",
    },
  ],
  manufacturingTitle: "From idea to prototype.",
  manufacturingBody: LOUPKIDS_ABOUT.paragraphs[10] ?? "",
  closing: LOUPKIDS_ABOUT.paragraphs[12] ?? "",
};

const DEFAULT_SETUP: SetupGuideContent = {
  eyebrow: "Support / setup guide",
  title: "Easy as 1, 2, 3",
  description:
    "Pair Loup, add contacts, and let kids call their people — box to first call in about ten minutes.",
  steps: LOUPKIDS_SETUP_STEPS.map((s) => ({
    step: s.step,
    section: s.section,
    title: s.title,
    body: s.body,
  })),
  heroImage: LOUPKIDS_IMAGES.heroKitchen,
  heroImageAlt: "Kid talking on Loup at the kitchen counter while a parent cooks",
  heroCaption: "First call from the kitchen — setup takes about ten minutes.",
};

function mapFaqAnswer(raw: any): LoupkidsFaqAnswer {
  if (raw.answerParagraphs?.length) {
    return {
      paragraphs: raw.answerParagraphs,
      bullets: raw.answerBullets?.length ? raw.answerBullets : undefined,
      paragraphs2: raw.answerParagraphs2?.length ? raw.answerParagraphs2 : undefined,
    };
  }
  return raw.answer ?? "";
}

export async function getMarketingHomepage(): Promise<MarketingHomepage> {
  if (!client) return DEFAULT_HOMEPAGE;

  const doc = await client.fetch(
    `*[_type == "homepage"][0] {
      heroEyebrow, heroHeadline, heroSubline, heroPriceLine, heroCtaLabel,
      heroImage, heroImageAlt, pullQuote, phoneSectionTitle, phoneSectionSubtitle,
      accordionItems[]{title, body},
      finalCtaHeadline, finalCtaBody, finalCtaLabel, footerBody, testimonialHeadline
    }`,
    {},
    fetchOpts("homepage"),
  );

  if (!doc) return DEFAULT_HOMEPAGE;

  return {
    ...DEFAULT_HOMEPAGE,
    ...doc,
    heroImage: urlFor(doc.heroImage) ?? DEFAULT_HOMEPAGE.heroImage,
    accordionItems: doc.accordionItems?.length ? doc.accordionItems : DEFAULT_HOMEPAGE.accordionItems,
  };
}

export async function getAboutPageContent(): Promise<AboutPageContent> {
  if (!client) return DEFAULT_ABOUT;

  const doc = await client.fetch(
    `*[_type == "aboutPage"][0] {
      title, introParagraphs, timeline[]{label, title, paragraphs, image, imageAlt, imageCaption},
      teamBlocks[]{title, body}, manufacturingTitle, manufacturingBody, closing
    }`,
    {},
    fetchOpts("about"),
  );

  if (!doc?.title) return DEFAULT_ABOUT;

  return {
    ...DEFAULT_ABOUT,
    ...doc,
    timeline: doc.timeline?.length
      ? doc.timeline.map((item: any) => ({
          ...item,
          image: urlFor(item.image) ?? undefined,
        }))
      : DEFAULT_ABOUT.timeline,
    teamBlocks: doc.teamBlocks?.length ? doc.teamBlocks : DEFAULT_ABOUT.teamBlocks,
  };
}

export async function getSetupGuideContent(): Promise<SetupGuideContent> {
  if (!client) return DEFAULT_SETUP;

  const doc = await client.fetch(
    `*[_type == "setupGuide"][0] {
      eyebrow, title, description,
      steps[]{step, section, title, body, image, imageAlt, order},
      heroImage, heroImageAlt, heroCaption
    }`,
    {},
    fetchOpts("setup"),
  );

  if (!doc?.title) return DEFAULT_SETUP;

  return {
    ...DEFAULT_SETUP,
    ...doc,
    steps: doc.steps?.length
      ? [...doc.steps]
          .sort((a: any, b: any) => (a.order ?? 100) - (b.order ?? 100))
          .map((step: any) => ({
            step: step.step,
            section: step.section,
            title: step.title,
            body: step.body,
            image: urlFor(step.image) ?? undefined,
            imageAlt: step.imageAlt,
          }))
      : DEFAULT_SETUP.steps,
    heroImage: urlFor(doc.heroImage) ?? DEFAULT_SETUP.heroImage,
  };
}

export async function getPublicFaqs(): Promise<{ q: string; a: LoupkidsFaqAnswer }[]> {
  const fallback = LOUPKIDS_FAQ.map((f) => ({ q: f.q, a: f.a }));
  if (!client) return fallback;

  const raw = await client.fetch(
    `*[_type == "faqItem" && visible != false] | order(order asc) {
      question, answer, answerParagraphs, answerBullets, answerParagraphs2
    }`,
    {},
    fetchOpts("faq"),
  );

  if (!raw?.length) return fallback;

  return raw.map((item: any) => ({
    q: item.question,
    a: mapFaqAnswer(item),
  }));
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  if (!client) return FALLBACK_TESTIMONIALS.filter((t) => t.featured);

  const raw = await client.fetch(
    `*[_type == "testimonial" && featured == true] | order(order asc) { quote, attribution, rating, featured }`,
    {},
    fetchOpts("testimonials"),
  );

  if (!raw?.length) return FALLBACK_TESTIMONIALS.filter((t) => t.featured);
  return raw;
}

export { client as sanityClient };
/* eslint-enable @typescript-eslint/no-explicit-any */
