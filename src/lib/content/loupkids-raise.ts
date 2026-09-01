/** Unlinked investor page — copy from the Aug 2026 pre-seed deck. Not in nav. */

export const RAISE_EMAIL = "thomas@loupkids.com";
export const RAISE_MAILTO =
  "mailto:thomas@loupkids.com?subject=Loup%20pre-seed%20%E2%80%94%20%24750K%20SAFE";

export const RAISE = {
  eyebrow: "Pre-seed · August 2026",
  headline: "Childhood, uninterrupted.",
  subline:
    "The screenless, parent-controlled first phone — WiFi voice, real hardware, live DTC. Raising $750K to manufacture v1 and scale.",
  proofLine: "Real hardware, not vapor.",
  cta: "Get the deck",
  ctaNote: "thomas@loupkids.com",
} as const;

export const RAISE_TERMS = {
  amount: "$750K",
  instrument: "SAFE (pre-seed)",
  cap: "$4M post-money",
  discount: "20%",
  items: [
    { label: "Raise", value: "$750K" },
    { label: "Instrument", value: "SAFE" },
    { label: "Cap", value: "$4M post" },
    { label: "Discount", value: "20%" },
  ],
} as const;

export const RAISE_STATS = [
  { stat: "$4B", label: "TAM — parents forced into smartphones with no screenless alternative" },
  { stat: "$3.17", label: "Cost per lead — 4× startup / 9× tech category benchmarks" },
  { stat: "30.4%", label: "Email click-through — 15× the tech-category standard" },
  { stat: "1 year", label: "In the making. Product in hand." },
] as const;

export const RAISE_ORIGIN = {
  eyebrow: "Why this exists",
  headline: "It began with my daughter.",
  paragraphs: [
    "She found an old '80s analog phone. Picking it up, she instantly started pretending to call people — telling stories into a static receiver.",
    "The game became real when we gave her walkie-talkies. She was immediately sharing secrets and silly stories with a friend down the street. Simple. Immediate. Real.",
    "The power of connection for kids isn't in the screen, the scroll, or the algorithm. It's in the simplicity of a voice and someone who picks up.",
    "We built the first phone designed for joyful, safe connection — not distraction.",
  ],
} as const;

export const RAISE_PROBLEM = {
  eyebrow: "The problem",
  headline: "Parents are forced into smartphones. The alternative does not exist.",
  opportunity: "$4B unmet need. Growing 7–18% a year.",
  opportunityNote: "School phone bans and youth digital-wellness regulation. No one owns it yet.",
  body: "80% of parents feel pushed to buy a smartphone too early — for safety, for school, for a ride home. No compelling screenless alternative exists. Demand isn't theoretical. Tin Can — a tethered landline — sold a million units in just over a year. The category is waiting for a real first phone.",
  proof:
    "Demand isn't theoretical. Tin Can — a tethered landline — sold a million units in just over a year. The category is waiting for a real first phone.",
  pillars: [
    {
      title: "Mental health is the stakes",
      body: "Early smartphone adoption is directly linked to childhood mental health decline. Parents want a safe on-ramp — something that keeps kids reachable without handing them a social media machine.",
    },
    {
      title: "The bans are real",
      body: "Australia and Utah have enacted strict youth smartphone rules. The Nordics, Spain, and the UK are evaluating nationwide school device bans. Regulation is moving faster than the market.",
    },
    {
      title: "Parents are organized",
      body: "The Anxious Generation movement is mobilizing millions of parent groups. Lesser alternatives sell out because nothing better exists. That's the shelf Loup belongs on.",
    },
  ],
} as const;

export const RAISE_MARKET = {
  eyebrow: "Market",
  headline: "Don't fight for scraps in smartphones. Own the category that doesn't exist yet.",
  left: {
    title: "Smartphone market",
    points: ["92% smartphone penetration", "3% CAGR", "Shrinking headroom", "Fighting for scraps"],
  },
  right: {
    title: "Screenless wellness",
    points: ["0% penetration today", "7–18% CAGR", "Expanding market", "Building a category"],
  },
  numbers: "$4B TAM · $45M SAM · 7–18% CAGR — and no one owns it yet.",
} as const;

