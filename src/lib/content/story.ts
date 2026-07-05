/** Founder narrative + Feastables-style scroll story beats */

export const FOUNDER_STORY = {
  eyebrow: "Why we started Loup",
  headline: "Why we started Loup.",
  paragraphs: [
    "We kept putting off the phone. Not because we didn't trust our kids — because we knew what came with it.",
    "The endless scroll. Group chats that never quiet down. The slow, steady replacement of real life with a screen. Childhood isn't disappearing all at once. It's being borrowed, notification by notification.",
    "Kids don't need less connection. They need better connection.",
    "The kind that doesn't come with an algorithm designed to trap attention. So we built a device that does the opposite. One that puts attention back where it belongs — on friendship, conversation, and presence. Not on dinging, checking, and the next thing.",
    "That's Loup.",
  ],
  pullQuotes: [2, 4] as const,
};

export type StoryBeat = {
  id: string;
  bg: string;
  text: string;
  eyebrow?: string;
  lines: string[];
  body?: string;
  image?: { src: string; alt: string };
  cta?: { label: string; href: string };
};

/** Scrolling story — inspired by Feastables Our Cocoa Story structure */
export const STORY_BEATS: StoryBeat[] = [
  {
    id: "begin",
    bg: "bg-block-fuchsia",
    text: "text-white",
    eyebrow: "LOUP began",
    lines: ["WE KEPT", "PUTTING OFF", "THE PHONE."],
    body:
      "Not because we didn't trust our kids — because we knew what came with it. The scroll. The group chats. The slow replacement of real life with a screen.",
    image: { src: "/images/lifestyle/kids-ambient.jpg", alt: "Kids sharing a moment" },
  },
  {
    id: "trap",
    bg: "bg-block-cobalt",
    text: "text-white",
    eyebrow: "The trap",
    lines: ["CHILDHOOD ISN'T", "DISAPPEARING", "ALL AT ONCE."],
    body:
      "It's being borrowed, notification by notification. 8 in 10 parents hate feeling forced into the smartphone trap. Loup is the escape hatch.",
  },
  {
    id: "insight",
    bg: "bg-block-sun",
    text: "text-ink",
    eyebrow: "The insight",
    lines: ["KIDS DON'T NEED", "LESS CONNECTION.", "THEY NEED BETTER."],
    body:
      "The kind that doesn't come with an algorithm designed to trap attention. Voice. Presence. Your people — not the feed.",
    image: { src: "/images/product/loup-three-quarter.jpg", alt: "LOUP hardware" },
  },
  {
    id: "build",
    bg: "bg-block-coral",
    text: "text-white",
    eyebrow: "So we built",
    lines: ["A REAL PHONE.", "NOT A FEED."],
    body:
      "Select. Call. Talk. Approved contacts only. No apps. No algorithms. No compromise. The phone before their first smartphone.",
    image: { src: "/images/product/loup-red-front.jpg", alt: "LOUP in red" },
  },
  {
    id: "mission",
    bg: "bg-block-ink",
    text: "text-white",
    eyebrow: "Now",
    lines: ["BETTER CONNECTION.", "NOT LESS."],
    body:
      "For parents who want peace of mind. For kids who want a phone they'll actually carry. For communities — scouts, church groups, homeschool co-ops, sports teams — who want connection without chaos.",
    cta: { label: "Pre-order LOUP — $149", href: "/shop/loup" },
  },
];

export const LANDING_STATS = [
  { stat: "8 in 10", label: "parents hate the smartphone trap" },
  { stat: "5.5 hrs", label: "daily screen time for kids 8–12" },
  { stat: "−25%", label: "free play since smartphones went mainstream" },
];

export const FEED_LOOP = [
  "Scroll",
  "Snap",
  "Like",
  "Notify",
  "Doomscroll",
  "Algorithm",
  "Feed",
  "Ping",
];
