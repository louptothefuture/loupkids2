/** Site architecture content — maps to LOUP_Website_Architecture.csv */

export const ARCH_NAV = [
  { href: "/#specs", label: "Specs" },
  { href: "/#compare", label: "Compare" },
  { href: "/#use-cases", label: "Who it's for" },
  { href: "/story", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/help", label: "Support" },
] as const;

export const HERO = {
  eyebrow: "Ages 10–12 · your phone, not a toy",
  headline: "Phones for the anti-screen age.",
  subline:
    "A real phone — calls, voice messages, a mute button. No apps, no feed, no algorithm. Just your people.",
  cta: "Pre-order — $149",
  ctaSecondary: "Join the waitlist",
  trust: ["Free shipping", "30-day returns", "2-year warranty"],
  videoPoster: "/images/street/phone-throw.jpg",
};

export const FEATURE_ICONS = [
  { title: "Approved contacts", body: "Only people you approve can call in or out." },
  { title: "E-ink strip", body: "Names and time only — no glow, no feed, no apps." },
  { title: "Quiet hours", body: "Homework, dinner, bedtime — you set the schedule." },
  { title: "Select. Call. Talk.", body: "Scroll the dial, pick your person, talk. Mute when you need quiet." },
  { title: "Voice messages", body: "Leave a message when they don't pick up — encrypted." },
  { title: "Aluminum build", body: "Machined unibody, IP54, drop-tested to 2m." },
];

export const COMPARISON = {
  columns: ["LOUP", "Gabb", "Relay", "TinCan", "Bark Phone", "Smartphone"],
  rows: [
    { label: "No social media / apps", values: [true, false, false, true, false, false] },
    { label: "Parent-approved contacts only", values: [true, true, true, true, true, false] },
    { label: "Real voice calls (not walkie-talkie)", values: [true, true, true, false, true, true] },
    { label: "No glowing screen", values: [true, false, false, true, false, false] },
    { label: "Designed to look cool at recess", values: [true, false, false, false, false, true] },
    { label: "No engagement algorithms", values: [true, true, true, true, true, false] },
    { label: "Wi-Fi — no cellular bill required", values: [true, false, false, true, false, false] },
    { label: "Optional real phone numbers", values: [true, true, true, false, true, true] },
  ],
};

export const USE_CASES = [
  {
    id: "parents",
    label: "Parents",
    headline: "Peace of mind, finally.",
    body: "You know exactly who they can reach — and who can't reach them. Approved contacts, quiet hours, and a device with nothing to scroll. Reachability without the anxiety of handing them the whole internet.",
    image: "/images/lifestyle/girl-crisscross.jpg",
    alt: "A kid on a call with LOUP",
  },
  {
    id: "kids",
    label: "Kids",
    headline: "Your phone. Not a toy.",
    body: "Real calls to your people. Machined aluminum, snap-on plates, a mute button when you need it. Looks like something you'd choose — not something you'd hide in your backpack.",
    image: "/images/street/phone-throw.jpg",
    alt: "A kid with LOUP",
  },
  {
    id: "communities",
    label: "Communities",
    headline: "Built for your whole crew.",
    body: "Scout troops, youth groups, homeschool co-ops, church groups, sports teams — LOUP keeps the group connected without group chats spiraling. Parents stay in control; kids stay in touch.",
    image: "/images/lifestyle/kids-stoop.jpg",
    alt: "Kids in a group with their LOUP devices",
  },
];

export const GALLERY = [
  { src: "/images/product/loup-red-front.jpg", alt: "LOUP in signal red" },
  { src: "/images/lifestyle/pocket-sweatshirt.jpg", alt: "LOUP in a sweatshirt pocket" },
  { src: "/images/lifestyle/kids-ambient.jpg", alt: "Two kids sharing a LOUP" },
  { src: "/images/street/jean-jacket.jpg", alt: "Kid on a LOUP call" },
  { src: "/images/lifestyle/kid-tent.jpg", alt: "Kid calling from a blanket fort" },
  { src: "/images/product/loup-three-quarter.jpg", alt: "LOUP three-quarter view" },
  { src: "/images/street/kid-bw.jpg", alt: "Young kid mid-conversation" },
  { src: "/images/product/loup-box.jpg", alt: "LOUP packaging" },
];

export const PRICING_TIERS = [
  {
    name: "Wi-Fi LOUP",
    price: "$149",
    period: "one-time device",
    highlight: true,
    features: [
      "LOUP-to-LOUP calling — free forever",
      "Parent app — contacts, quiet hours, ping",
      "Works on home & school Wi-Fi",
      "Optional $10/mo for real phone numbers",
    ],
    cta: "Pre-order now",
    href: "/shop/loup",
  },
  {
    name: "Cellular LOUP",
    price: "Coming soon",
    period: "device + plan",
    highlight: false,
    features: [
      "Everything in Wi-Fi LOUP",
      "LTE connectivity away from Wi-Fi",
      "Same parent controls & contact list",
      "Join the waitlist for launch pricing",
    ],
    cta: "Join waitlist",
    href: "/reserve",
  },
];

export const MISSION = {
  headline: "Better connection, not less.",
  timeline: [
    { year: "2024", event: "Parents in our friend group keep delaying the smartphone — and feeling guilty about it." },
    { year: "2025", event: "LOUP founded in Brooklyn. Prototypes with real families." },
    { year: "2026", event: "Launch — the phone before their first smartphone." },
  ],
};

export const HELP_ARTICLES = [
  { slug: "setup-wifi", title: "Connect LOUP to Wi-Fi", category: "Getting started" },
  { slug: "approve-contacts", title: "Approve your first contacts", category: "Parent app" },
  { slug: "quiet-hours", title: "Set quiet hours", category: "Parent app" },
  { slug: "calling-plan", title: "Add the $10/mo calling plan", category: "Billing" },
  { slug: "custom-plates", title: "Swap back plates", category: "Hardware" },
  { slug: "warranty-claim", title: "Start a warranty claim", category: "Returns" },
];

export const RESOURCES = [
  { title: "The Borrowed Childhood", href: "/journal/the-borrowed-childhood", type: "Journal" },
  { title: "Wait Until 8th — collective bargaining", href: "/journal/wait-until-8th-and-the-strategy-of-collective-bargaining", type: "Journal" },
  { title: "The Parental Control Myth", href: "/journal/the-parental-control-myth", type: "Journal" },
  { title: "Boring Tech Can Be Anything But", href: "/journal/boring-tech-can-be-anything-but", type: "Journal" },
];
