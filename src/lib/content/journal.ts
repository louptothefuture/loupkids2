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
  "white-tactile-neurodivergence-and-hard-of-sight": "Accessibility",
  "the-public-health-crisis-hiding-in-our-pockets": "Screen time",
  "the-problem-with-locking-down-a-smartphone": "Screen time",
  "the-age-kids-should-get-their-first-phone": "Parenting",
  "i-just-need-a-break-which-is-why-i-give-my-kid-a-phone": "Parenting",
};

export const LOUPKIDS_JOURNAL_TOPIC_FILTERS = [
  "All",
  "Screen time",
  "Parenting",
  "Strategy",
  "Product",
  "Development",
  "Accessibility",
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
  {
    slug: "white-tactile-neurodivergence-and-hard-of-sight",
    title: "White, Tactile, and Built for Kids Who Need More Help — Not Less Noise",
    excerpt:
      "E-ink, high-contrast white faces, and physical dials aren't aesthetic flourishes. For neurodivergent kids and kids who are hard of sight, they're the difference between a usable phone and another glowing trap.",
    publishedAt: "2026-07-12",
    author: AUTHOR,
    category: CATEGORY,
    coverImage: "/images/lifestyle-new/hand-holding-hi.jpg",
    relatedSlugs: [
      "why-your-kid-needs-a-paper-phone-e-ink-vs-oled-the-anti-lilypad-guide",
      "the-public-health-crisis-hiding-in-our-pockets",
    ],
    seoTitle: "White Tactile Design for Neurodivergence & Hard of Sight",
    seoDescription:
      "Why anti-screen hardware — e-ink, white high-contrast faces, and tactile controls — aids neurodivergent kids and kids with low vision.",
    body: {
      source: "plain",
      blocks: [
        p(
          "Most \"kids' phones\" start from the same wrong assumption: that every child benefits from a bright glass rectangle, as long as you slap parental controls on top. That ignores an entire population of kids for whom the screen itself is the problem — not just the apps.",
        ),
        p(
          "Neurodivergent kids. Kids who are hard of sight. Kids with sensory processing differences who melt under notification light and infinite scroll. The anti-screen movement isn't only about \"less Instagram.\" At its best, it is about designing connection for people who need additional assistance — not designing around them.",
        ),
        h2("Why white and tactile matter"),
        p(
          "A white, matte face with a high-contrast e-ink strip is easier to read in hard light than a glossy OLED. Paper-like displays don't pulse, don't glow in a dark bedroom, and don't compete with the room for attention. For kids with low vision or light sensitivity, that difference is practical — not philosophical.",
        ),
        p(
          "Tactile controls — a knurled scroll dial, a physical call bar you can find by feel — are accessibility features. Eyes on the sidewalk. Eyes closed. Hands in a pocket. Motor planning that prefers click-detents over precise glass gestures. White space and raised controls aren't \"retro styling.\" They are a map your fingers can learn.",
        ),
        h2("Neurodivergence and the attention casino"),
        p(
          "For many ADHD and autistic kids, a smartphone is not a neutral tool. It is a casino floor: variable rewards, endless novelty, social pressure that never clocks out. Parental controls can mute an app. They cannot remove the architecture that was built to hijack attention.",
        ),
        p(
          "Voice-only hardware with a closed contact list removes the casino. What's left is the thing those kids often need most: a predictable way to reach the people they trust, without a feed waiting in the same device.",
        ),
        h2("Hard of sight is not an edge case"),
        p(
          "If your child is hard of sight — low vision, contrast sensitivity, photophobia — a modern phone UI is a maze of tiny type, animated chrome, and autoplaying video. An e-ink contact strip with large, stable text and a dial you can operate without staring is closer to how assistive tools actually work: fewer pixels, more certainty.",
        ),
        p(
          "We are not claiming Loup replaces clinical assistive technology. We are saying the default first phone should not make life harder for kids who already navigate extra friction every day.",
        ),
        h2("What the anti-screen movement owes them"),
        p(
          "Anti-screen advocacy that only talks about \"willpower\" and \"screen time limits\" leaves neurodivergent and low-vision kids behind. Limits assume a device that is basically fine if you use it less. Accessibility assumes a device that is usable when you need it — and quiet when you don't.",
        ),
        p(
          "That is why we built white, tactile, voice-first hardware. Connection for kids who need additional assistance should not require surviving another glowing rectangle. It should feel like a phone you can hold, find, and trust — with your eyes, or without them.",
        ),
      ],
    },
  },
  {
    slug: "the-public-health-crisis-hiding-in-our-pockets",
    title: "The Public Health Crisis Hiding in Our Pockets",
    excerpt:
      "Anxiety, sleep loss, attentional fragmentation, and social contagion aren't \"parenting vibes.\" Heavy childhood screen use is a public health problem — and one day we'll talk about it the way we talk about smoking.",
    publishedAt: "2026-07-12",
    author: AUTHOR,
    category: CATEGORY,
    coverImage: "/images/lifestyle-new/kids-phones-line.jpg",
    relatedSlugs: [
      "the-borrowed-childhood",
      "white-tactile-neurodivergence-and-hard-of-sight",
    ],
    seoTitle: "Childhood Screens Are a Public Health Crisis",
    seoDescription:
      "Why heavy childhood screen use belongs in the same conversation as other public health crises — and why we'll look back on it like smoking.",
    body: {
      source: "plain",
      blocks: [
        p(
          "We keep treating kids and smartphones like a lifestyle debate — as if the only question is whether parents are \"strict\" or \"chill.\" That framing is too small. What we are watching is a population-level shift in sleep, anxiety, attention, and social development. That is not a taste difference. That is public health.",
        ),
        h2("The symptoms are already population-scale"),
        p(
          "Teen anxiety and depression climbed in lockstep with smartphone ubiquity. Sleep got shorter and later. Free play shrank. Spontaneous talk — the conversational bridge that builds brains — got crowded out by skims and streaks. None of these trends needed a conspiracy theory. They needed a product category that put an always-on casino in every pocket.",
        ),
        p(
          "Public health crises are often invisible while they scale. Lead in paint looked like progress until it didn't. Smoking looked like adulthood until the data made denial impossible. Childhood screen exposure is in that awkward middle chapter — where the industry still sells \"connection,\" and families are left holding the bill in sleep and mood.",
        ),
        h2("We will look back on this like smoking"),
        p(
          "One day, \"I grew up with a phone in my hand from age nine\" will sound the way \"we smoked in the car with the kids\" sounds now: not evil in every individual case, but collective negligence we finally named. Heavy screen usage will be remembered as an exposure — something we normalized before we understood the dose.",
        ),
        p(
          "That does not mean every screen is poison. Movies together on a weekend are not the same as a feed engineered for infinite return. The crisis is the default: unsupervised, algorithmically amplified, all-day access during the years when attention and identity are still under construction.",
        ),
        h2("What a serious response looks like"),
        p(
          "A public health response is not a lecture. It is a change in the environment. Seatbelts. Smoke-free flights. Age gates that actually mean something. For kids, that means delaying the open internet phone — and offering a real substitute so \"wait\" is not the same as \"disconnected.\"",
        ),
        p(
          "Loup exists because we refuse the false choice between isolation and the feed. Voice. Approved contacts. No apps. Hardware that cannot become a slot machine. If this is a crisis, then boring tech is not nostalgia. It is harm reduction.",
        ),
        p(
          "We are not waiting for perfect consensus. We are building the off-ramp while the data is still catching up to what parents already feel in their houses at 10 p.m.",
        ),
      ],
    },
  },
  {
    slug: "the-problem-with-locking-down-a-smartphone",
    title: "The Problem With Locking Down a Smartphone",
    excerpt:
      "Parental controls for kids' phones sound responsible. In practice, a lobotomized smartphone is still a smartphone — app store, browser, and workarounds included. Here's why filters aren't a first phone.",
    publishedAt: "2026-07-13",
    author: AUTHOR,
    category: CATEGORY,
    coverImage:
      "/images/loupkids/journal/the-problem-with-locking-down-a-smartphone.jpg",
    relatedSlugs: [
      "the-parental-control-myth",
      "the-age-kids-should-get-their-first-phone",
    ],
    seoTitle: "Parental Controls for Kids' Phones Don't Fix Smartphones",
    seoDescription:
      "Why parental controls for kids' phones fail: a locked-down smartphone still has an app store, a browser, and workarounds. Start with the right device instead.",
    body: {
      source: "plain",
      blocks: [
        p(
          "Search \"parental controls for kids phone\" and you'll find an industry of settings, subscriptions, and screenshots of Screen Time menus. The pitch is comforting: keep the smartphone, subtract the danger. Approve apps. Cap minutes. Block Safari. Sleep Mode at nine.",
        ),
        p(
          "We've tried that path. A lobotomized smartphone is still a smartphone. The app store is still there. The browser is still there. And trust us — they always find a way around.",
        ),
        h2("Parental controls are a patch, not a product"),
        p(
          "Controls assume the device is basically fine if you manage it hard enough. That might be true for an adult phone with a few social apps. It is not true for a glass rectangle designed — from the silicon up — to maximize return visits. You are not configuring a tool. You are refereeing a casino.",
        ),
        p(
          "Every restriction creates a new game: guest modes, secondary browsers, \"educational\" apps that open YouTube, friends' phones, school Chromebooks, workarounds traded in group chats. Parents who \"win\" for a week are usually behind again by Friday. The labor never ends. The architecture does not change.",
        ),
        h2("You're paying for what you don't want"),
        p(
          "Even when the filters mostly hold, the economics are upside down. Storage for apps you'll never approve. A carrier plan for a device that shouldn't be browsing. Software subscriptions to police hardware you already own. You're managing restrictions forever instead of starting with the right device — and you're paying for the wrong category the whole time.",
        ),
        h2("Independence without the internet"),
        p(
          "Kids don't need less reachability. They need reachability that isn't welded to feeds, strangers, and infinite scroll. Voice. Approved contacts. Quiet hours you set once. Hardware that cannot become a second phone when the rules get boring.",
        ),
        p(
          "That is why we built Loup — not a stricter smartphone, but a different object. If your search history is full of parental-control tutorials, the problem isn't that you haven't found the perfect setting. It's that you're trying to sand down a product that was never meant to be a first phone.",
        ),
      ],
    },
  },
  {
    slug: "the-age-kids-should-get-their-first-phone",
    title: "The Age Kids Should Get Their First Phone",
    excerpt:
      "There isn't one magic birthday. There's a readiness question: do they need to reach people — or are they ready for the open internet? How to decide without surrendering to \"everyone else has one.\"",
    publishedAt: "2026-07-13",
    author: AUTHOR,
    category: CATEGORY,
    coverImage:
      "/images/loupkids/journal/the-age-kids-should-get-their-first-phone.jpg",
    relatedSlugs: [
      "wait-until-8th-and-the-strategy-of-collective-bargaining",
      "the-problem-with-locking-down-a-smartphone",
    ],
    seoTitle: "What Age Should Kids Get Their First Phone?",
    seoDescription:
      "When should kids get their first phone? Skip the magic birthday — focus on readiness, reachability, and why a screen-free first phone beats a locked-down smartphone.",
    body: {
      source: "plain",
      blocks: [
        p(
          "Parents ask the same question in every carpool: what age should kids get their first phone? Forums answer with a number — 10, 12, Wait Until 8th — as if childhood were a software release schedule. The number is the wrong unit. The better question is: what problem are you solving?",
        ),
        h2("Two different \"first phones\""),
        p(
          "One kind of first phone solves reachability: after practice, at a friend's house, walking home, paging them for dinner. The other kind unlocks the open internet: apps, browsers, group chats that never sleep, feeds engineered to keep them coming back. Those are not the same milestone. Treating them as one is how \"everyone else has one\" becomes a smartphone at nine.",
        ),
        p(
          "If the need is \"I need to reach my kid,\" you do not need an App Store. If the need is \"they want TikTok,\" that is a different conversation — and it probably shouldn't be answered with hardware that includes TikTok by default.",
        ),
        h2("Readiness signs that actually matter"),
        p(
          "Age is a crude proxy. Look instead for: can they keep a simple device charged and not lost? Do they follow agreed quiet hours without a weekly courtroom? Do they have people they need to call — not just people they want to scroll with? Are you ready to approve contacts and model the boundary with other parents?",
        ),
        p(
          "If the answer is mostly yes on reachability and mostly no on open-internet maturity, you are in the gap years: old enough to roam a little, too young for a pocket casino. That is exactly where a voice-first, parent-approved device belongs.",
        ),
        h2("Why \"later\" fails without a substitute"),
        p(
          "\"Wait Until 8th\" only works when \"wait\" isn't the same as \"disconnected.\" Isolated holdouts lose to social pressure. Collective delay works better — and so does a real substitute your kid can show their friends without feeling like they got a baby toy.",
        ),
        p(
          "Loup is built for that middle: connection without the feed. Not because every kid of a certain age \"deserves\" a phone — because the first phone should match the job. Reach people you trust. Come home. Grow up without borrowing childhood to an algorithm.",
        ),
        p(
          "So what age? The age when they need a line to their people — and you are ready to give them one that isn't also a portal to everything else.",
        ),
      ],
    },
  },
  {
    slug: "i-just-need-a-break-which-is-why-i-give-my-kid-a-phone",
    title: "I Just Need a Break, Which Is Why I Give My Kid a Phone to Play With",
    excerpt:
      "It's 5:15 PM, you're exhausted, and the phone comes out. That guilt is real — and so is the hidden truth underneath it: you don't need to be their cruise director. Boredom is brain work.",
    publishedAt: "2026-07-13",
    author: AUTHOR,
    category: CATEGORY,
    coverImage:
      "/images/loupkids/journal/i-just-need-a-break-which-is-why-i-give-my-kid-a-phone.jpg",
    relatedSlugs: [
      "why-spontaneous-talk-is-the-ultimate-brain-food-for-kids",
      "the-borrowed-childhood",
    ],
    seoTitle: "Why Giving Kids a Phone When You're Exhausted Isn't Failure",
    seoDescription:
      "Handing over your phone at 5:15 PM doesn't make you a bad parent. Why boredom builds brains — and how to stop being the cruise director.",
    body: {
      source: "plain",
      blocks: [
        p(
          "It's 5:15 PM. You've been answering questions, breaking up arguments, and managing emotions since 6:00 AM. You need to chop an onion for dinner, or maybe you just need ten uninterrupted minutes to sit in a quiet room and stare at the wall.",
        ),
        p("Your child wanders in, dragging their feet: \"I'm boooored.\""),
        p(
          "You know what you're \"supposed\" to do. You're supposed to set up a sensory bin, or suggest a craft, or send them out to explore nature. Instead, you reach into your pocket, hand over your phone, and say, \"Here. Just for a few minutes.\"",
        ),
        p("Cue the immediate, crushing wave of parenting guilt."),
        p(
          "If this sounds familiar, take a deep breath and let yourself off the hook. You are exhausted, and using a screen to buy yourself a moment of sanity is a valid survival tactic. But beneath that guilt is a fascinating, hidden truth that can actually take the pressure off both of you: You do not need to be their cruise director.",
        ),
        p(
          "In fact, stepping back and letting them be bored is one of the best things you can do for their developing brains.",
        ),
        h2("The \"Cruise Director\" Trap"),
        p(
          "Modern parenting comes with a heavy, unspoken rule: if your child is bored, you are failing.",
        ),
        p(
          "We have been conditioned to intervene at the first sign of under-stimulation. We overschedule their weekends, buy educational toys that light up and sing, and frantically Google \"activities for 5-year-olds\" the moment there's a lull in the day. We treat boredom like a problem that needs to be solved immediately.",
        ),
        p(
          "But when we constantly swoop in to rescue our kids from having nothing to do, we accidentally rob them of the space they need to figure out who they are.",
        ),
        h2("The Science: What Happens When Kids Are Bored"),
        p(
          "When you stop entertaining your child, their brain actually turns on.",
        ),
        p(
          "Neuroscientists refer to this as the Default Mode Network (DMN). The DMN is a collection of brain regions that activate specifically when we are not focused on an external task (like a screen or a structured game). It is the brain's internal workshop — the place where children process their experiences, imagine future scenarios, and build their sense of self.",
        ),
        p("The data strongly backs up the benefits of unstructured, under-stimulated time:"),
        p(
          "It builds emotional regulation: A 2024 study in the Journal of Experimental Child Psychology observed 130 children aged 4 to 6. The researchers found that kids who experience boredom and are allowed to navigate it on their own develop significantly stronger self-regulation and emotional control.",
        ),
        p(
          "It acts as a catalyst for creativity: A 2024 review published in the Review of Education found that boredom, when combined with low stimulation, is consistently associated with enhanced creative thinking.",
        ),
        p(
          "It sparks imagination: As Dr. Michael Rich, a pediatrician at Harvard Medical School, notes: \"Boredom is the space in which creativity and imagination happen.\"",
        ),
        p(
          "A bored child isn't an apathetic child. They are actively seeking meaning and purpose. If we constantly hand them a pre-packaged solution (a screen, a structured game, an outing), they never have to flex the mental muscles required to find that purpose themselves.",
        ),
        h2("Why Letting Them Be Bored Is So Agonizing"),
        p("If boredom is so great, why don't we do it more? Because the transition phase is awful."),
        p(
          "Before a child reaches that magical state of deep, independent play, they have to pass through the \"Whine Barrier.\" They will complain. They will follow you around. They will dramatically flop onto the floor and declare that they have absolutely nothing to play with, despite being surrounded by toys.",
        ),
        p(
          "It is loud, annoying, and deeply uncomfortable for us as parents. Learning to sit with the discomfort of having nothing to do is a skill, and like any skill, it takes practice.",
        ),
        h2("Tips for Embracing the \"Nothing\""),
        p(
          "You don't have to go cold turkey on screens or suddenly institute a 1980s-style \"go outside and don't come back until the streetlights come on\" policy. You can build their boredom tolerance gradually.",
        ),
        h2("1. Shift the responsibility"),
        p(
          "When your child says, \"I'm bored,\" resist the urge to rattle off a list of activities. Instead, sympathize without solving. Try saying: \"I know, it's really hard to feel bored. I can't wait to see what you come up with.\" Then, go back to what you were doing.",
        ),
        h2("2. Provide \"loose parts\""),
        p(
          "Single-purpose toys (like a remote-control car that only does one thing) lose their appeal quickly. Open-ended materials — cardboard boxes, uncooked beans and a spoon, a pile of Legos, or blank paper and tape — invite kids to project their own imagination onto the objects.",
        ),
        h2("3. Start small"),
        p(
          "If your child is used to constant entertainment, don't expect them to entertain themselves for an hour. Aim for 10 minutes. Tell them you need to do a chore and that they are in charge of their own play until you are done.",
        ),
        h2("4. Let the mess happen"),
        p(
          "Often, independent play requires making a mess. Building a fort destroys the living room; tinkering with crafts creates paper scraps everywhere. If you want them to occupy themselves, you have to temporarily lower your standards for a spotless house.",
        ),
        h2("5. Forgive the phone moments"),
        p(
          "Sometimes, you are just touched out, burned out, and running on empty. On those days, handing over the phone so you can drink your coffee in peace isn't a failure — it's triage. Give yourself some grace.",
        ),
        p(
          "The goal isn't to be a perfect, screen-free parent. The goal is to slowly realize that when your kid is complaining about having nothing to do, you don't have to fix it. You can just smile, step back, and let their brain do the rest.",
        ),
      ],
    },
  },
];
