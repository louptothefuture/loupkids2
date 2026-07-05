export type PlainBlock = { kind: "h2"; text: string } | { kind: "p"; text: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  author: { name: string; role: string };
  category: { title: string; slug: string };
  coverImage: string | null;
  /** portable text from Sanity, or plain blocks from fallback */
  body: { source: "sanity"; value: unknown } | { source: "plain"; blocks: PlainBlock[] };
  relatedSlugs: string[];
  seoTitle?: string;
  seoDescription?: string;
};

export type Faq = {
  question: string;
  answer: string;
  section: string;
};

export type Testimonial = {
  quote: string;
  attribution: string;
  rating: number;
  featured: boolean;
};

export type PressMention = {
  outlet: string;
  pullQuote: string;
  url: string | null;
  logoUrl: string | null;
};

export type Spec = {
  label: string;
  value: string;
  group: string;
};

export type HomepageCopy = {
  heroHeadline: string;
  heroSubline: string;
  heroCta: string;
  manifestoLines: string[];
  howItWorksIntro: string;
};
