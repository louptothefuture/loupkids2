/** Scraped from loupkids.com — local images in /public/images/loupkids/ */

const L = (file: string) => `/images/loupkids/${file}`;

export const LOUPKIDS_IMAGES = {
  heroKitchen: L("Kid+in+Kitchen+Candid.jpg"),
  sweater: L("sweater.png"),
  whiteBag: L("white+bag+phone.png"),
  squeezeGif: L("squeeze+load.gif"),
  kidBw: L("kid+black+and+white.png"),
  kidsPhonesTout: L("kids-on-phones-tout-2-032724-383a248fa70e473eaab4fc83db6f269c.jpg"),
  kidSmile: L("kid+candid+smile.png"),
  appUx: L("app+ux+2+.gif"),
  friends: L("friends.png"),
  panda: L("panda.png"),
  gymnastics: L("gymnastics.png"),
  baseball: L("baseball.png"),
  palmTrees: L("palm+trees.png"),
  purple: L("purple+pattern.png"),
  // store
  reserve: L("vertical+flat+2.jpg"),
  loup31: L("Autism+awareness+blue+2.png"),
  loupBlack: L("black+just+loup.png"),
  loupRed: L("red+just+loup.png"),
  loupAluminium: L("front+of+phone+with+type.png"),
  // ode
  familyMovie: L("family+watching+movie+.png"),
  laptop: L("laptop.png"),
} as const;

/** Journal cover images scraped from loupkids.com/journal/[slug] */
export const LOUPKIDS_JOURNAL_COVERS: Record<string, string> = {
  "the-pickup-paradox-why-100-skims-are-more-dangerous-than-one-movie":
    "/images/loupkids/journal/the-pickup-paradox-why-100-skims-are-more-dangerous-than-one-movie-unsplash-image-w13BMngq7JM.jpg",
  "why-spontaneous-talk-is-the-ultimate-brain-food-for-kids":
    "/images/loupkids/journal/why-spontaneous-talk-is-the-ultimate-brain-food-for-kids-two+girls+talking+.png",
  "wait-until-8th-and-the-strategy-of-collective-bargaining":
    "/images/loupkids/journal/wait-until-8th-and-the-strategy-of-collective-bargaining-kids+outside.jpg",
  "the-tactical-surrender-of-the-middle-school-smartphone":
    "/images/loupkids/journal/the-tactical-surrender-of-the-middle-school-smartphone.png",
  "the-parental-control-myth":
    "/images/loupkids/journal/the-parental-control-myth-Trumanshow.jpg",
  "why-your-kid-needs-a-paper-phone-e-ink-vs-oled-the-anti-lilypad-guide":
    "/images/loupkids/journal/why-your-kid-needs-a-paper-phone-e-ink-vs-oled-the-anti-lilypad-guide-toy_Story5.jpg",
  "navigating-the-no-mans-land-of-parenting":
    "/images/loupkids/journal/navigating-the-no-mans-land-of-parenting-blurred.png",
  "boring-tech-can-be-anything-but":
    "/images/loupkids/journal/boring-tech-can-be-anything-but-Girl%2Bon%2Bstairs.png",
  "the-borrowed-childhood":
    "/images/loupkids/journal/the-borrowed-childhood-kids-on-phones-tout-2-032724-383a248fa70e473eaab4fc83db6f269c.jpg",
};

/** Header nav — scraped from loupkids.com header */
export const LOUPKIDS_NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "The Story" },
  { href: "/faq", label: "FAQ" },
  { href: "/shop", label: "Store" },
  { href: "/resources", label: "Resources" },
  { href: "/journal", label: "Journal" },
  { href: "/help", label: "Help" },
  { href: "/contact", label: "Contact" },
] as const;

/** Footer nav — scraped from loupkids.com homepage footer */
export const LOUPKIDS_FOOTER_NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "The Story" },
  { href: "/resources", label: "Resources" },
  { href: "/journal", label: "Journal" },
  { href: "/faq", label: "FAQ" },
  { href: "/ode", label: "Ode" },
  { href: "/contact", label: "Contact Us" },
] as const;

export const LOUPKIDS_HERO = {
  headline: "Phones for the anti-screen age.",
};

