import type { Post } from "./types";

const p = (text: string) => ({ kind: "p" as const, text });
const h2 = (text: string) => ({ kind: "h2" as const, text });

const AUTHOR = { name: "Thomas O'Connell", role: "Founder" };
const CATEGORY = { title: "Journal", slug: "journal" };

/** Topic tags for journal filtering — not separate CMS categories yet */
export const LOUPKIDS_JOURNAL_TOPICS: Record<string, string> = {
  "the-pickup-paradox-why-100-skims-are-more-dangerous-than-one-movie": "Screen time",
  "why-spontaneous-talk-is-the-ultimate-brain-food-for-kids": "Development",
  "wait-until-8th-and-the-strategy-of-collective-bargaining": "Strategy",
  "the-tactical-surrender-of-the-middle-school-smartphone": "Strategy",
  "the-parental-control-myth": "Screen time",
  "why-your-kid-needs-a-paper-phone-e-ink-vs-oled-the-anti-lilypad-guide": "Product",
  "navigating-the-no-mans-land-of-parenting": "Parenting",
  "boring-tech-can-be-anything-but": "Product",
  "the-borrowed-childhood": "Screen time",
};

export const LOUPKIDS_JOURNAL_TOPIC_FILTERS = [
  "All",
  "Screen time",
  "Parenting",
  "Strategy",
  "Product",
  "Development",
] as const;

const COVERS = [
  "/images/lifestyle/kids-stoop.jpg",
  "/images/lifestyle/two-girls-room.jpg",
  "/images/lifestyle/boy-bedroom.jpg",
  "/images/street/two-kids-hi.jpg",
  "/images/lifestyle/kid-tent.jpg",
  "/images/lifestyle/kids-ambient.jpg",
  "/images/product/loup-three-quarter.jpg",
  "/images/product/loup-red-front.jpg",
  "/images/lifestyle/kids-ambient.jpg",
];

