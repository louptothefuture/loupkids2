/** Homepage DTC cadence — mobile-first conversion arc */

export const HOME_HERO = {
  headline: "Their first phone. Safe from day one.",
  subline:
    "Peace of mind for you, real connection for them. A voice-only phone so kids can reach their people — and still be kids.",
  trustLine: "Ships within 60 days. 30-day trial starts upon delivery.",
} as const;

/** Relevancy — why this moment matters */
export const HOME_RELEVANCY = {
  eyebrow: "Why families choose Loup",
  header: "You are not alone in wanting a better first phone.",
  subhead: "Parents want kids reachable and free to grow. Loup makes both feel possible.",
  metrics: [
    {
      stat: "46%",
      label: "Of teens say they are online almost constantly — families want a calmer first step.",
      cite: "Pew Research, 2024",
      citeHref:
        "https://www.pewresearch.org/internet/2024/12/12/teens-social-media-and-technology-2024/",
    },
    {
      stat: "5.5 hrs",
      label: "Daily entertainment-screen average for kids 8–12 — room to reclaim play and voice.",
      cite: "Common Sense Media, 2021",
      citeHref: "https://www.commonsensemedia.org/research/the-common-sense-census-media-use-by-tweens-and-teens-2021",
    },
    {
      stat: "Play",
      label: "Kids thrive with outdoor play, friendship, and conversation — Loup protects that space.",
    },
  ],
} as const;

/** Brief story — depth lives on /about */
export const HOME_STORY = {
  eyebrow: "Why we built it",
  headline: "Built for connection — and for childhood.",
  paragraphs: [
    "We wanted kids to call friends and family with confidence. Not because childhood needed less joy — because it needed more of the right kind: voices, playdates, and being present.",
    "So we built a pocket phone that only reaches the people parents approve. Voice. Presence. Independence. Room left for being a kid.",
  ],
  cta: { label: "How it started", href: "/about" },
  image: "/images/lifestyle-new/kids-phones-line.jpg",
  imageAlt: "Kids with phones — the moment families look for a gentler first option",
} as const;

/** Feature band headline — accordion bodies live in LOUPKIDS_ACCORDION */
export const HOME_FEATURES = {
  eyebrow: "The phone",
  headline: "Everything you need. Nothing you don't.",
  image: "/images/renders/shop/a_4.jpg",
  imageAlt: "Loup with LOUP wordmark on the face",
} as const;

/** Fun gallery — lifestyle + product; layout uses `tile` for bento */
export const HOME_GALLERY = {
  eyebrow: "In the wild",
  headline: "Designed kid-first. Built for real conversation. Cool enough to call their own.",
  items: [
    {
      src: "/images/lifestyle-new/kid-smile.jpg",
      alt: "Kid smiling outdoors",
      tile: "hero" as const,
    },
    {
      src: "/images/lifestyle-new/two-kids.jpg",
      alt: "Two kids together",
      tile: "mid" as const,
    },
    {
      src: "/images/lifestyle-new/hand-holding-hi.jpg",
      alt: "Hand holding Loup showing hi.",
      tile: "mid" as const,
    },
    {
      src: "/images/lifestyle-new/boy-holding.jpg",
      alt: "Kid holding Loup",
      tile: "wide" as const,
    },
    {
      src: "/images/lifestyle-new/girl-kitchen.jpg",
      alt: "Kid with Loup in the kitchen",
      tile: "square" as const,
    },
    {
      src: "/images/renders/shop/a_4.jpg",
      alt: "Loup product hardware",
      tile: "square" as const,
    },
  ],
} as const;

export const HOME_HOW_IT_WORKS = [
  {
    step: "01",
    title: "Connect over Wi-Fi",
    body: "Pair Loup to your home network in the parent app — about two minutes.",
  },
  {
    step: "02",
    title: "Approve contacts",
    body: "In the parent app, choose who kids can call. No strangers, spam, or surprise calls.",
  },
  {
    step: "03",
    title: "Scroll. Click. Call.",
    body: "It's pretty simple really, because that's the point.",
  },
] as const;

export const HOME_LAUNCH = {
  eyebrow: "Order",
  priceHeader: "$129",
  scarcityLine: "First 500 · Save 33%",
  bonusBanner: "Loup↔Loup + App→Loup always free",
  bullets: [
    "Order now for $129 — First 500 only",
    "First 500: 1 year unlimited calls to external contacts · then $10/mo (cancel anytime)",
    "Ships within 60 days · 100% refundable before dispatch",
    "30-day risk-free trial starts on delivery",
  ],
  e911:
    "Wi-Fi Voice Device: Operates over Wi-Fi and mobile hotspots. Does not support E911 emergency dialing.",
} as const;

/** @deprecated aliases — keep old imports from breaking during rebuild */
export const HOME_TENSION = HOME_RELEVANCY;
export const HOME_MANIFESTO = {
  lines: [
    "We didn't copy a smartphone.",
    "We didn't revive a landline.",
    "We built a cheerful first phone for real independence.",
  ],
} as const;
export const HOME_PILLARS = [
  { title: "Approved Contacts Only", body: "Only people you approve can call in or out." },
  { title: "App to Phone Pager", body: "Page kids from the parent app — call or bell, $0 forever." },
  { title: "Customizable Plates", body: "Swap the plate. Show what you're into." },
  { title: "WiFi Only", body: "No SIM. First 500: year 1 unlimited domestic included — then $10/mo." },
] as const;
