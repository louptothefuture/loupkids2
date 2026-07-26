/** Homepage 5-act narrative — keep soul, cut noise */

export const HOME_HERO = {
  headline: "Their first phone. Not their first feed.",
  subline: "Parent-approved Wi-Fi calling for kids. Zero apps, zero feeds, zero screen addiction.",
  incentivePill: "⚡ Includes 1 Year Free Unlimited Domestic Calling",
  trustLine: "Ships within 60 days. 30-day trial starts upon delivery.",
} as const;

export const HOME_TENSION = {
  header: "You aren't alone in feeling frustrated.",
  subhead: "8 out of 10 parents feel forced into the smartphone trap. Loup is the escape hatch.",
  metrics: [
    {
      stat: "46%",
      label: "Of teens report being online almost constantly.",
      cite: "Pew Research, 2024",
      citeHref:
        "https://www.pewresearch.org/internet/2024/12/12/teens-social-media-and-technology-2024/",
    },
    {
      stat: "5.5 hrs",
      label: "Daily average spent on entertainment screens by kids 8–12.",
    },
    {
      stat: "−25%",
      label: "Decline in unstructured real-world outdoor play.",
    },
  ],
} as const;

export const HOME_MANIFESTO = {
  lines: [
    "We didn't dumb down a smartphone.",
    "We didn't modernize a landline.",
    "We built a rolodex for the age of independence.",
  ],
} as const;

export const HOME_HOW_IT_WORKS = [
  {
    step: "1",
    title: "Approve trusted contacts",
    body: "Parents set up the people kids can call — in about 2 minutes.",
  },
  {
    step: "2",
    title: "Contacts sync over Wi-Fi",
    body: "The list lands on Loup automatically. No typing on the device.",
  },
  {
    step: "3",
    title: "Kids scroll and call",
    body: "Turn the wheel, pick a name, press to talk. That's the whole interface.",
  },
] as const;

export const HOME_PILLARS = [
  {
    title: "Tactile scroll wheel",
    body: "Physical control engineered for kids' hands — not a glass slab.",
  },
  {
    title: "E-paper display",
    body: "Zero dopamine backlights. High outdoor visibility. Zero entertainment screens.",
  },
  {
    title: "Wi-Fi voice network",
    body: "Crystal-clear calling at home, school, or on a parent mobile hotspot.",
  },
  {
    title: "In-home Pager Mode",
    body: "Instant family walkie-talkie over Wi-Fi — $0/mo forever.",
  },
] as const;

export const HOME_LAUNCH = {
  priceHeader: "$149 Launch Price",
  bonusBanner: "⚡ Included Bonus: 1 Year of Free Unlimited Domestic Calling ($120 Value)",
  bullets: [
    "Automatically unlocked with every $149 launch pre-order",
    "Loup-to-Loup calls & In-Home Pager Mode stay $0/mo forever",
    "No forced auto-renewals or hidden carrier fees",
  ],
  shipLine: "Ships within 60 days. 100% refundable anytime prior to dispatch.",
  trialLine: "30-Day Risk-Free Trial starts the day your Loup arrives.",
  e911:
    "Wi-Fi Voice Device: Operates over Wi-Fi and mobile hotspots. Does not support E911 cellular emergency dialing.",
} as const;