export const LOUPKIDS_INTRO = {
  subhead: "You aren't alone in being frustrated.",
  body: "8 out of 10 parents hate that they feel \"forced\" into the smartphone trap.",
  cta: "Loup is the escape hatch.",
};

/** Section 2 stats — exact copy and order from loupkids.com */
export const LOUPKIDS_STATS = [
  {
    title: "The Vanishing Playground",
    text: "Traditional \"free play\" has declined by 25% since smartphones went mainstream.",
  },
  {
    title: "The Play Gap.",
    text: "Kids 8–12 now spend 5.5 hours a day on entertainment screens.",
  },
  {
    title: "It's taken over everything.",
    text: "95% of teens say they are \"constantly\" online.",
  },
] as const;

export const LOUPKIDS_PHONE = {
  title: "The Phone Before Their First Smartphone.",
  subtitle: "They stay connected. You stay in control. No apps. No algorithms. No compromise.",
};

export const LOUPKIDS_PRODUCT_SHOTS = [
  { src: LOUPKIDS_IMAGES.sweater, alt: "Loup in a sweater pocket" },
  { src: LOUPKIDS_IMAGES.whiteBag, alt: "Loup in a white bag" },
  { src: LOUPKIDS_IMAGES.squeezeGif, alt: "Loup squeeze demo" },
] as const;

export const LOUPKIDS_ACCORDION = [
  {
    title: "Approved Contacts Only",
    body: "Give your child the freedom to connect while giving yourself total peace of mind. Only the contacts you approve in the LOUP parent app can call in or out. Say goodbye to spam, strangers, and robocalls—it's just voices you know and trust.",
  },
  {
    title: "App-free and Focus Friendly",
    body: "The LOUP phone is intentionally designed without apps, utilizing E-Ink technology (the same low-power, screen-free display used in E-Readers). This simple, eye-friendly approach requires only a basic wifi connection to ensure your child's communication is stable and secure, allowing them to focus and live in the moment.",
  },
  {
    title: "Set Boundaries",
    body: "Maintain household routines and ensure a healthy tech-life balance. Use the companion app to set Quiet Hours that prevent incoming and outgoing calls on your schedule. Whether it's homework time, dinner time, or bedtime, you have total control over when the phone is active.",
  },
  {
    title: "Pager Mode",
    body: "Parents can page their kids at any point for free — call or bell. No yelling across the house, no extra charges.",
  },
  {
    title: "Emergency Calls",
    body: "Intentionally designed to let kids reach 911 with a press-and-hold action—accessible in a real emergency, but designed to prevent accidental dials.",
  },
  {
    title: "WiFi Only",
    body: "No SIM card. No cellular bill. Connects over home or school Wi-Fi — simple and affordable.",
  },
  {
    title: "Data? Closed — you own it.",
    body: "No ads, no profiling, no selling your family's data. Loup runs on a closed network you control from the parent app.",
  },
] as const;

export const LOUPKIDS_NOTHING = {
  headline: "Chock Full of Nothing. No social media. No games. No rabbit holes.",
  items: [
    { title: "Purity of Purpose", body: "No social media. No games. No rabbit holes." },
    { title: "WiFi Only", body: "No SIM card. No cellular bill. Connects over home or school WiFi — simple and affordable." },
    { title: "Parent Control App", body: "Approve contacts, set call hours, and page them directly. Full control from your phone." },
    { title: "Designed With Kids", body: "Durable, pocket-sized, and designed to survive being a kid." },
    { title: "Data? Closed — you own it.", body: "No ads, no profiling, no selling your family's data. Loup runs on a closed network you control from the parent app." },
  ],
} as const;

export const LOUPKIDS_STORY_TEASER = {
  headline: "Why We Started Loup",
  paragraphs: [
    "We kept putting off the phone. Not because we didn't trust our kids—because we knew what came with it.",
    "The endless scroll. Group chats that never quiet down. The slow, steady replacement of real life with a screen. Childhood isn't disappearing all at once. It's being borrowed, notification by notification.",
    "Kids don't need less connection. They need better connection. The kind that doesn't come with an algorithm designed to trap attention.",
    "So we built a device that does the opposite. One that puts attention back where it belongs—on friendship, conversation, and presence. Not on dinging, checking, and the next thing.",
    "That's Loup.",
  ],
  cta: { label: "Read the Whole Story", href: "/about" },
};

