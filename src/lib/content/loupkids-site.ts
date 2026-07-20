/** Media map — curated renders + lifestyle from Loup Assets */

const L = (file: string) => `/images/loupkids/${file}`;
const R = (file: string) => `/images/renders/${file}`;
const N = (file: string) => `/images/lifestyle-new/${file}`;

export const LOUPKIDS_IMAGES = {
  hero: N("hand-holding-hi.jpg"),
  heroKitchen: N("girl-kitchen.jpg"),
  sweater: L("sweater.png"),
  whiteBag: L("white+bag+phone.png"),
  squeezeGif: L("squeeze+load.gif"),
  kidBw: N("kid-bw.jpg"),
  kidsPhonesLine: N("kids-phones-line.jpg"),
  kidsPhonesTout: L("kids-on-phones-tout-2-032724-383a248fa70e473eaab4fc83db6f269c.jpg"),
  kidSmile: N("kid-smile.jpg"),
  appUx: L("app+ux+2+.gif"),
  friends: L("friends.png"),
  panda: L("panda.png"),
  gymnastics: L("gymnastics.png"),
  baseball: L("baseball.png"),
  palmTrees: L("palm+trees.png"),
  purple: L("purple+pattern.png"),
  // lifestyle
  boyHolding: N("boy-holding.jpg"),
  boyBeanbag: N("boy-beanbag.jpg"),
  handHoldingHi: N("hand-holding-hi.jpg"),
  phoneOnBooks: N("phone-on-books.jpg"),
  bagPocket: N("bag-pocket.jpg"),
  backpack: N("o.jpg"),
  deskLoop: N("p.jpg"),
  kidsStoop: N("kids-stoop.jpg"),
  kidTent: N("kid-tent.jpg"),
  teenKitchen: N("teen-kitchen.jpg"),
  kidOutside: N("kid-outside.jpg"),
  twoKids: N("two-kids.jpg"),
  teenHoldout: N("teen-holdout.jpg"),
  phoneInHand: N("phone-in-hand.jpg"),
  phoneSweatshirt: N("phone-sweatshirt.jpg"),
  phoneBed: N("phone-bed.jpg"),
  phoneSitting: N("phone-sitting.jpg"),
  phonePropped: N("phone-propped.jpg"),
  girlStairs: N("girl-stairs.jpg"),
  backHeldOut: N("back-held-out.jpg"),
  adultHand: N("adult-hand.jpg"),
  handHeld: N("hand-held.jpg"),
  productHiFace: N("k.jpg"),
  // product renders
  reserve: R("d.jpg"),
  loup31: L("Autism+awareness+blue+2.png"),
  loupBlack: L("black+just+loup.png"),
  loupRed: L("red+just+loup.png"),
  loupAluminium: R("shop/a_4.jpg"),
  threeQuarter: R("shop/a_9.jpg"),
  productBack: R("shop/a_8.jpg"),
  productHi: R("shop/a_10.jpg"),
  cutoutPhone: R("cutout-phone.jpg"),
  // ode
  familyMovie: L("family+watching+movie+.png"),
  laptop: L("laptop.png"),
} as const;

