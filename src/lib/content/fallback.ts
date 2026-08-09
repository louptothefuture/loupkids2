import type { Faq, HomepageCopy, Post, PressMention, Spec, Testimonial } from "./types";
import { LOUPKIDS_JOURNAL_POSTS } from "./journal";

/**
 * Launch content. Everything here is replaced by Sanity the moment a project
 * ID is configured — the team then edits it all in the Studio with zero code.
 */

export const FALLBACK_HOMEPAGE: HomepageCopy = {
  heroHeadline: "Their first phone. Safe from day one.",
  heroSubline:
    "Total security for you, real connection for them. A voice-only phone designed to block strangers and screen addiction so kids can just be kids.",
  heroCta: "Order Loup — $129",
  manifestoLines: [
    "The vanishing playground.",
    "5.5 hours a day on screens.",
    "It's taken over everything.",
    "Nearly 1 in 2 teens online almost constantly (Pew 2024).",
    "Zero dopamine feeds.",
    "Zero games.",
    "Zero open browsing.",
  ],
  howItWorksIntro:
    "The phone before their first smartphone. They stay connected. You stay in control. Zero feeds. Zero algorithms. No compromise.",
};

export const FALLBACK_FAQS: Faq[] = [
  {
    section: "Product",
    question: "What exactly does LOUP do?",
    answer:
      "LOUP makes voice calls and sends voice messages to a contact list that parents control from a companion app. That's the whole feature list, on purpose. There's no screen to scroll — the e-ink strip on the front only shows contact names, the time, and battery.",
  },
  {
    section: "Product",
    question: "Isn't the front panel a screen?",
    answer:
      "It's an e-ink strip — the same tech as a Kindle. It doesn't glow, doesn't play video, doesn't run apps, and can't show anything except names, time, and battery. There's nothing to stare at. Kids point, scroll the side dial, and talk.",
  },
  {
    section: "Product",
    question: "What ages is LOUP for?",
    answer:
      "LOUP is designed for kids. Younger kids use it as their first phone; older kids use it as a smartphone alternative that keeps them reachable without pulling them into feeds.",
  },
  {
    section: "Product",
    question: "Can I customize it?",
    answer:
      "The back plate is removable. Custom patterns and plates are planned after launch — Silver ships first.",
  },
  {
    section: "Plans & Calling",
    question: "Is there a monthly fee?",
    answer:
      "Loup-to-Loup and Pager Mode stay $0/mo forever. Every device includes 1 Year of Free Unlimited Domestic Calling. After year one, renew domestic calling for $10/mo — or keep Wi-Fi core free.",
  },
  {
    section: "Plans & Calling",
    question: "How do parents control the contact list?",
    answer:
      "From the free LOUP parent app (iOS and Android). Add, remove, and approve contacts in seconds. The device updates instantly over Wi-Fi or its built-in connection. Nobody outside the approved list can call in or be called.",
  },
  {
    section: "Plans & Calling",
    question: "Does LOUP work away from home Wi-Fi?",
    answer:
      "LOUP connects over Wi-Fi — at home, school, or anywhere you trust. There's no SIM card and no carrier bill. LOUP-to-LOUP calling works wherever both devices have Wi-Fi. First 500 includes year 1 unlimited domestic; then $10/mo if you want external numbers after that.",
  },
  {
    section: "Shipping",
    question: "How fast is shipping?",
    answer:
      "Every order ships within 60 days. You'll get tracking by email when it leaves us. We currently ship to the US, Canada, UK, and EU.",
  },
  {
    section: "Shipping",
    question: "Can I track my order?",
    answer:
      "Yes — you'll get a tracking link by email the moment your LOUP ships, and you can always check status on the order tracking page.",
  },
  {
    section: "Returns & Warranty",
    question: "What's the return policy?",
    answer:
      "30-day risk-free trial starts the day your Loup arrives. 100% refundable anytime prior to shipping. Free return shipping if it's not right for your family.",
  },
  {
    section: "Returns & Warranty",
    question: "What does the warranty cover?",
    answer:
      "Every Loup includes a 30-day return policy. Contact us if something isn't right — we'll make it right.",
  },
  {
    section: "Safety & Privacy",
    question: "Does LOUP track my kid's location?",
    answer:
      "Loup is built for friendship, not monitoring — no always-on tracking, no data sold to anyone. Voice stays on a closed network you control.",
  },
  {
    section: "Safety & Privacy",
    question: "Can strangers contact my kid?",
    answer:
      "No. Calls only connect to and from the parent-approved list. There is no number to text, no username to find, no way in from outside.",
  },
];

