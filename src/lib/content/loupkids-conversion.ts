/** Shared conversion copy — CTAs, hero, feature cards, trust signals */

export const LOUPKIDS_PRICE = {
  amount: 149,
  compareAt: 199,
  formatted: "$149",
  compareFormatted: "$199",
  saveLine: "Save $50",
  stackLine: "$149",
} as const;

export const LOUPKIDS_CTA = {
  primary: "Pre-order Loup — $149",
  primaryShort: "Pre-order Loup",
  hero: "Pre-order Loup — $149",
  product: "Pre-order Loup — $149",
  checkout: "Complete Order →",
  waitlist: "Join cellular waitlist",
  newsletter: "Get launch updates",
  sticky: "Pre-order Loup — $149",
  nav: "Pre-Order $149",
} as const;

export const LOUPKIDS_OFFER = {
  callingBadge: "Includes 1 Year of Free Unlimited Domestic Calling",
  callingPill: "⚡ Includes 1 Year Free Unlimited Domestic Calling",
  priceStackNote: "Save $50",
} as const;

export const LOUPKIDS_HERO_COPY = {
  eyebrow: "The phone before the smartphone",
  headline: "Their first phone. Not their first feed.",
  subline: "Parent-approved Wi-Fi calling for kids. Zero apps, zero feeds, zero screen addiction.",
  priceLine: "$149",
} as const;

/** Category-creator H1 for press / PR landing pages */
export const LOUPKIDS_HERO_CATEGORY = "The phone before the smartphone." as const;

export const LOUPKIDS_GUARANTEE = {
  title: "30-day risk-free trial",
  body: "Starts the day your Loup arrives. 100% refundable anytime prior to shipping.",
} as const;

export const LOUPKIDS_SHIPPING = {
  line: "Guaranteed shipping within 60 days",
  stickyNote: "Ships within 60 days",
  buyBox:
    "Pre-Order Today — Guaranteed Shipping Within 60 Days. 100% Refundable Anytime Prior to Dispatch.",
} as const;

/** Wi-Fi device — not cellular E911 */
export const LOUPKIDS_E911 = {
  short:
    "Wi-Fi Voice Device: Operates over Wi-Fi networks and parent mobile hotspots. Does not support E911 cellular emergency dialing.",
} as const;

export const LOUPKIDS_COPPA = {
  badge:
    "Kids' Privacy Guaranteed: Zero data harvesting, zero ads, end-to-end encrypted voice loops. COPPA Compliant.",
  href: "/legal/coppa",
} as const;

export const LOUPKIDS_CART_TRUST = [
  "Ships Within 60 Days",
  "100% Refundable Pre-Order",
  "1 Year Free Domestic Calling",
] as const;

/**
 * Calling economics:
 * - Loup-to-Loup + Pager Mode (Wi-Fi intercom) = $0 forever
 * - Domestic PSTN calling = 1 year free with device, then optional $10/mo
 */
export const LOUPKIDS_CALLING_PRICING = {
  eyebrow: "Calling",
  title: "What it costs to stay connected",
  intro:
    "Your pre-order includes 1 Year of Free Unlimited Domestic Calling. Loup-to-Loup and Pager Mode stay $0 forever. After year one, renew unlimited domestic calling for $10/mo — or keep using Wi-Fi core for free.",
  tiers: [
    {
      label: "Core (always included)",
      price: "$0/mo forever",
      body: "Loup-to-Loup calls, Pager Mode (Wi-Fi family intercom), parent app, and up to 10 approved contacts. No forced subscription.",
    },
    {
      label: "Launch offer (with device)",
      price: "1 year free",
      body: "Unlimited domestic calling to approved contacts — included with every $149 pre-order for the first year.",
    },
    {
      label: "Domestic calling (after year 1)",
      price: "$10/month",
      body: "Optional renewal for unlimited domestic PSTN calling. Cancel anytime. Core Wi-Fi features stay free.",
    },
  ],
  cta: { label: "Pre-order Loup — $149", href: "/shop/loup" },
  helpLink: { label: "How calling plans work", href: "/help/calling-plan" },
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
        "A restricted smartphone is still a smartphone. The app store is still there. The browser is still there. And trust us — they always find a way around.",
        "Parental controls are a patch, not a solution. And the apps, the storage, the carrier plan? You're paying for all of it.",
      ],
      but: "You're managing restrictions forever instead of starting with the right device.",
    },
    {
      title: "Stick with a landline?",
      body: [
        "A landline stays in one room. Kids still have to remember which button is grandma — and they can't take it to school or a friend's house.",
        "LOUP travels. Home, school, grandparents' — any Wi-Fi, same contacts, same controls.",
      ],
      but: "A fixed landline isn't independence.",
    },
  ],
} as const;

export const LOUPKIDS_STORY_SHORT = {
  headline: "Why We Started Loup",
  paragraphs: [
    "We built LOUP because my daughter wanted to explore the neighborhood, but didn't need an algorithmic smartphone.",
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
    title: "Zero Dopamine Display",
    body: "E-ink contact strip. Zero feeds, zero social media, zero open internet browsing.",
  },
  {
    icon: "🌙",
    title: "Quiet Hours",
    body: "Homework, dinner, bedtime — you decide when the phone works.",
  },
  {
    icon: "📢",
    title: "Pager Mode",
    body: "In-home family intercom over Wi-Fi — $0/mo forever. Call or bell. No yelling across the house.",
  },
  {
    icon: "📶",
    title: "Wi-Fi Voice Network",
    body: "No SIM. No surprise bills. Home, school, or parent hotspot.",
  },
  {
    icon: "🔒",
    title: "Child Privacy",
    body: "Zero data harvesting, zero ads. COPPA compliant with verifiable parental consent.",
  },
] as const;

export const LOUPKIDS_PRESS_QUOTES = [
  { outlet: "The Cut", quote: "The anti-smartphone that kids actually want to be seen with." },
  { outlet: "Wired", quote: "A communication device with nothing to look at." },
  { outlet: "Good Morning America", quote: "The gift every parent in the anti-screen movement is talking about." },
] as const;

export const LOUPKIDS_FINAL_CTA = {
  headline: "Ready when you are.",
  body: "The phone before their first smartphone — $149 launch price, 1 year free domestic calling, ships within 60 days.",
} as const;

export const LOUPKIDS_IN_THE_BOX = [
  "1x LOUP Phone",
  "1x Selected Backplate",
  "1x USB-C Braided Charging Cable",
  "1 Year Free Unlimited Domestic Calling Pass",
  "Lifetime Parent Companion App Access",
] as const;

/** PDP buy box — keep short; depth lives below the fold */
export const LOUPKIDS_PDP = {
  tagline: "The phone before their first smartphone.",
  value:
    "Kids stay reachable. You stay in control. Parent-approved contacts only — no feeds, no apps, no open internet.",
  trustLine: "Ships within 60 days · 30-day trial · 100% refundable before dispatch",
} as const;
