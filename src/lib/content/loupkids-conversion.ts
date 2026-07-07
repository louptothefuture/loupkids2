/** Shared conversion copy — CTAs, hero, feature cards, trust signals */

export const LOUPKIDS_CTA = {
  primary: "Reserve Loup — $149",
  primaryShort: "Order Loup",
  hero: "Reserve Loup",
  product: "Reserve My Loup — $149",
  checkout: "Complete My Order →",
  waitlist: "Join cellular waitlist",
  newsletter: "Get parent updates",
} as const;

export const LOUPKIDS_HERO_COPY = {
  eyebrow: "Phones for the anti-screen age",
  headline: "No feeds. No AI. No strangers. Just connection.",
  subline: "Call the people you approve. Nothing else.",
  priceLine: "$149 pre-order — $199 at launch. Ships Q4 2026.",
} as const;

export const LOUPKIDS_GUARANTEE = {
  title: "30-day guarantee",
  body: "Full refund if it's not right.",
} as const;

export const LOUPKIDS_CALLING_PRICING = {
  eyebrow: "Calling",
  title: "What it costs to stay connected",
  intro:
    "Out of the box Loup gives you 10 contacts free—enough for most kids' actual needs (close friends + direct family). Loup-to-Loup calling is always free.",
  tiers: [
    {
      label: "Loup to Loup",
      price: "Always free",
      body: "Calls between Loup devices are unlimited — no plan, no monthly bill.",
    },
    {
      label: "Plus plan",
      price: "From $10/month",
      body:
        "Unlimited contacts, make and receive calls from external phone numbers, and pager mode — so you can reach them for dinner without yelling across the house. (\"Hi mom, no I haven't cleaned my room yet, but I will.\") Undercuts many alternatives by at least half. Cancel anytime.",
    },
  ],
  cta: { label: "Lock in pre-launch price — $149", href: "/shop/loup" },
  helpLink: { label: "How Plus plans work", href: "/help/calling-plan" },
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
    body: "Parents can page their kids at any point for free — call or bell. No yelling across the house.",
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