export const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "My 9-year-old calls me from the backyard fort like it's mission control. He has never once asked me for an iPad since it arrived.",
    attribution: "Maya Chen, mom of two, Seattle WA",
    rating: 5,
    featured: true,
  },
  {
    quote:
      "We held out on a smartphone for our 12-year-old and were the bad guys for a year. LOUP ended the argument. She's reachable, we're relaxed, and she actually thinks it looks cool.",
    attribution: "Jordan Hale, dad of one, Chicago IL",
    rating: 5,
    featured: true,
  },
  {
    quote:
      "The build quality shocked me. It feels like something from Braun, not a kids' toy. Our son treats it like a treasure — and the quiet hours actually stick.",
    attribution: "Elise Navarro, mom of three, Austin TX",
    rating: 5,
    featured: true,
  },
];

export const FALLBACK_PRESS: PressMention[] = [
  {
    outlet: "The Cut",
    pullQuote: "The anti-smartphone that kids actually want to be seen with.",
    url: null,
    logoUrl: null,
  },
  {
    outlet: "Wired",
    pullQuote: "LOUP's radical bet: a communication device with nothing to look at.",
    url: null,
    logoUrl: null,
  },
  {
    outlet: "Fast Company",
    pullQuote: "Design of the year candidate — and a genuinely new category.",
    url: null,
    logoUrl: null,
  },
  {
    outlet: "Good Morning America",
    pullQuote: "The gift every parent in the anti-screen movement is talking about.",
    url: null,
    logoUrl: null,
  },
  {
    outlet: "TechCrunch",
    pullQuote: "Headless commerce, heads-up childhood.",
    url: null,
    logoUrl: null,
  },
];

export const FALLBACK_SPECS: Spec[] = [
  { group: "Hardware", label: "Body", value: "Aluminum sides & buttons · ABS front, silver" },
  { group: "Hardware", label: "Back plate", value: "Removable / customizable (patterns after launch)" },
  { group: "Hardware", label: "Display", value: 'E-ink contact strip (no glow, no video, no apps)' },
  { group: "Hardware", label: "Controls", value: "Side scroll dial + call bar + mute button + volume rocker" },
  { group: "Hardware", label: "Speaker & Mic", value: "Full-range speaker, dual noise-cancelling mics" },
  { group: "Hardware", label: "Durability", value: "IP54 splash resistant, drop-tested to 2 meters" },
  { group: "Hardware", label: "Size & Weight", value: '4.3" × 2.6" × 0.5" — 118 g' },
  { group: "Calling", label: "LOUP to LOUP", value: "Free forever, unlimited" },
  { group: "Calling", label: "Real phone numbers", value: "Year 1 free (First 500) · then $10/mo, unlimited US & Canada, cancel anytime" },
  { group: "Calling", label: "Contacts", value: "Parent-approved list; Loup-to-Loup and parent-to-kid free" },
  { group: "Calling", label: "Connectivity", value: "Wi-Fi only — no SIM card, no carrier bill" },
  { group: "Battery & Charging", label: "Battery", value: "Rechargeable and replaceable" },
  { group: "Battery & Charging", label: "Battery life", value: "5 days typical use" },
  { group: "Battery & Charging", label: "Charging", value: "USB-C, 0–100% in 70 minutes" },
  { group: "In the Box", label: "Included", value: "LOUP device, USB-C cable, stickers, quick-start card, parent app" },
  { group: "In the Box", label: "Also included", value: "30-day trial from arrival · refundable pre-ship" },
];

export const FALLBACK_POSTS: Post[] = LOUPKIDS_JOURNAL_POSTS;

/** Featured press quotes / fast facts for legacy home strip. */
export const PRESS_KIT_FACTS = [
  { label: "Founded", value: "2025, Providence RI" },
  { label: "Product", value: "LOUP — screenless voice phone for kids" },
  { label: "Price", value: "$129 device · free LOUP-to-LOUP · $10/mo real numbers" },
  { label: "Category", value: "Smartphone alternative / anti-screen hardware" },
  { label: "Contact", value: "hi@loupkids.com" },
];