export const LOUPKIDS_VIDEOS = {
  cutoutPhone: "/videos/cutout-phone.mp4",
  screen: "/videos/screen.mp4",
  uxDemo: "/videos/ux-demo.mp4",
  colorSlide: "/videos/color-slide.mp4",
  background: "/videos/background.mp4",
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
  "white-tactile-neurodivergence-and-hard-of-sight":
    "/images/lifestyle-new/hand-holding-hi.jpg",
  "the-public-health-crisis-hiding-in-our-pockets":
    "/images/lifestyle-new/kids-phones-line.jpg",
  "the-problem-with-locking-down-a-smartphone":
    "/images/loupkids/journal/the-problem-with-locking-down-a-smartphone.jpg",
  "the-age-kids-should-get-their-first-phone":
    "/images/loupkids/journal/the-age-kids-should-get-their-first-phone.jpg",
  "i-just-need-a-break-which-is-why-i-give-my-kid-a-phone":
    "/images/loupkids/journal/i-just-need-a-break-which-is-why-i-give-my-kid-a-phone.jpg",
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
  { src: LOUPKIDS_IMAGES.productHiFace, alt: "Loup showing hi." },
  { src: LOUPKIDS_IMAGES.backpack, alt: "Loup in a backpack pocket" },
  { src: LOUPKIDS_IMAGES.deskLoop, alt: "Loup on a kid desk" },
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

/** Gallery — unique shots only (no hero / use-case dupes on the same page) */
export const LOUPKIDS_GALLERY = [
  { src: LOUPKIDS_IMAGES.girlStairs, alt: "Kid on the stairs with Loup" },
  { src: LOUPKIDS_IMAGES.backpack, alt: "Loup in a backpack pocket" },
  { src: LOUPKIDS_IMAGES.phoneOnBooks, alt: "Loup resting on books" },
  { src: LOUPKIDS_IMAGES.deskLoop, alt: "Loup on a desk beside a laptop" },
  { src: LOUPKIDS_IMAGES.kidSmile, alt: "Kid smiling with Loup" },
  { src: LOUPKIDS_IMAGES.bagPocket, alt: "Loup tucked in a bag pocket" },
  { src: LOUPKIDS_IMAGES.threeQuarter, alt: "Loup three-quarter product view" },
  { src: LOUPKIDS_IMAGES.productHiFace, alt: "Loup front — hi." },
] as const;

export const LOUPKIDS_USE_CASES = [
  {
    id: "parents",
    label: "Parents",
    headline: "Give them independence without the internet.",
    body: "Approved contacts only. Quiet hours you control. A device with nothing to scroll — just voices you trust. Pair, approve, and set windows from the parent app.",
    image: LOUPKIDS_IMAGES.boyBeanbag,
    alt: "Kid on a call from the beanbag — real life, no feed",
  },
  {
    id: "kids",
    label: "Kids",
    headline: "This one's yours.",
    body: "Not a baby phone. Yours. Real calls to your people — no apps, no weird internet stuff.",
    uses: ["Do homework together", "Plan your weekend", "Catch up with friends", "Make it yours"],
    image: LOUPKIDS_IMAGES.boyHolding,
    alt: "Kid holding Loup",
  },
  {
    id: "community",
    label: "Community",
    headline: "Communities benefit from their own closed loop.",
    body: "Church groups, homeschool networks, and sports teams stay connected on their terms — without group chats or open phone numbers. For bulk pricing, email hi@loupkids.com.",
    image: LOUPKIDS_IMAGES.kidsStoop,
    alt: "Kids together with Loup",
  },
] as const;

export const LOUPKIDS_COMPANION = {
  headline: "Companion App Features",
  items: LOUPKIDS_ACCORDION,
};

export const LOUPKIDS_CUSTOMIZE = {
  headline: "Show what you're into",
  body: "Swap the plates. Pick a vibe. Patterns and customs — coming soon.",
  badge: "Coming soon",
  plates: [
    { src: "/images/plates/bffs.png", alt: "BFFs back plate" },
    { src: "/images/plates/kitty.png", alt: "Kitty back plate" },
    { src: "/images/plates/make-it-your-own.png", alt: "Make it your own back plate" },
    { src: "/images/plates/messi.png", alt: "Messi back plate" },
    { src: "/images/plates/ohtani.png", alt: "Ohtani back plate" },
    { src: "/images/plates/panda.png", alt: "Panda back plate" },
    { src: "/images/plates/peachy.png", alt: "Peachy back plate" },
    { src: "/images/plates/pup.png", alt: "Pup back plate" },
    { src: "/images/plates/school.png", alt: "School back plate" },
  ],
} as const;

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
    "We've become convinced this is a public health crisis. Not a parenting vibe. Not a culture-war slogan. A population-level exposure — anxiety, sleep loss, attentional fragmentation — scaled by devices designed to keep kids coming back. One day we will look back on heavy childhood screen usage the way we look at smoking now: something we normalized, marketed as normal, and only later admitted was a dose problem we failed to protect kids from.",
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
  image: LOUPKIDS_IMAGES.familyMovie,
  imageAlt: "A family watching a movie together at home",
};

export type LoupkidsFaqAnswer =
  | string
  | { paragraphs: string[]; bullets?: string[]; paragraphs2?: string[] };