export const RAISE_PRODUCT = {
  eyebrow: "The product",
  headline: "A voice device kids can own. A control layer parents trust.",
  body: "Loup gives kids a real device — something they hold, carry, and call their own. Screenless by design, not by subtraction: no feed, no browser, no algorithm. E-ink display, tactile scroll wheel, USB-C, mute, speaker, volume. Atkinson Hyperlegible type from the Braille Institute, because the interface is meant to be read, not stared at. WiFi voice in v1. Full cellular in v2.",
  features: [
    { title: "Screenless", lines: ["No feed.", "No browser.", "No algorithm."] },
    { title: "Parent-controlled", lines: ["App pairs over WiFi.", "You set contacts and hours."] },
    {
      title: "WiFi voice → Cellular",
      lines: ["Loup-to-Loup WiFi: free.", "External / cellular: $10–$20/mo.", "v2 adds cellular."],
    },
  ],
  steps: [
    {
      step: "01",
      title: "Parents pair and whitelist",
      body: "The companion app pairs over Wi-Fi. You set contacts and when the phone can be used.",
    },
    {
      step: "02",
      title: "Kids call their people",
      body: "Loup-to-Loup audio over WiFi is always free. External lines and cellular mobility are $10–$20/month.",
    },
    {
      step: "03",
      title: "Independence, without the internet",
      body: "Kids take ownership, stay in touch, and never get a feed, a game, or a stranger.",
    },
  ],
  access:
    "Screenless architecture removes the sensory chaos that overwhelms neurodivergent kids — no visual overstimulation, no notification anxiety, no design tricks engineered to hijack attention. For blind and low-vision users, Loup is built for them from the ground up, not retrofitted after the fact.",
} as const;

export const RAISE_COMPARE = {
  eyebrow: "Category",
  headline: "Everyone else is a smartphone with the apps removed. We never added them.",
  columns: ["Loup", "Gabb / TickTalk", "Dumb phone", "Landline / Tin Can"],
  rows: [
    ["Screenless architecture", "Yes", "No", "No", "Mixed"],
    ["Parent app & whitelisting", "Yes", "Yes", "No", "Mixed"],
    ["Local / mesh Wi-Fi voice (v1)", "Yes", "No", "No", "No"],
    ["Zero subscription lock-in", "Core free*", "Monthly required", "Contract", "Bill required"],
    ["Designed across ages", "Yes", "Kids only", "Adults only", "Young kids"],
  ],
  note: "*Loup-to-Loup WiFi audio is free. External lines and cellular mobility are $10–$20/month.",
} as const;

export const RAISE_TRACTION = {
  eyebrow: "Traction",
  headline: "Pre-launch. Already outperforming.",
  body: "Direct relationships with Wired, the Boston Globe, and parenting press. 5,000+ high-intent parent subscribers. PTA and school seeding already in motion. The site is live and taking early-bird pre-orders at $149.",
  latest: [
    { stat: "3.57%", label: "CTR — 7× startup / 2× tech" },
    { stat: "$3.17", label: "CPL — 4× / 9× better" },
    { stat: "30.39%", label: "Email CTR — 15× tech" },
  ],
  weeks: {
    headers: ["15 Dec", "22 Dec", "29 Dec", "5 Jan"],
    rows: [
      ["CTR", "3.99%", "3.79%", "4.27%", "3.57%"],
      ["Spent", "$1,536", "$432", "$1,216", "$1,044"],
      ["Leads", "62", "21", "284", "330"],
      ["CPL", "$24.79", "$20.57", "$4.28", "$3.17"],
      ["VIP deposits", "5", "7", "17", "25"],
      ["Email CTR", "9.63%", "7.61%", "21.80%", "30.39%"],
    ],
  },
} as const;

export const RAISE_ECONOMICS = {
  eyebrow: "Unit economics",
  headline: "Hardware that funds the brand. Subscriptions that fund the company.",
  cards: [
    {
      title: "Hardware (v1)",
      price: "$149 / $179 / $199",
      meta: "Early bird · Standard · Retail · ~60% gross margin",
      body: "Early bird $149. Standard $179. Late / retail $199. Landed COGS ~$50 — 60% buffer on a $38 base.",
    },
    {
      title: "Plates & accessories",
      price: "$20",
      meta: "COGS ~$1 · 95% gross margin",
      body: "Custom faceplates and accessories. Attach rate is the second revenue line on every device.",
    },
    {
      title: "Calling plans",
      price: "$10–$20/mo",
      meta: "Loup-to-Loup WiFi free · 90% gross margin on external",
      body: "Core Loup-to-Loup audio over WiFi is free. External lines and cellular mobility are $10–$20/month. Subscriptions overtake hardware in year 4.",
    },
  ],
} as const;