export const LOUPKIDS_GALLERY = [
  { src: LOUPKIDS_IMAGES.kidSmile, alt: "Kid smiling with Loup" },
  { src: LOUPKIDS_IMAGES.kidBw, alt: "Kid with Loup black and white" },
  { src: LOUPKIDS_IMAGES.kidsPhonesTout, alt: "Kids with Loup phones" },
  { src: LOUPKIDS_IMAGES.sweater, alt: "Loup in a sweater pocket" },
  { src: LOUPKIDS_IMAGES.whiteBag, alt: "Loup in a bag" },
  { src: LOUPKIDS_IMAGES.friends, alt: "Friends with Loup back plates" },
] as const;

export const LOUPKIDS_USE_CASES = [
  {
    id: "parents",
    label: "Parents",
    headline: "Give them independence without the internet.",
    body: "Approved contacts only. Quiet hours you control. A device with nothing to scroll — just voices you trust.",
    image: LOUPKIDS_IMAGES.heroKitchen,
    alt: "Parent and kid in the kitchen with Loup",
  },
  {
    id: "kids",
    label: "Kids",
    headline: "Your phone. Not a toy.",
    body: "Independence and connection without the internet. Real calls to your people — a device that looks like something you'd choose, not hide.",
    image: LOUPKIDS_IMAGES.kidBw,
    alt: "Kid with Loup",
  },
  {
    id: "community",
    label: "Community",
    headline: "Communities benefit from their own closed loop.",
    body: "Church groups, homeschool networks, and sports teams stay connected on their terms — without group chats or open phone numbers. For bulk pricing, email hi@loupkids.com.",
    image: LOUPKIDS_IMAGES.friends,
    alt: "Kids with customized Loup devices",
  },
] as const;

export const LOUPKIDS_PRESS_KIT_URL = "/press/loup-press-kit.zip";

export const LOUPKIDS_COMPANION = {
  headline: "Companion App Features",
  items: LOUPKIDS_ACCORDION,
};

export const LOUPKIDS_CUSTOMIZE = {
  headline: "Did we mention it's customizable?",
  body: "Swap the plates. Pick a vibe. LOUP is as individual as your kid.",
  plates: [
    LOUPKIDS_IMAGES.gymnastics,
    LOUPKIDS_IMAGES.friends,
    LOUPKIDS_IMAGES.panda,
    LOUPKIDS_IMAGES.purple,
    LOUPKIDS_IMAGES.baseball,
    LOUPKIDS_IMAGES.palmTrees,
  ],
};

export const LOUPKIDS_NEWSLETTER = {
  headline: "Stay in The Loup",
};

export const LOUPKIDS_FOOTER = {
  body: "Screens are the default. We're building the alternative. LOUP gives kids a way to stay connected without handing them the internet. Voice-only, parent-controlled, designed for the years before a smartphone makes sense.",
};

export const LOUPKIDS_ABOUT = {
  title: "How it Started",
  paragraphs: [
    "My daughter came into my office and found an old phone sitting on the floor—one of those heavy, plastic relics from before everything had a screen.",
    "She picked it up and started pretending to call people. For weeks after, she'd pretend to dial friends, telling stories, and generally being lost in her own world.",
    "A couple months later she got a pair of walkie-talkies. She handed one to a friend down the street, and the game became real. They were talking every day, sharing everything:",
    "\"My dad stepped in dog 💩 today.\" \"I saw Goonies last night.\" \"Want to come over to play?\"",
    "It was simple, playful, real.",
    "At the same time, I kept seeing headlines about kids and screens—anxiety, distraction, lost sleep.",
    "Parents everywhere were trying to balance connection and protection. I felt it too. My daughter's friends were already getting tablets and smartphones, and it was hard not to feel the pressure.",
    "I'm not against screens—cartoons on the weekends, we watch movies and play video games together—but I didn't want her first experience of independent connection to be through something designed to keep her scrolling.",
    "Or being drawn into the pressure of social media, the threats of spam, or ending up in the wrong part of the internet … and that list goes on.",
    "So I started building. I wanted something small and safe, but still beautiful. A way for kids to talk and stay close, without being pulled into feeds or apps. That became Loup—a screenless, SIM-free voice device that lets kids connect while parents stay in control. Freedom for her. Peace of mind for me.",
    "The name started as loop—a safe circle of connection. But my daughter had said it should be written as Loup, the French word for wolf. \"Because wolves howl to stay close to their pack,\" she had learned. And that just made sense.",
    "Loup isn't another smartphone for kids. It's something new—a smarter first phone. With your support, we can help kids grow up connected in the ways that really matter.",
  ],
};

