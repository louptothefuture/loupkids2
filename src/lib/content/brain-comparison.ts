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
    "Staring at a screen is solitary and overstimulating. Talking in person builds empathy, focus, and real connection.",
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
    title: "Talking in person",
    intro: "Social bonding, deep listening, and physical cues.",
    facts: [
      {
        id: "synchrony",
        label: "Brain synchrony",
        body: "Neural activity aligns between two people — face-to-face creates 9× more cross-brain links than video chat.",
        source: "Neuroscience News",
      },
      {
        id: "social-reading",
        label: "Social reading",
        body: "The brain processes non-verbal cues — body language, eye contact, and vocal tone — in real time.",
        source: "Stanford Lifestyle Medicine",
      },
      {
        id: "mirror-neurons",
        label: "Mirror neurons",
        body: "Mirror neurons help us feel what another person feels — building empathy and trust.",
        source: "Neuroscience News",
      },
      {
        id: "arousal",
        label: "Arousal & engagement",
        body: "In-person talk raises heart rate, pupil size, and emotional arousal — conversations feel more vivid and real.",
        source: "Stanford Lifestyle Medicine",
      },
    ],
  },
  bridge: {
    headline: "LOUP keeps the conversation. Drops the loop.",
    body: "Voice-only, parent-approved contacts — connection without the feed.",
  },
} as const;