export const RAISE_FINANCIALS = {
  eyebrow: "Projections",
  headline: "EBITDA-positive from year one.",
  note: "Year 1 is the founding batch. All figures are projections.",
  headers: ["Year 1*", "Year 2", "Year 3", "Year 4", "Year 5"],
  rows: [
    ["Units", "20K", "100K", "250K", "375K", "563K"],
    ["Revenue", "$3.7M", "$30.1M", "$82.5M", "$140.9M", "$226.9M"],
    ["Gross margin", "55%", "60%", "60%", "56%", "55%"],
    ["EBITDA", "$888K", "$11.2M", "$31.8M", "$50.4M", "$79.0M"],
    ["EBITDA margin", "24%", "37%", "39%", "36%", "35%"],
    ["Active subs", "12K", "72K", "210K", "403K", "680K"],
    ["Subs % of rev", "28%", "41%", "45%", "51%", "53%"],
  ],
  highlights: [
    "EBITDA-positive from year one",
    "Unit economics strengthen over time",
    "Subscriptions overtake hardware in year 4",
  ],
} as const;

export const RAISE_GTM = {
  eyebrow: "Go-to-market",
  headline: "The launch engine is already running.",
  channels: [
    {
      title: "Owned community",
      body: "$3.17 CPL. 30.4% email CTR. 5,000+ high-intent parent emails ready for day-one conversion. Near-zero CAC drag on the first v1 batch.",
    },
    {
      title: "Earned media",
      body: "Direct relationships with Wired, the Boston Globe, and parenting press. Loup is already positioned at the center of the screen-free movement — not as a product story, as a cultural one.",
    },
    {
      title: "School seeding",
      body: "PTA associations, homeschool networks, and classroom pilots. Hyper-local word of mouth is the channel that actually moves a kids' phone. We're already in the room.",
    },
    {
      title: "Paid & local",
      body: "Programmatic against anti-screen parent cohorts. Mom-group workshops. Lookalikes built off the 5K subscriber file. Paid acquisition that gets cheaper as the brand builds.",
    },
  ],
} as const;

export const RAISE_ROADMAP = {
  eyebrow: "Roadmap",
  items: [
    {
      when: "Jun 2025 – Jul 2026",
      title: "Validation & R&D — done",
      body: "12 functional prototypes. Founders University. CTO hired. Firmware complete. Qual and quant testing complete.",
    },
    {
      when: "Aug 2026 — now",
      title: "$750K pre-seed",
      body: "DTC pre-sales live. Media and lead nurture scaling. Tooling and manufacturing setup.",
    },
    {
      when: "Oct 2026",
      title: "v1 delivery & growth",
      body: "First batch ships. Bulk / school wedge (North Carolina beachhead). Cellular v2 R&D begins.",
    },
  ],
} as const;

export const RAISE_TEAM = {
  eyebrow: "Team",
  headline: "Built by brand and tech veterans.",
  people: [
    { name: "Thomas O'Connell", role: "CEO + Founder" },
    { name: "Jon Sulkow", role: "Creative + UX — brand, graphic, interactive" },
    { name: "Romen Islam", role: "CTO — hardware, IoT, firmware" },
  ],
} as const;

export const RAISE_EXIT = {
  eyebrow: "Path to exit",
  headline: "A first-phone brand that strategics already need.",
  body: "Youth on-ramp devices sit on the roadmap at every major hardware platform. Apple, Google, and Samsung need a first-phone story. Family hardware ecosystems — Sonos, Bose, Logitech — need the wedge. Toy and entertainment companies — LEGO, Mattel, Hasbro, Disney — need the IP. Telcos building family plans and kid-tech roll-ups like Gabb and Relay need the brand. Amazon already sells the adjacent aisle.",
} as const;

export const RAISE_USE = {
  eyebrow: "Use of proceeds",
  headline: "$750K to build, ship, and scale the first phone kids can actually own.",
  splits: [
    { pct: "50%", title: "Product & manufacturing", body: "Tooling and first production batch. The hardware to actually ship." },
    { pct: "30%", title: "Go-to-market", body: "Media, paid acquisition, and the launch engine already proving out." },
    { pct: "20%", title: "Operations", body: "FCC approval, customer support, and the unglamorous work of shipping a real device." },
  ],
} as const;