export const LOUPKIDS_FAQ: { q: string; a: LoupkidsFaqAnswer }[] = [
  {
    q: "What is Loup?",
    a: "The Loup is a screenless, voice-based communication device designed specifically for kids. It is built for simple, safe connection with friends and family without the distractions and dangers of smartphones",
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
        "Loup-to-Loup is always free, as are calls from parents to their kid's Loup. We offer competitive plans to make and receive calls to external numbers too.",
        "If you're looking for more—unlimited contacts, make and receive calls from external phone numbers (\"hi mom, no I haven't cleaned my room yet, but I will\"), and the ability to page your kids for dinner—plans start at $10/month, which undercuts many alternatives by at least half.",
      ],
    },
  },
  {
    q: "Is LOUP more expensive than other kids phones?",
    a: {
      paragraphs: [
        "Some, yes. Less than others. Here's the honest comparison:",
        "Most kids phones in this category lock you into a carrier plan — $20–40/month on top of the device. LOUP runs on Wi-Fi. No SIM, no carrier, no monthly bill unless you want external calling (that's $10/month, cancel anytime). Over two years, LOUP typically costs less than the \"cheaper\" alternatives.",
        "What you're also getting: aluminum construction built to last, a closed network we run ourselves (your family's data stays yours), and a device designed to look like something a kid actually wants to carry — not a plastic toy or a locked-down hand-me-down.",
        "We built LOUP because we couldn't find anything we'd actually want our own kid to have. The price reflects that.",
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
    q: "How is LOUP different from just getting a landline?",
    a: {
      paragraphs: [
        "A landline keeps your kid connected to a wall. LOUP keeps them connected to you.",
        "There's a reason kids stopped using landlines — they're tethered, fixed, and useless the moment your kid walks out the door. Creativity, independence, and real childhood happen outside. In the backyard. At a friend's house. At the park. A device that only works in the kitchen isn't a solution — it's a compromise.",
        "LOUP goes where your kid goes. It fits in a pocket, clips to a backpack, and works on any Wi-Fi network — home, school, a grandparent's house. The freedom to roam is the whole point. We didn't build a smarter landline. We built the phone that comes before the smartphone.",
      ],
    },
  },
  {
    q: "If it's screenless, why does it have any interface at all?",
    a: {
      paragraphs: [
        "Because the alternative is a printer.",
        "Some devices in this space ask you to physically print out a sheet of numbers and tape it to the keypad so your kid knows who they're calling. We wish we were joking. That's not a product — that's a workaround.",
        "Kids need a contact list they can actually navigate. LOUP's e-ink display is the size of a name tag and uses less power than a wall clock. It shows your kid exactly who they're calling — a name, not a number — scrolled through with a single dial. No apps. No browser. No rabbit holes. Just a rolling list of the people they're allowed to reach.",
        "We didn't add a screen. We added a rolodex.",
      ],
    },
  },
  {
    q: "Can my child customize their Loup?",
    a: "Yes — the back plate is removable and customizable. Patterns and customs are coming after launch; Silver ships first.",
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
  headline: "Pre-order Loup",
  subheadline: "Aluminum sides & buttons, ABS front — $129 pre-launch, $169 at launch. Ships October 2026.",
  sectionLabel: "Store",
  footerCta: "Have Questions?",
};

export const LOUPKIDS_STORE_PRODUCTS = [
  {
    title: "Loup — Silver",
    price: 129,
    compareAt: 169 as number | null,
    note: "Pre-order · Ships October 2026",
    image: LOUPKIDS_IMAGES.loupAluminium,
    href: "/shop/loup",
    sizes: [] as string[],
  },
] as const;

export const LOUPKIDS_SPECS = [
  { group: "Hardware", label: "Body", value: "Aluminum sides & buttons · ABS front, silver" },
  { group: "Hardware", label: "Back plate", value: "Removable / customizable (patterns after launch)" },
  { group: "Hardware", label: "Display", value: "E-ink contact strip (no glow, no video, no apps)" },
  { group: "Hardware", label: "Controls", value: "Side scroll dial + call bar + mute button + volume rocker" },
  { group: "Hardware", label: "Speaker & Mic", value: "Full-range speaker, dual noise-cancelling mics" },
  { group: "Hardware", label: "Durability", value: "IP54 splash resistant, drop-tested to 2 meters" },
  { group: "Hardware", label: "Size & Weight", value: '4.3" × 2.6" × 0.5" — 118 g' },
  { group: "Battery & Charging", label: "Battery", value: "Rechargeable and replaceable" },
  { group: "Battery & Charging", label: "Battery life", value: "5 days typical use" },
  { group: "Battery & Charging", label: "Charging", value: "USB-C, 0–100% in 70 minutes" },
  { group: "Calling", label: "LOUP to LOUP", value: "Free forever, unlimited" },
  { group: "Calling", label: "Real phone numbers", value: "$10/month, unlimited US & Canada, cancel anytime" },
  { group: "Calling", label: "Contacts", value: "Parent-approved list; Loup-to-Loup and parent-to-kid free" },
  { group: "Calling", label: "Connectivity", value: "Wi-Fi only — no SIM card, no cellular bill" },
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
      values: ["$0 Loup-to-Loup", "Cellular plan required", "Cellular plan required", "Cellular plan required"],
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
    { label: "Battery", values: ["Rechargeable & replaceable · 5 days", "Glued-in · 1 day", "1 day (less if used)", "2–3 days"] },
    {
      label: "Survives being a kid's",
      values: ["Built for it", "Add a $60 case & pray", "Mostly", "It's disposable"],
    },
    { label: "Price", values: ["$129", "$400–1,200", "$150–400 + plan", "$40–100"] },
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
  "white-tactile-neurodivergence-and-hard-of-sight":
    "E-ink, high-contrast white faces, and physical dials aren't aesthetic flourishes. For neurodivergent kids and kids who are hard of sight, they're the difference between a usable phone and another glowing trap — and why the anti-screen movement must design for additional assistance, not around it.",
  "the-public-health-crisis-hiding-in-our-pockets":
    "Anxiety, sleep loss, and attentional fragmentation aren't \"strict parenting\" preferences. Heavy childhood screen use is a public health problem — and one day we'll talk about it the way we talk about smoking.",
  "the-problem-with-locking-down-a-smartphone":
    "Parental controls for kids' phones sound responsible. In practice, a lobotomized smartphone is still a smartphone — app store, browser, and workarounds included. Here's why filters aren't a first phone.",
  "the-age-kids-should-get-their-first-phone":
    "There isn't one magic birthday. There's a readiness question: do they need to reach people — or are they ready for the open internet? How to decide without surrendering to \"everyone else has one.\"",
  "i-just-need-a-break-which-is-why-i-give-my-kid-a-phone":
    "It's 5:15 PM, you're exhausted, and the phone comes out. That guilt is real — and so is the hidden truth underneath it: you don't need to be their cruise director. Boredom is brain work.",
};
