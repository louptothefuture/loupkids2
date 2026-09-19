/** Shared conversion copy — CTAs, hero, feature cards, trust signals */

export const LOUPKIDS_PRICE = {
  amount: 149,
  compareAt: 199,
  formatted: "$149",
  compareFormatted: "$199",
  pairAmount: 298,
  pairQty: 2,
  pairFormatted: "$298",
  /** Scarcity + deal framing for first-500 offer */
  launchNote: "First 500 · Save 25%",
  stackLine: "$149",
} as const;

export const LOUPKIDS_CTA = {
  primary: "Pre-order Loup — $149",
  primaryShort: "Pre-order Loup",
  hero: "Pre-order Loup — $149",
  product: "Pre-order Loup — $149",
  checkout: "Complete Order →",
  waitlist: "Notify me",
  newsletter: "Get launch updates",
  sticky: "Pre-order Loup — $149",
  nav: "Pre-order Loup",
  comingSoon: "Pre-order Loup — $149",
  pair: "2 for $298",
} as const;

export const LOUPKIDS_OFFER = {
  callingBadge: "Loup↔Loup always free",
  callingNote:
    "First 500: 1 year unlimited calls to external contacts · then $10/mo (cancel anytime).",
  callingPill: "Loup↔Loup always free",
  priceStackNote: "First 500 · Save 25%",
  scarcityLine: "First 500 · Save 25%",
  /** Full economics line for bullets / meta */
  callingCanonical:
    "Loup↔Loup always free. First 500: 1 year unlimited calls to external contacts · then $10/mo (cancel anytime).",
} as const;

/** Homepage offer card + PDP buy-box — keep in sync */
export const LOUPKIDS_OFFER_CARD = {
  label: "Founding Offer · First 500 Only",
  saveNote: "Save 25%",
  productLine:
    "A kids phone. No apps, no feeds, no strangers. Calls only — to the people you approve.",
  callingBullets: [
    "LOUP↔LOUP always free",
    "External contacts $10/mo",
  ],
  logistics: [
    "Ships within 60 days · 100% refundable before dispatch · 30-day trial on delivery",
  ],
  disclaimer: [
    "WiFi + LTE option includes eSIM · No open internet · Parent-controlled network",
    "Does not support E911 emergency dialing",
  ],
} as const;

export type LoupConnectivityId = "wifi" | "lte";

export const LOUPKIDS_CONNECTIVITY = {
  wifi: {
    id: "wifi" as const,
    name: "LOUP WiFi",
    tagline: "Home, school, saved networks.",
    preorder: 149,
    launch: 199,
    cta: "Pre-order — $149",
    pairLabel: "Pre-order 2 for $298",
    pairAmount: 298,
    monthlyTotal: null,
    monthlyBreakdown: ["LOUP↔LOUP — always free", "External contacts — $10/mo"],
    coverage: "Works on saved WiFi networks and parent hotspot. Same closed contact list.",
    note: null,
  },
  lte: {
    id: "lte" as const,
    name: "LOUP WiFi + LTE",
    tagline: "Reachable anywhere. Same rules.",
    preorder: 199,
    launch: 249,
    cta: "Pre-order — $199",
    pairLabel: "Pre-order 2 for $398",
    pairAmount: 398,
    monthlyTotal: 20,
    monthlyBreakdown: [
      "LOUP↔LOUP — always free",
      "External contacts — $10/mo",
      "LTE connectivity — $10/mo",
      "Total — $20/mo",
    ],
    coverage: "WiFi everywhere you have it — plus LTE when you don't. Same approved contacts. Same parent controls. No open internet. No dead zones.",
    note: "LTE is handled through LOUP — no separate carrier contract.",
  },
} as const;

export function connectivityFromVariantTitle(title: string): LoupConnectivityId {
  return title.includes("LTE") ? "lte" : "wifi";
}

/** Clear difference between the two SKUs — shop + homepage. */
export const LOUPKIDS_MODELS_COMPARE = {
  eyebrow: "Two models",
  headline: "WiFi, or WiFi + LTE. Same Loup.",
  subline:
    "Same approved contacts. Same parent controls. Same closed network. The only difference is how far they can go — and what you pay per month.",
  columns: ["LOUP WiFi", "LOUP WiFi + LTE"],
  rows: [
    { label: "Pre-order", values: ["$149", "$199"] },
    { label: "At launch", values: ["$199", "$249"] },
    { label: "LOUP↔LOUP calls", values: ["Always free", "Always free"] },
    { label: "External contacts", values: ["$10/mo", "$10/mo"] },
    { label: "LTE connectivity", values: ["—", "$10/mo"] },
    { label: "Monthly total", values: ["$10/mo", "$20/mo"] },
    { label: "Coverage away from WiFi", values: ["Parent hotspot", "LTE anywhere"] },
    { label: "Carrier contract", values: ["None", "None"] },
    { label: "Open internet / browser", values: ["No", "No"] },
    { label: "Location tracking", values: ["No", "No"] },
  ],
} as const;