export const LOUPKIDS_ODE = {
  title: "Ode to the Screen",
  paragraphs: [
    "The technology in our homes is incredible. It provides information, facilitates deep learning, and offers new ways to connect.",
    "It is a platform for gaming, media, music and connection.",
    "Its value is undeniable.",
    "But we worry about the mindless consumption. The doom-scrolling. the quick, empty dopamine hits that keep kids glued to a device.",
    "Worse yet, the tech and media industry is designed to not only do this, but push it.",
    "They're not just aware of the addiction loop—they're actively building and monetizing it.",
  ],
  images: [LOUPKIDS_IMAGES.familyMovie, LOUPKIDS_IMAGES.laptop],
};

export type LoupkidsFaqAnswer =
  | string
  | { paragraphs: string[]; bullets?: string[]; paragraphs2?: string[] };

export const LOUPKIDS_FAQ: { q: string; a: LoupkidsFaqAnswer }[] = [
  {
    q: "What is Loup?",
    a: "The Loup is a screenless, voice-based communication device designed specifically for kids aged 8–16. It is built for simple, safe connection with friends and family without the distractions and dangers of smartphones",
  },
  {
    q: "Does Loup require a SIM card or a cell carrier?",
    a: "No, Loup is SIM-Free and works over Wi-Fi. This eliminates the need for cell carrier contracts and recurring data plans.",
  },
  {
    q: "How is Loup different from a regular cell phone or a \"dumb phone\"?",
    a: {
      paragraphs: [
        "Loup is fundamentally a closed-loop system. Unlike regular cell phones or \"dumb phones,\" which are open systems that require a SIM card and can receive calls from anyone, Loup offers:",
      ],
      bullets: [
        "App-less, voice-only interaction (dopamine loops).",
        "SIM-Free operation over Wi-Fi , meaning no monthly data plans or recurring fees needed.",
        "A Closed, Trusted Network where kids can only talk to contacts parents have approved. No strangers and no outside exposure.",
      ],
    },
  },
  {
    q: "Are there monthly fees or subscriptions?",
    a: {
      paragraphs: [
        "Out of the box Loup gives you 10 contacts free—enough for most kids' actual needs (close friends + direct family). Loup-to-Loup calling is always free.",
        "If you're looking for more—unlimited contacts, make and receive calls from external phone numbers (\"hi mom, no I haven't cleaned my room yet, but I will\"), and the ability to page your kids for dinner—plans start at $10/month, which undercuts many alternatives by at least half.",
      ],
    },
  },
  {
    q: "How do parents control the device? Who can they talk to?",
    a: {
      paragraphs: ["Parents control the Loup through a companion app. This allows parents to:"],
      bullets: [
        "Approve which contacts their child can communicate with",
        "Set communication windows (e.g., no calls after 9pm, no calls during school hours)",
        "Enable/disable the device as needed",
      ],
      paragraphs2: [
        "It's designed to be Parent-Controlled, Not Surveillance-Oriented—focusing on guidance without tracking, spying, or overreach. Your child can only communicate with approved contacts who are part of the closed Loup system. This ensures no strangers or random calls.",
      ],
    },
  },
  {
    q: "Why don't I just get a Landline?",
    a: {
      paragraphs: [
        "Honestly, landlines aren't a bad idea. But they come with limitations: recurring monthly fees (often $30–40/m), they're stuck in one place, and it remains hard to eliminate spam calls or set time limits.",
        "Loup solves this by giving you a mobile device that works over WiFi—no data plan, no monthly carrier fees—while keeping the closed network safety of a landline. Your kid can take it anywhere there's WiFi, but only call approved contacts.",
      ],
    },
  },
  {
    q: "Can my child customize their Loup?",
    a: "The back plate is removable — patterns and custom plates are coming after launch. Silver ships first.",
  },
  {
    q: "Can I monitor my child's conversations or location?",
    a: {
      paragraphs: [
        "Loup is designed for friendship, not monitoring.",
        "It's built around spontaneous, peer-to-peer connections to help kids develop social confidence and form deeper emotional bonds.",
        "There are so many well-crafted options that do provide monitoring, tracking, and oversight - which are worth checking out if that's what you think you need!",
      ],
    },
  },
  {
    q: "What are the main physical features?",
    a: {
      paragraphs: ["The device features a simple, clean, and intuitive design:"],
      bullets: [
        "E-Ink Display for a clear contact list.",
        "Touchscreen and Scroll Wheel to select contacts.",
        "Microphone and Headphone Jack.",
        "Volume and Power buttons.",
        "USB-C Charging",
      ],
    },
  },
  {
    q: "Where will Loup be available?",
    a: "We are shipping to USA, EU, UK and Canada.",
  },
  {
    q: "You misspelled Loop",
    a: "The name Loup (French for wolf) was chosen because wolves howl to stay in touch with their pack, reflecting the product's goal of safe, private connection. It also connects to the initial concept of a \"closed LOOP\" — a safe, trusted circle of friends.",
  },
];

