/** Shared conversion copy — CTAs, hero, feature cards, trust signals */

export const LOUPKIDS_PRICE = {
  amount: 129,
  compareAt: 199,
  formatted: "$129",
  compareFormatted: "$199",
  /** Scarcity + deal framing for first-500 offer */
  launchNote: "First 500 · Save 33%",
  stackLine: "$129",
} as const;

export const LOUPKIDS_CTA = {
  primary: "Order Loup — $129",
  primaryShort: "Order Loup",
  hero: "Order Loup — $129",
  product: "Order Loup — $129",
  checkout: "Complete Order →",
  waitlist: "Get parent updates",
  newsletter: "Get launch updates",
  sticky: "Order Loup — $129",
  nav: "Order $129",
} as const;

export const LOUPKIDS_OFFER = {
  callingBadge: "Loup↔Loup + App→Loup always free",
  callingNote:
    "First 500: 1 year unlimited calls to external contacts · then $10/mo (cancel anytime).",
  callingPill: "Loup↔Loup + App→Loup always free",
  priceStackNote: "First 500 · Save 33%",
  scarcityLine: "First 500 · Save 33%",
  /** Full economics line for bullets / meta */
  callingCanonical:
    "Loup↔Loup + App→Loup always free. First 500: 1 year unlimited calls to external contacts · then $10/mo (cancel anytime).",
} as const;

export const LOUPKIDS_HERO_COPY = {
  eyebrow: "The phone before the smartphone",
  headline: "Their first phone. Safe from day one.",
  subline:
    "Total security for you, real connection for them. A voice-only phone designed to block strangers and screen addiction so kids can just be kids.",
  priceLine: "$129",
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
    "Order today — guaranteed shipping within 60 days. 100% refundable anytime prior to dispatch.",
} as const;

/** Wi-Fi device — no E911 */
export const LOUPKIDS_E911 = {
  short:
    "Wi-Fi Voice Device: Operates over Wi-Fi networks and parent mobile hotspots. Does not support E911 emergency dialing.",
} as const;

export const LOUPKIDS_COPPA = {
  badge:
    "Kids' Privacy Guaranteed: Zero data harvesting, zero ads, end-to-end encrypted voice loops. COPPA Compliant.",
  href: "/legal/coppa",
} as const;

export const LOUPKIDS_CART_TRUST = [
  "Ships Within 60 Days",
  "100% Refundable Before Dispatch",
  "First 500: year 1 external calling included",
] as const;

/**
 * Calling economics — keep in sync with LOUPKIDS_OFFER.callingCanonical
 * - Loup↔Loup + App→Loup = always free
 * - First 500: year 1 unlimited external contacts, then $10/mo
 */
export const LOUPKIDS_CALLING_PRICING = {
  eyebrow: "Calling",
  title: "What it costs to stay connected",
  intro: LOUPKIDS_OFFER.callingCanonical,
  tiers: [
    {
      label: "Loup to Loup + App→Loup",
      price: "Always free",
      body: "Calls between Loup devices and from the parent app to Loup are unlimited — no plan, no monthly bill.",
    },
    {
      label: "External contacts",
      price: "Year 1 free · then $10/mo",
      body: "First 500: unlimited US & Canada calls to external contacts included for year one. After that, $10/mo (cancel anytime) — or keep Loup↔Loup and App→Loup free forever.",
    },
  ],
  cta: { label: "Order Loup — $129", href: "/shop/loup" },
  helpLink: { label: "How calling plans work", href: "/help/calling-plan" },
} as const;

/** Shop + home — hardware proof cards */
export const LOUPKIDS_BUILT_LIKE_GEAR = {
  title: "Built like gear, not like a toy",
  cards: [
    {
      src: "/images/renders/shop/a_bottom.jpg",
      title: "Rechargeable & replaceable battery",
      body: "USB-C charges in 70 minutes, runs ~5 days. The battery is rechargeable and replaceable — not glued shut.",
    },
    {
      src: "/images/renders/shop/face-back.jpg",
      title: "Customizable back plates",
      body: "Swap the plate when you want a new look. Patterns and customs ship after launch — Silver first.",
    },
    {
      src: "/images/renders/shop/a_4.jpg",
      title: "Aluminum + ABS",
      body: "Machined aluminum sides and buttons, ABS front — built to survive a backpack, not look like a toy.",
    },
  ],
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
    title: "App to Phone Pager",
    body: "Page kids from the parent app — call or bell over Wi-Fi. $0/mo forever. No yelling across the house.",
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
  body: `The phone before their first smartphone — First 500 for $129 (Save 33%). ${LOUPKIDS_OFFER.callingCanonical} Ships within 60 days.`,
} as const;

export const LOUPKIDS_IN_THE_BOX = [
  "1x LOUP Phone",
  "1x USB-C Braided Charging Cable",
  "Stickers & quick-start card",
  "Lifetime Parent Companion App Access",
] as const;

/** PDP buy box — keep short; depth lives below the fold */
export const LOUPKIDS_PDP = {
  tagline: "The phone before their first smartphone.",
  value:
    "Kids stay reachable. You stay in control. Parent-approved contacts only — no feeds, no apps, no open internet.",
  trustLine: "Ships within 60 days · 30-day trial · 100% refundable before dispatch",
} as const;
