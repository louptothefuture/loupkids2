/**
 * Seed Sanity with current live website copy.
 *
 * Usage:
 *   pnpm seed:sanity
 *
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in the environment.
 */
import { createClient } from "@sanity/client";
import {
  LOUPKIDS_CTA,
  LOUPKIDS_HERO_COPY,
  LOUPKIDS_PULL_QUOTE,
} from "../src/lib/content/loupkids-conversion";
import {
  LOUPKIDS_ABOUT,
  LOUPKIDS_ACCORDION,
  LOUPKIDS_FAQ,
  LOUPKIDS_FOOTER,
  LOUPKIDS_PHONE,
} from "../src/lib/content/loupkids-site";
import { LOUPKIDS_SETUP_STEPS } from "../src/lib/content/loupkids-support";
import { FALLBACK_TESTIMONIALS } from "../src/lib/content/fallback";
import type { LoupkidsFaqAnswer } from "../src/lib/content/loupkids-site";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before seeding.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

function mapFaq(faq: { q: string; a: LoupkidsFaqAnswer }, order: number) {
  if (typeof faq.a === "string") {
    return {
      _type: "faqItem",
      _id: `faq-${order}`,
      question: faq.q,
      answer: faq.a,
      section: "General",
      order,
      visible: true,
    };
  }
  return {
    _type: "faqItem",
    _id: `faq-${order}`,
    question: faq.q,
    answerParagraphs: faq.a.paragraphs,
    answerBullets: faq.a.bullets ?? [],
    answerParagraphs2: faq.a.paragraphs2 ?? [],
    section: "General",
    order,
    visible: true,
  };
}

const docs = [
  {
    _type: "homepage",
    _id: "homepage",
    heroEyebrow: LOUPKIDS_HERO_COPY.eyebrow,
    heroHeadline: LOUPKIDS_HERO_COPY.headline,
    heroSubline: LOUPKIDS_HERO_COPY.subline,
    heroPriceLine: LOUPKIDS_HERO_COPY.priceLine,
    heroCtaLabel: LOUPKIDS_CTA.hero,
    heroImageAlt: "Hand holding Loup — hi.",
    pullQuote: LOUPKIDS_PULL_QUOTE,
    phoneSectionTitle: LOUPKIDS_PHONE.title,
    phoneSectionSubtitle: LOUPKIDS_PHONE.subtitle,
    accordionItems: LOUPKIDS_ACCORDION.map(({ title, body }) => ({ _type: "accordionItem", title, body })),
    finalCtaHeadline: "Ready when you are.",
    finalCtaBody: "The phone before their first smartphone — 30-day guarantee, ships October 2026.",
    finalCtaLabel: LOUPKIDS_CTA.primary,
    footerBody: LOUPKIDS_FOOTER.body,
    testimonialHeadline: "What beta testers are saying",
  },
  {
    _type: "aboutPage",
    _id: "aboutPage",
    title: LOUPKIDS_ABOUT.title,
    introParagraphs: LOUPKIDS_ABOUT.paragraphs.slice(0, 2),
    timeline: [
      {
        label: "01 / Play became real",
        title: "The calls started as pretend.",
        paragraphs: LOUPKIDS_ABOUT.paragraphs.slice(2, 5),
      },
      {
        label: "02 / The pressure arrived",
        title: "Connection came with a cost.",
        paragraphs: LOUPKIDS_ABOUT.paragraphs.slice(5, 7),
      },
      {
        label: "03 / The line we drew",
        title: "The first phone shouldn't be a feed.",
        paragraphs: LOUPKIDS_ABOUT.paragraphs.slice(7, 10),
      },
      {
        label: "04 / The name found us",
        title: "Wolves howl to stay close.",
        paragraphs: [LOUPKIDS_ABOUT.paragraphs[11]],
      },
    ],
    teamBlocks: [
      {
        title: "A parent who wanted another option",
        body: "The question was simple: how do you give a kid independence without handing them the internet?",
      },
      {
        title: "A daughter who named the wolf",
        body: "She turned Loop into Loup—and gave the product its reason for being: staying close to the pack.",
      },
    ],
    manufacturingTitle: "From idea to prototype.",
    manufacturingBody: LOUPKIDS_ABOUT.paragraphs[10],
    closing: LOUPKIDS_ABOUT.paragraphs[12],
  },
  {
    _type: "setupGuide",
    _id: "setupGuide",
    eyebrow: "Support / setup guide",
    title: "Easy as 1, 2, 3",
    description:
      "Pair Loup, add contacts, and let your kid call their people — box to first call in about ten minutes.",
    steps: LOUPKIDS_SETUP_STEPS.map((step) => ({ _type: "setupStep", ...step })),
    heroImageAlt: "Kid talking on Loup at the kitchen counter while a parent cooks",
    heroCaption: "First call from the kitchen — setup takes about ten minutes.",
  },
  ...LOUPKIDS_FAQ.map((faq, i) => mapFaq(faq, i + 1)),
  ...FALLBACK_TESTIMONIALS.map((t, i) => ({
    _type: "testimonial",
    _id: `testimonial-${i + 1}`,
    quote: t.quote,
    attribution: t.attribution,
    rating: t.rating,
    featured: t.featured,
    order: i + 1,
  })),
];

const tx = client.transaction();
for (const doc of docs) {
  tx.createOrReplace(doc);
}
await tx.commit();

console.log(`Seeded ${docs.length} Sanity documents into dataset "${dataset}".`);