export const LOUPKIDS_STORE = {
  headline: "Reserve Loup",
  subheadline: "Silver anodized aluminum — $149 pre-order, $199 at launch. Ships Q4 2026.",
  sectionLabel: "Store",
  footerCta: "Have Questions?",
};

export const LOUPKIDS_STORE_PRODUCTS = [
  {
    title: "Loup — Silver",
    price: 149,
    compareAt: 199 as number | null,
    note: "Pre-order · Ships Q4 2026",
    image: LOUPKIDS_IMAGES.loupAluminium,
    href: "/shop/loup",
    sizes: [] as string[],
  },
] as const;

export const LOUPKIDS_SPECS = [
  { group: "Hardware", label: "Body", value: "Anodized aluminum unibody, silver" },
  { group: "Hardware", label: "Display", value: "E-ink contact strip (no glow, no video, no apps)" },
  { group: "Hardware", label: "Controls", value: "Side scroll dial + call bar + mute button + volume rocker" },
  { group: "Hardware", label: "Speaker & Mic", value: "Full-range speaker, dual noise-cancelling mics" },
  { group: "Hardware", label: "Durability", value: "IP54 splash resistant, drop-tested to 2 meters" },
  { group: "Hardware", label: "Size & Weight", value: '4.3" × 2.6" × 0.5" — 118 g' },
  { group: "Calling", label: "LOUP to LOUP", value: "Free forever, unlimited" },
  { group: "Calling", label: "Real phone numbers", value: "$10/month, unlimited US & Canada, cancel anytime" },
  { group: "Calling", label: "Voice messages", value: "Unlimited, end-to-end encrypted" },
  { group: "Calling", label: "Contacts", value: "10 free out of the box; unlimited with Plus plan" },
  { group: "Calling", label: "Connectivity", value: "Wi-Fi only — no SIM card, no cellular bill" },
  { group: "Battery & Charging", label: "Battery life", value: "5 days typical use" },
  { group: "Battery & Charging", label: "Charging", value: "USB-C, 0–100% in 70 minutes" },
  { group: "In the Box", label: "Included", value: "LOUP device, USB-C cable, stickers, quick-start card" },
  { group: "In the Box", label: "Also included", value: "30-day free returns" },
] as const;

