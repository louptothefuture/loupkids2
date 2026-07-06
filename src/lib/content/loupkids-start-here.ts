export const LOUPKIDS_JOURNAL_INTRO = {
  eyebrow: "The journal",
  title: "Raising kids in the anti-screen age",
  description:
    "Research summaries without the panic, and playbooks that survive contact with real children.",
} as const;

/** Curated onboarding path from the Fable resource hub */
export const LOUPKIDS_START_HERE = {
  eyebrow: "Start here",
  title: "New to Loup?",
  description:
    "The shortest path from curious to confident — setup, support, and the article we send every parent first.",
  journalSlug: "the-pickup-paradox-why-100-skims-are-more-dangerous-than-one-movie",
  links: [
    {
      title: "Delaying the smartphone",
      href: "/help/delaying-the-smartphone",
      type: "Guide",
      description: "Hold the line without leaving your kid disconnected.",
    },
    {
      title: "Setup guide",
      href: "/setup",
      type: "Guide",
      description: "Box to first call in about ten minutes.",
    },
    {
      title: "Connect to Wi-Fi",
      href: "/help/setup-wifi",
      type: "Help",
      description: "Pair Loup to your home network in the parent app.",
    },
    {
      title: "Press & media kit",
      href: "/press",
      type: "Media",
      description: "Facts, quotes, imagery, and boilerplate for coverage.",
    },
  ],
} as const;