/** Journal articles sourced from loupkids.com/journal */
export const LOUPKIDS_JOURNAL_POSTS: Post[] = [
  {
    slug: "the-pickup-paradox-why-100-skims-are-more-dangerous-than-one-movie",
    title: "The Pickup Paradox: Why 100 Skims are More Dangerous Than One Movie",
    excerpt:
      "We've been fighting a war over total screen time for a decade, but 2026 data reveals we've been looking at the wrong number. It's not how long they stay on — it's how often they return.",
    publishedAt: "2026-04-06",
    author: AUTHOR,
    category: CATEGORY,
    coverImage: COVERS[0],
    relatedSlugs: ["why-spontaneous-talk-is-the-ultimate-brain-food-for-kids", "the-borrowed-childhood"],
    seoTitle: "The Pickup Paradox — Why Skimming Beats Total Screen Time",
    seoDescription:
      "Why 'The Twitch' — the impulsive act of picking up a device — is the true thief of childhood focus, and how boring tech helps parents reclaim depth.",
    body: {
      source: "plain",
      blocks: [
        p(
          "For years, we've used the wrong ruler to measure our kids' digital health. We've focused on total time, assuming that a two-hour limit was a sufficient guardrail. But new research from early 2026 suggests we've been ignoring a much more corrosive force: the skim.",
        ),
        h2("What is the skim?"),
        p(
          "The skim is not just a way of reading — it is a mode of being. It is the serial habit of flitting from paragraph to paragraph, app to app, and video to video. Unlike deep reading or focused play, the skim is a one-way street of shallow hits.",
        ),
        p(
          "On a smartphone, the skim conflates totally disparate information — a tragic news headline, a viral dance, a text from a parent — into a single, shallow stream. Neuroscience experts warn that this brisk, skimming habit leads to an atrophy of critical analysis and a literal erosion of empathy.",
        ),
        h2("The skim vs. total time"),
        p(
          "Total time is a measure of quantity. The skim is a measure of quality. A child could spend three hours skimming — checking notifications, scrolling 15-second clips, and responding to group chats — and leave in a state of high-frequency fragmentation. The total time is identical to three hours deeply immersed in a single complex game, but the neurological outcome is worlds apart.",
        ),
        h2("Breaking the surface"),
        p(
          "Standard parental controls are built to fight total time. They act as a timer, but they do nothing to address the mode of consumption. By removing the notification casino and the infinite-scroll architecture, LOUP forces the device to be a tool for purpose, not a stream for skimming.",
        ),
        p("It's time to stop counting minutes and start protecting depth. The skim is the thief. LOUP is the guard."),
      ],
    },
  },
  {
    slug: "why-spontaneous-talk-is-the-ultimate-brain-food-for-kids",
    title: "Why Spontaneous Talk is the Ultimate Brain Food for Kids",
    excerpt:
      "Beyond screen-time limits: why the conversational bridge is critical for child development. MIT and Harvard-backed science on unscripted back-and-forth talk.",
    publishedAt: "2026-04-03",
    author: AUTHOR,
    category: CATEGORY,
    coverImage: COVERS[1],
    relatedSlugs: ["the-pickup-paradox-why-100-skims-are-more-dangerous-than-one-movie", "the-borrowed-childhood"],
    seoTitle: "Why Spontaneous Talk Is Brain Food for Kids",
    seoDescription:
      "The science proving that unscripted back-and-forth talk — not apps — is the key to cognitive growth and emotional resilience.",
    body: {
      source: "plain",
      blocks: [
        p(
          "We spend a lot of time obsessing over milestones: when did they walk, how many words do they know. But there is a silent metric that often carries more clinical weight than any flashcard: spontaneous conversation.",
        ),
        p(
          "We aren't talking about directives or reporting. We're talking about the unscripted, meandering, why-is-the-moon-following-us kind of talk. In clinical circles, this back-and-forth is known as the conversational bridge.",
        ),
        h2("The neuroplasticity of the back-and-forth"),
        p(
          "A landmark study from MIT and Harvard proved that it isn't just the number of words a child hears that matters, but the number of conversational turns. Every time a child waits for a response, processes it, and pivots their thought, they are performing a high-level brain workout.",
        ),
        h2("Executive function in live theater"),
        p(
          "Spontaneous conversation is the live theater of executive function. A child has to hold an idea while the other person speaks, wait their turn, and change their topic based on new information. When they are staring at a screen, these functions are largely dormant.",
        ),
        h2("Protect the open air"),
        p(
          "Spontaneous talk usually happens in the in-between moments — the car ride, the grocery line, the quiet fifteen minutes before bed. When we fill those gaps with digital noise, we aren't just keeping them busy; we are cutting the conversational bridge.",
        ),
        p("The most advanced piece of technology in your child's life is their own voice. Let's make sure they get the chance to use it."),
      ],
    },
  },
  {
    slug: "wait-until-8th-and-the-strategy-of-collective-bargaining",
    title: '"Wait Until 8th" and the Strategy of Collective Bargaining',
    excerpt:
      "The Wait Until 8th pledge is a masterclass in collective bargaining. But subtracting a smartphone without substituting a real-world tool sets parents up to fail.",
    publishedAt: "2026-03-31",
    author: AUTHOR,
    category: CATEGORY,
    coverImage: COVERS[2],
    relatedSlugs: ["the-tactical-surrender-of-the-middle-school-smartphone", "navigating-the-no-mans-land-of-parenting"],
    seoTitle: "Wait Until 8th and Collective Bargaining for Parents",
    seoDescription:
      "How to execute the Wait Until 8th boundary without leaving your kid disconnected — substitution, not just subtraction.",
    body: {
      source: "plain",
      blocks: [
        p(
          "Enter the Wait Until 8th pledge. To outsiders, it looks like parents trying to force an analog childhood in a digital world. But mechanically, it's much smarter than that. It's a strategic realignment.",
        ),
        p(
          "The pledge doesn't activate for your child's grade until ten families sign on. It relies on collective bargaining, not individual willpower. Suddenly, the everyone else has one argument collapses because you've created a voting bloc of kids who are entirely offline.",
        ),
        h2("Subtraction without substitution fails"),
        p(
          "Parents latch onto the pledge thinking that the absence of a phone is the entire strategy. They treat it as subtraction without substitution. If you remove the digital third space, you have to put in the work to facilitate physical ones.",
        ),
        p(
          "Keeping kids off smartphones isn't an isolated effort; it has to be a systemic one. Without practical consideration for how to execute that boundary, it's just a performative signature.",
        ),
      ],
    },
  },
  {
    slug: "the-tactical-surrender-of-the-middle-school-smartphone",
    title: "The Tactical Surrender of the Middle School Smartphone",
    excerpt:
      "Giving a middle schooler a smartphone is rarely a strategic parenting decision — it's a tactical surrender. Here's how the panic became the default path of least resistance.",
    publishedAt: "2026-03-31",
    author: AUTHOR,
    category: CATEGORY,
    coverImage: COVERS[3],
    relatedSlugs: ["wait-until-8th-and-the-strategy-of-collective-bargaining", "the-parental-control-myth"],
    seoTitle: "The Tactical Surrender of the Middle School Smartphone",
    seoDescription:
      "Why handing a ten-year-old unrestricted internet access feels mandatory — and why parents are losing leverage to the algorithm.",
    body: {
      source: "plain",
      blocks: [
        p(
          "How did we get to the point where handing a ten-year-old unrestricted access to the internet feels like a mandatory milestone? Partly because giving a kid a smartphone is no longer treated as a strategic parenting decision. It's a tactical surrender.",
        ),
        p(
          "It has become the default path of least resistance, adopted primarily because the alternative feels socially unsurvivable. A smartphone has extrinsic convenience — it tracks them at practice, it keeps them quiet in the backseat — but it fails to be evaluated for its intrinsic damage.",
        ),
        h2("When you're the only parent saying no"),
        p(
          "When you are the only parent saying no, you are fighting a localized war of attrition you are mathematically guaranteed to lose. You are an isolated holdout in a market that has already moved on. It's the parent's no not being as mighty as the algorithm.",
        ),
        p("But the market is shifting. There is a strategic realignment happening if you know where to look. We just have to rethink how we negotiate."),
      ],
    },
  },
  {
    slug: "the-parental-control-myth",
    title: "The Parental Control Myth",
    excerpt:
      "Why parental controls don't work and how the LOUP phone gives kids real independence without GPS tracking or screen addiction.",
    publishedAt: "2026-03-24",
    author: AUTHOR,
    category: CATEGORY,
    coverImage: COVERS[4],
    relatedSlugs: ["boring-tech-can-be-anything-but", "the-tactical-surrender-of-the-middle-school-smartphone"],
    seoTitle: "The Parental Control Myth — Why App Limits Fail",
    seoDescription:
      "Kids bypass parental controls. LOUP ends the cat-and-mouse game by removing what there is to hack.",
    body: {
      source: "plain",
      blocks: [
        p(
          "Ask any parent of a ten-year-old about screen time settings or app limits, and you'll get a weary sigh. We spend hours fine-tuning restrictions. We think we've built a digital fortress. We haven't. We've just given our kids a puzzle to solve.",
        ),
        h2("The cat-and-mouse game"),
        p(
          "Kids are digital natives. If there is a workaround, a hidden guest mode, or a YouTube hack, they will find it. When we give them a smartphone with parental controls, we aren't giving them a tool — we're giving them a challenge.",
        ),
        h2("The un-hackable phone"),
        p(
          "You can't bypass a screen that doesn't exist. You can't work around an algorithm that isn't there. LOUP replaces the instruction manual of a smartphone with the simple power of a dial tone. No GPS to trick. No apps to hack. Real trust.",
        ),
        p("No tracking. Just talking. Real freedom."),
      ],
    },
  },
  {
    slug: "why-your-kid-needs-a-paper-phone-e-ink-vs-oled-the-anti-lilypad-guide",
    title: 'Why Your Kid Needs a "Paper" Phone: E-Ink vs. OLED',
    excerpt:
      "OLED screens grab attention with aggressive light. E-Ink reflects ambient light like a physical book — connectivity without the brain-drain.",
    publishedAt: "2026-03-21",
    author: AUTHOR,
    category: CATEGORY,
    coverImage: COVERS[5],
    relatedSlugs: ["boring-tech-can-be-anything-but", "the-parental-control-myth"],
    seoTitle: "E-Ink vs OLED for Kids — The Anti-Lilypad Guide",
    seoDescription:
      "Why E-Ink contact strips provide the connectivity parents need without the dopamine loop of OLED screens.",
    body: {
      source: "plain",
      blocks: [
        p(
          "While OLED screens use aggressive, flickering light to grab a child's attention, E-Ink reflects ambient light like a physical book. It provides the connectivity parents need without the brain-drain or eye strain.",
        ),
        h2("Why OLED is built for the binge"),
        p(
          "OLED screens shoot light directly at your kid's eyes. High refresh rates and neon colors are basically dopamine injectors. It's why five more minutes turns into an hour. That blue light messes with melatonin.",
        ),
        h2("E-Ink: the toy-friendly screen"),
        p(
          "E-Ink uses the room's light. It doesn't glow at you. It uses tiny particles of actual ink to show text. If the room is dark, the screen is dark. Just like a book. Zero flicker. It's static. It's calm.",
        ),
        p(
          "When a kid uses a LOUP, the tech stays in its lane. It's there for a quick hey Mom, can I stay late — and then it goes right back into a pocket.",
        ),
      ],
    },
  },
  {
    slug: "navigating-the-no-mans-land-of-parenting",
    title: "Navigating the No-Man's Land of Parenting",
    excerpt:
      "Ages 8 to 12 are the no man's land of parenting. You need to reach them at soccer practice, but you don't want to hand them a digital casino.",
    publishedAt: "2026-03-09",
    author: AUTHOR,
    category: CATEGORY,
    coverImage: COVERS[6],
    relatedSlugs: ["boring-tech-can-be-anything-but", "the-borrowed-childhood"],
    seoTitle: "Navigating the No-Man's Land of Parenting (Ages 8–12)",
    seoDescription:
      "The third way between total isolation and total access — a bridge for the gap years when kids need connection without the feed.",
    body: {
      source: "plain",
      blocks: [
        p(
          "There's a weird, stressful window in every modern childhood. It's usually between ages 8 and 12. Your kid is old enough to walk to the park, stay late at practice, or go to a friend's house down the street. You need to be able to reach them. But you also know that handing them a smartphone is like handing them the keys to a Ferrari before they've learned to ride a bike.",
        ),
        h2("The false choice"),
        p(
          "Most parents feel like they have two options: the blackout — no tech at all, leaving you stressed and them isolated — or the all-in iPhone, where you spend Saturday nights playing digital detective.",
        ),
        h2("The third way"),
        p(
          "LOUP is the bridge for the gap years. It's for the parent who wants the safety of connection without the liability of the internet. They learn how to check in, how to handle a phone call, and how to respect quiet hours — all without the baggage of an algorithm.",
        ),
        p("Because giving them a way to call home is the first step toward giving them the freedom to roam."),
      ],
    },
  },
  {
    slug: "boring-tech-can-be-anything-but",
    title: "Boring Tech Can be Anything But",
    excerpt:
      "Most tech companies want to sell you engagement. We built a device that does exactly three things well and zero things that ruin your kid's brain.",
    publishedAt: "2026-03-09",
    author: AUTHOR,
    category: CATEGORY,
    coverImage: COVERS[7],
    relatedSlugs: ["the-borrowed-childhood", "the-parental-control-myth"],
    seoTitle: "Boring Tech Can Be Anything But — The LOUP Philosophy",
    seoDescription:
      "Why making a phone boring — no apps, no feeds, no infinite scroll — is the best thing we ever did for our kids.",
    body: {
      source: "plain",
      blocks: [
        p(
          "We are obsessed with smart. Smart watches, smart homes, smartphones. But for a kid trying to grow up, smart tech is actually a cage. It's a distraction machine that monitors their location and colonizes their attention.",
        ),
        p(
          "The most radical thing you can give a child today is something boring. LOUP is intentionally boring. It doesn't have a high-res screen. It doesn't have an App Store. It doesn't have a GPS chip. It just has a dial tone.",
        ),
        h2("Why boring is better"),
        p(
          "Boring tech stays in the pocket. When a device doesn't have an algorithm designed to hook your brain, you only use it when you actually need it. Boring tech builds trust — without a GPS map to watch, you have to talk to your kids. Boring tech is un-hackable.",
        ),
        p(
          "In a world screaming for their attention, the most powerful gift you can give them is the freedom to be bored — and the independence to figure out what to do next.",
        ),
      ],
    },
  },
  {
    slug: "the-borrowed-childhood",
    title: "The Borrowed Childhood",
    excerpt:
      "Childhood isn't disappearing all at once. It's being borrowed — minute by minute, notification by notification.",
    publishedAt: "2026-03-09",
    author: AUTHOR,
    category: CATEGORY,
    coverImage: COVERS[8],
    relatedSlugs: ["boring-tech-can-be-anything-but", "the-pickup-paradox-why-100-skims-are-more-dangerous-than-one-movie"],
    seoTitle: "The Borrowed Childhood — Fighting for the Gap Years",
    seoDescription:
      "Why we're fighting for the minutes of childhood before algorithms engineer them away — and why boredom might be the best gift you ever give your kid.",
    body: {
      source: "plain",
      blocks: [
        p(
          "Every time you see a kid at a restaurant — neck bent, eyes glazed over by a YouTube unboxing video — you aren't looking at a tech-savvy child. You're looking at a hostage.",
        ),
        p(
          "When we say childhood is being borrowed, we mean it literally. These apps aren't free. They're paid for with the only currency your kid actually has: minutes.",
        ),
        h2("The 7-hour heist"),
        p(
          "The average kid 8–18 is burning 7.5 hours a day on a screen. That's a full-time job with overtime. By the time they hit 18, they've spent a decade's worth of waking hours staring at a glass rectangle.",
        ),
        h2("Boredom is the secret sauce"),
        p(
          "Boredom is the engine of every creative agency, every startup, and every masterpiece ever built. When you kill boredom with an algorithm, you kill the what if. If there's always a feed to scroll, the what if never happens.",
        ),
        h2("This is a boundary, not a cage"),
        p(
          "LOUP isn't about restriction; it's about protection. It's about giving them the freedom to roam the neighborhood without giving them a direct pipeline to the darkest corners of the internet. We're fighting for the minutes. Because once those minutes are gone, you don't get a refund.",
        ),
      ],
    },
  },
];