export const LOUPKIDS_COMPARISON = {
  columns: ["LOUP", "Smartphone", "Kids smartwatch", "Flip phone"],
  rows: [
    { label: "Screen time", values: ["Zero", "5+ hrs/day avg", "Small screen, creeping apps", "Low but growing"] },
    {
      label: "Feeds & algorithms",
      values: ["None, physically impossible", "The whole product", "Some models", "Browser included"],
    },
    {
      label: "Works on Wi-Fi",
      values: ["Yes — no SIM, no cellular bill", "Yes (cellular)", "Yes (cellular)", "Yes (cellular)"],
    },
    {
      label: "Parent-approved contacts only",
      values: ["Yes, enforced in hardware", "No", "Usually", "No"],
    },
    {
      label: "Data privacy",
      values: [
        "COPPA-compliant, no data sold, no ads",
        "Data collected & monetized",
        "Varies, often data-sharing",
        "N/A",
      ],
    },
    {
      label: "Monthly cost",
      values: ["$0 — WiFi only, no plan", "Cellular plan required", "Cellular plan required", "Cellular plan required"],
    },
    {
      label: "Texts & internet",
      values: ["None — calls only", "Full access", "Varies", "Basic texting, some browsers"],
    },
    {
      label: "Parent controls",
      values: [
        "Included, web dashboard",
        "Separate paid app",
        "Separate app, often subscription",
        "None",
      ],
    },
    { label: "Camera", values: ["None, by design", "Yes", "Some models", "Basic"] },
    { label: "Battery", values: ["5 days", "1 day", "1 day (less if used)", "2–3 days"] },
    {
      label: "Survives being a kid's",
      values: ["Built for it", "Add a $60 case & pray", "Mostly", "It's disposable"],
    },
    { label: "Price", values: ["$149", "$400–1,200", "$150–400 + plan", "$40–100"] },
  ],
} as const;

export const LOUPKIDS_JOURNAL_EXCERPTS: Record<string, string> = {
  "the-pickup-paradox-why-100-skims-are-more-dangerous-than-one-movie":
    "We've been fighting a war over 'Total Screen Time' for a decade, but 2026 data reveals we've been looking at the wrong number. It's not how long they stay on; it's how often they return. Discover why 'The Twitch'—the impulsive act of picking up a device—is the true thief of childhood focus, and how a new class of 'Boring Tech' is helping parents reclaim depth in an age of fragmented attention.",
  "why-spontaneous-talk-is-the-ultimate-brain-food-for-kids":
    "Beyond screen-time limits: Why the \"conversational bridge\" is critical for child development. Explore the MIT and Harvard-backed science proving that unscripted back-and-forth talk—not apps—is the key to cognitive growth and emotional resilience in the digital age.",
  "wait-until-8th-and-the-strategy-of-collective-bargaining":
    "The \"Wait Until 8th\" pledge is a masterclass in collective bargaining. But simply subtracting a smartphone without substituting it with a deployable, real-world tool sets parents up to fail. Here is how to actually execute the boundary without leaving your kid disconnected.",
  "the-tactical-surrender-of-the-middle-school-smartphone":
    "Giving a middle schooler a smartphone is rarely a strategic parenting decision—it's a tactical surrender. Here is how the \"everyone else has one\" panic became the default path of least resistance, and why parents are losing their leverage to the algorithm.",
  "the-parental-control-myth":
    "Why parental controls don't work and how the Loup phone gives kids real independence without GPS tracking or screen addiction.",
  "why-your-kid-needs-a-paper-phone-e-ink-vs-oled-the-anti-lilypad-guide":
    "Is your kid's tablet the villain? As Toy Story 5 highlights the battle between toys and tech, we compare E-Ink vs. OLED screens. Discover why 'paper-screen' technology like Loup is the toy-friendly alternative to tablet addiction and digital eye strain.",
  "navigating-the-no-mans-land-of-parenting":
    "Ages 8 to 12 are the \"No Man's Land\" of parenting. You need to reach them at soccer practice, but you don't want to hand them a digital casino. We're tired of the false choice between \"Total Isolation\" and \"Total Access.\" This is the \"Third Way\"—a bridge for the years that actually matter.",
  "boring-tech-can-be-anything-but":
    "Most tech companies want to sell you \"engagement.\" I want to sell you the opposite. We built a device that does exactly three things well and zero things that ruin your kid's brain. No apps, no feeds, and no \"infinite scroll\" bullshit. Here's why making a phone \"boring\" is the best thing we ever did for our kids.",
  "the-borrowed-childhood":
    "Childhood isn't disappearing all at once. It's being borrowed—minute by minute, notification by notification. We're losing the war for our kids' attention to algorithms engineered like slot machines. Here is why we're fighting for the \"gap years\" and why boredom might be the best gift you ever give your kid.",
};
