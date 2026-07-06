/** Shared conversion copy — CTAs, hero, feature cards, trust signals */

export const LOUPKIDS_CTA = {
  primary: "Reserve Loup — $149",
  primaryShort: "Order Loup",
  product: "Reserve My Loup — $149",
  checkout: "Complete My Order →",
  waitlist: "Join cellular waitlist",
  newsletter: "Get parent updates",
} as const;

export const LOUPKIDS_HERO_COPY = {
  eyebrow: "Phones for the anti-screen age",
  headline: "No apps. No feed. Just your people.",
  waitlist: "Join the 1,000+ families on the waitlist",
  shipping: "Shipping Q4 2026",
} as const;

export const LOUPKIDS_GUARANTEE = {
  title: "30-Day Happiness Guarantee",
  body: "Try Loup at home. Full refund if it's not right for your family.",
} as const;

export const LOUPKIDS_TRUST = {
  rating: 4.9,
  reviewCount: 5,
  reviewHref: "/shop/loup#reviews",
} as const;

export const LOUPKIDS_STORY_SHORT = {
  headline: "Why We Started Loup",
  paragraphs: [
    "We kept putting off the phone — not because we didn't trust our kids, but because we knew what came with it.",
    "Loup is the device we wished existed: connection without the scroll, the spam, or the algorithm.",
  ],
  cta: { label: "Read the whole story", href: "/about" },
} as const;

export const LOUPKIDS_FEATURE_CARDS = [
  {
    icon: "🛡️",
    title: "Approved Contacts Only",
    body: "Only people you approve can call in or out. No strangers. No spam.",
  },
  {
    icon: "📖",
    title: "E-Ink, App-Free",
    body: "Paper-like screen. Zero feeds, games, or rabbit holes.",
  },
  {
    icon: "🌙",
    title: "Quiet Hours",
    body: "Homework, dinner, bedtime — you decide when the phone works.",
  },
  {
    icon: "📢",
    title: "Pager Mode",
    body: "Page them from the parent app. No more yelling up the stairs.",
  },
  {
    icon: "🚨",
    title: "911 Ready",
    body: "Press-and-hold emergency calls. Built for real emergencies, not pocket dials.",
  },
  {
    icon: "📶",
    title: "Wi-Fi Only",
    body: "No SIM. No surprise bills. Connects at home or school.",
  },
] as const;

export const LOUPKIDS_PRESS_QUOTES = [
  { outlet: "The Cut", quote: "The anti-smartphone that kids actually want to be seen with." },
  { outlet: "Wired", quote: "A communication device with nothing to look at." },
  { outlet: "Good Morning America", quote: "The gift every parent in the anti-screen movement is talking about." },
] as const;