export const LOUPKIDS_HERO_COPY = {
  eyebrow: "The phone before the smartphone",
  headline: "Their first phone. Safe from day one.",
  subline:
    "Total security for you, real connection for them. A voice-only phone designed to block strangers and screen addiction so kids can just be kids.",
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
    "Order today — guaranteed shipping within 60 days. 100% refundable anytime prior to dispatch.",
} as const;

/** Wi-Fi device — no E911 */
export const LOUPKIDS_E911 = {
  short:
    "Voice device: WiFi, or WiFi + LTE (eSIM). Closed contact network. Does not support E911 emergency dialing.",
} as const;

export const LOUPKIDS_COPPA = {
  badge:
    "Kids' Privacy Guaranteed: Zero data harvesting, zero ads, end-to-end encrypted voice loops. COPPA Compliant.",
  href: "/legal/coppa",
} as const;

export const LOUPKIDS_CART_TRUST = [
  "Ships Within 60 Days",
  "100% Refundable Before Dispatch",
  "LOUP↔LOUP free · External $10/mo",
] as const;

// ponytail: LOUPKIDS_CALLING_PRICING is now only used by legacy/campaign components.
// Shop and home use LoupkidsCallingPricingSection which reads LOUPKIDS_CONNECTIVITY directly.
export const LOUPKIDS_CALLING_PRICING = {
  eyebrow: "Calling",
  title: "What it costs to stay connected",
  intro: "LOUP↔LOUP always free. WiFi model: $10/mo. WiFi + LTE model: $20/mo total.",
  tiers: [
    {
      label: "Loup to Loup",
      price: "Always free",
      body: "Calls between Loup devices are unlimited — no plan, no monthly bill.",
    },
    {
      label: "External contacts",
      price: "$10/mo",
      body: "Approved numbers on regular phones. Included on both models. Cancel anytime.",
    },
  ],
  cta: { label: "Choose WiFi or LTE", href: "/shop/loup" },
  helpLink: { label: "How calling plans work", href: "/help/calling-plan" },
} as const;

/** Shop + home — hardware proof cards */
export const LOUPKIDS_BUILT_LIKE_GEAR = {
  title: "Built like gear, not like a toy",
  cards: [
    {
      src: "/images/renders/shop/studio/05-usb.jpg",
      title: "Rechargeable & replaceable battery",
      body: "USB-C charges in 70 minutes, runs ~5 days. The battery is rechargeable and replaceable — not glued shut.",
    },
    {
      src: "/images/renders/shop/studio/04-back.jpg",
      title: "Customizable back plates",
      body: "Swap the plate when you want a new look. Patterns and customs ship after launch — Silver first.",
    },
    {
      src: "/images/renders/shop/studio/01-three-quarter.jpg",
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
  headline: "We get it. You've thought of this.",
  blocks: [
    {
      title: "Why not just get a watch?",
      body: [
        "A watch is built for tracking, not talking. There's a reason nobody naturally holds their wrist to their ear — the calling experience is awkward, the screen is tiny, and you're still one app download away from the internet.",
      ],
      but: "Connectivity without the chemistry.",
    },
    {
      title: "Why not just lock down a smartphone?",
      body: [
        "A restricted smartphone is still a smartphone. The app store is still there. The browser is still there. And trust us — they always find a way around.",
        "Parental controls are a patch, not a solution. And the apps, the storage, the carrier plan? You're paying for all of it.",
      ],
      but: "You're managing restrictions forever instead of starting with the right device.",
    },
    {
      title: "Why not stick with a landline?",
      body: [
        "A landline stays in one room. Kids still have to remember which button is grandma — and they can't take it with them.",
        "LOUP travels. Home, friends' house, grandparents' — saved WiFi, or LTE if you choose that model. Same contacts. Same controls.",
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
    title: "WiFi + LTE",
    body: "WiFi at home and saved networks. LTE option for anywhere — same contacts, no open internet.",
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
  body: `The phone before their first smartphone — First 500 for $149 (Save 25%). ${LOUPKIDS_OFFER.callingCanonical} Ships within 60 days.`,
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
