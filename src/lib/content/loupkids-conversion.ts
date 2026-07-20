/** Shared conversion copy — CTAs, hero, feature cards, trust signals */

export const LOUPKIDS_CTA = {
  primary: "Pre-order Loup — $129",
  primaryShort: "Pre-order Loup",
  hero: "Pre-order Loup",
  product: "Pre-order My Loup — $129",
  checkout: "Complete My Order →",
  waitlist: "Join cellular waitlist",
  newsletter: "Get parent updates",
} as const;

export const LOUPKIDS_HERO_COPY = {
  eyebrow: "Kids Phones for the Anti-Screen Age",
  headline: "Kids Phones for the Anti-Screen Age",
  subline: "We didn't build a smarter landline. We built the phone that comes before the smartphone.",
  priceLine: "$129 pre-launch — $169 at launch. Ships October 2026.",
} as const;

export const LOUPKIDS_GUARANTEE = {
  title: "30-day guarantee",
  body: "Full refund if it's not right.",
} as const;

export const LOUPKIDS_CALLING_PRICING = {
  eyebrow: "Calling",
  title: "What it costs to stay connected",
  intro:
    "Loup-to-Loup is always free, as are calls from parents to their kid's Loup. We offer competitive plans to make and receive calls to external numbers too.",
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
  cta: { label: "Pre-order Loup — $129", href: "/shop/loup" },
  helpLink: { label: "How Plus plans work", href: "/help/calling-plan" },
} as const;

export const LOUPKIDS_TRUST = {
  rating: 4.9,
  reviewCount: 5,
  reviewHref: "/shop/loup",
} as const;

export const LOUPKIDS_PULL_QUOTE =
  "We didn't dumb down a smartphone. We didn't modernize a landline. We built a rolodex for the age of independence.";

export const LOUPKIDS_WHY_NOT_JUST = {
  headline: "Why not just...",
  blocks: [
    {
      title: "Get them a watch?",
      body: [
        "A watch is built for tracking, not talking. There's a reason nobody naturally holds their wrist to their ear — the calling experience is awkward, the screen is tiny, and you're still one app download away from the internet.",
      ],
      but: "Connectivity without the chemistry.",
    },
    {
      title: "Lock down a smartphone?",
      body: [
        "A lobotomized smartphone is still a smartphone. The app store is still there. The browser is still there. And trust us — they always find a way around.",
        "Parental controls are a patch, not a solution. And the apps, the storage, the carrier plan? You're paying for all of it.",
      ],
      but: "You're managing restrictions forever instead of starting with the right device.",
    },
    {
      title: "Stick with a landline?",
      body: [
        "A landline is a kids' toy dressed up as a phone. One room, one wall, one purpose — and your kid still has to remember which button is grandma.",
        "LOUP travels. Home, school, grandparents' — any Wi-Fi, same contacts, same controls.",
      ],
      but: "A kids' landline by another name isn't progress.",
    },
  ],
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
