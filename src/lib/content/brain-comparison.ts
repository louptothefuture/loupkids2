export type BrainFact = {
  id: string;
  label: string;
  body: string;
  source: string;
};

export const BRAIN_COMPARISON = {
  eyebrow: "What happens to their brain",
  headline: "Screen time vs. real conversation",
  subline:
    "Staring at a screen is solitary and overstimulating. Talking — voices, turns, real back-and-forth — builds focus, creativity, and independence.",
  screen: {
    title: "Looking at a screen",
    intro: "Solitary, visual, and highly stimulating.",
    facts: [
      {
        id: "dopamine",
        label: "Reward loops",
        body: "Notifications and scrolling fire dopamine pathways — the brain learns to expect quick, constant novelty.",
        source: "YouTube · CNN",
      },
      {
        id: "attention",
        label: "Focus limits",
        body: "Screens train continuous partial attention — scanning for the next hit instead of deep focus.",
        source: "Stanford Lifestyle Medicine",
      },
      {
        id: "melatonin",
        label: "Melatonin drop",
        body: "Backlit blue light tricks the brain into daytime mode, suppressing melatonin and disrupting sleep.",
        source: "YouTube · CNN",
      },
      {
        id: "white-matter",
        label: "White matter",
        body: "Heavy screen time can reduce white matter — the myelin coating that helps nerves signal quickly.",
        source: "PubMed Central",
      },
    ],
  },
  inPerson: {
    title: "Just talking",
    intro: "Voice, turn-taking, and the room to invent — no feed required.",
    facts: [
      {
        id: "spontaneity",
        label: "Spontaneity",
        body: "Unscripted back-and-forth is live improvisation — kids hold an idea, wait their turn, and pivot. No feed to finish the sentence for them.",
        source: "MIT · Harvard",
      },
      {
        id: "creativity",
        label: "Creativity",
        body: "Talking leaves gaps. Gaps are where imagination starts — stories, plans, jokes — instead of another scroll filling the silence.",
        source: "Review of Education",
      },
      {
        id: "independence",
        label: "Independence",
        body: "A call they start themselves builds agency: reach their people, solve a small problem, come home — without an algorithm deciding what happens next.",
        source: "Stanford Lifestyle Medicine",
      },
      {
        id: "tuned-in",
        label: "Fully tuned in",
        body: "Voice-only conversation pulls attention into one thread — laughs, pauses, tone — not a second screen competing for the next hit.",
        source: "Stanford Lifestyle Medicine",
      },
    ],
  },
  bridge: {
    headline: "LOUP keeps the conversation. Drops the loop.",
    body: "Voice-only, parent-approved contacts — connection without the feed.",
  },
} as const;
