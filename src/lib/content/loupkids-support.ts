export type HelpArticle = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  sections: { heading?: string; body: string }[];
};

export const LOUPKIDS_HELP_ARTICLES: HelpArticle[] = [
  {
    slug: "setup-wifi",
    title: "Connect Loup to Wi-Fi",
    category: "Getting started",
    summary: "Pair your Loup to home or school Wi-Fi using the parent app.",
    sections: [
      {
        body: "Download the Loup parent app on iOS or Android and sign in with the email you used to order. Plug Loup in to charge — setup works best with at least 20% battery.",
      },
      {
        heading: "Pair the device",
        body: "In the app, tap Add Loup and follow the on-screen prompts. Loup will display a pairing code on its e-ink strip; enter it in the app to link the device to your account.",
      },
      {
        heading: "Choose a network",
        body: "Select your home Wi-Fi network and enter the password. Loup connects over 2.4 GHz Wi-Fi — if your router splits bands, pick the 2.4 GHz network or enable a combined SSID.",
      },
      {
        heading: "School Wi-Fi",
        body: "You can add additional networks later from Settings → Wi-Fi in the parent app. Some school networks require IT approval; contact your school if Loup cannot join guest Wi-Fi.",
      },
    ],
  },
  {
    slug: "approve-contacts",
    title: "Approve your first contacts",
    category: "Parent app",
    summary: "Only people you approve can call Loup — here's how to build the list.",
    sections: [
      {
        body: "Open the parent app and go to Approved Contacts. Tap Add Contact to invite a parent, grandparent, or trusted friend. Each contact needs a name and either a Loup device or a phone number.",
      },
      {
        heading: "Loup-to-Loup contacts",
        body: "If the other person also has Loup, search by their account email or share an invite link. Loup-to-Loup calling is free and unlimited.",
      },
      {
        heading: "Real phone numbers",
        body: "To reach smartphones and landlines, enable the $10/month calling plan in Billing. Then add contacts with their phone numbers — only US and Canada numbers are supported today.",
      },
      {
        heading: "Limits",
        body: "Each Loup supports up to 20 approved contacts. Your child cannot add contacts on the device; every change happens in the parent app and syncs automatically.",
      },
    ],
  },
  {
    slug: "quiet-hours",
    title: "Set quiet hours",
    category: "Parent app",
    summary: "Homework, dinner, bedtime — schedule when Loup won't ring.",
    sections: [
      {
        body: "In the parent app, open Quiet Hours. Create a schedule for each window you want — for example, 3–6 PM on weekdays for homework or 8–7 AM nightly for sleep.",
      },
      {
        heading: "What happens during quiet hours",
        body: "Incoming calls are silenced and sent to voice message. Outgoing calls from your child are also blocked during quiet hours unless you override from the app.",
      },
      {
        heading: "Emergency override",
        body: "You can always call Loup from the parent app during quiet hours. Your child can also hold the call bar for three seconds to reach your phone if you've enabled emergency contacts.",
      },
    ],
  },
  {
    slug: "calling-plan",
    title: "Add the $10/mo calling plan",
    category: "Billing",
    summary: "Enable real phone numbers so Loup can reach smartphones and landlines.",
    sections: [
      {
        body: "Loup-to-Loup is always free, as are calls from parents to their kid's Loup. We offer competitive plans to make and receive calls to external numbers too. The $10/month Plus plan adds external phone numbers in and out, and pager mode.",
      },
      {
        heading: "Subscribe",
        body: "In the parent app, go to Billing → Calling Plan and tap Subscribe. You'll be charged $10/month per Loup device; cancel anytime with no penalty.",
      },
      {
        heading: "What's included",
        body: "Unlimited inbound and outbound calls to approved contacts with real phone numbers. Voice messages remain free and encrypted regardless of plan status.",
      },
    ],
  },
  {
    slug: "custom-plates",
    title: "Swap back plates",
    category: "Hardware",
    summary: "Change Loup's look in seconds — no tools needed.",
    sections: [
      {
        body: "Loup's anodized aluminum back plate snaps off without tools. Press the small notch at the bottom edge and lift the plate away from the body.",
      },
      {
        heading: "Install a new plate",
        body: "Align the replacement plate with the top edge first, then press down until you hear a click. Plates are sold separately in the store — browse patterns or upload a custom photo.",
      },
      {
        heading: "Care",
        body: "Wipe plates with a dry cloth. Avoid solvents on anodized finishes. Custom photo plates are scratch-resistant but not waterproof — remove before swimming.",
      },
    ],
  },
  {
    slug: "warranty-claim",
    title: "Start a warranty claim",
    category: "Returns",
    summary: "30-day returns on every Loup order.",
    sections: [
      {
        body: "Loup is covered for manufacturing defects and normal kid accidents — drops, spills, and everyday wear for two years from delivery.",
      },
      {
        heading: "Start a claim",
        body: "Email hello@loupkids.com with your order number, a short description of the issue, and photos if relevant. We respond within one business day.",
      },
      {
        heading: "Returns",
        body: "Not the right fit? You have 30 days for a full refund with free return shipping. See our shipping and returns policy for details.",
      },
    ],
  },
  {
    slug: "delaying-the-smartphone",
    title: "Delaying the smartphone without the fight",
    category: "Parent resources",
    summary: "How to hold the line when every other kid seems to have one.",
    sections: [
      {
        body: "You're not crazy for waiting. Most parents we talk to wish they'd held out longer — but feel alone at school pickup when their kid is the only one without a glowing rectangle.",
      },
      {
        heading: "Name the real need",
        body: "Kids don't want a smartphone. They want to reach you after practice, call a friend about homework, and feel like they belong. Loup solves the reachability problem without opening the feed.",
      },
      {
        heading: "Find your cohort",
        body: "One family saying no is hard. Three families saying no is a policy. Talk to the parents you trust — carpool, team, class group chat — about aligning on a phone timeline. Collective delay works.",
      },
      {
        heading: "Substitute, don't subtract",
        body: "Saying \"no phone\" without offering another way to connect sets you up for a fight. Give them a device they're proud to carry and contacts they actually use. The argument usually ends.",
      },
    ],
  },
  {
    slug: "right-age-first-phone",
    title: "What's the right age for a first phone?",
    category: "Parent resources",
    summary: "There's no universal answer — but there is a better sequence.",
    sections: [
      {
        body: "The average age of a first smartphone keeps dropping. That doesn't mean it's right for your kid — it means the default shifted without a conversation.",
      },
      {
        heading: "Voice before video",
        body: "Most kids 8–12 need reachability, not entertainment. They need to call you when plans change and talk to two or three friends — not scroll, game, or group chat until midnight.",
      },
      {
        heading: "Signs they might be ready for more",
        body: "Can they manage homework without constant reminders? Do they sleep through the night? Can they handle disappointment without needing a screen to regulate? Those matter more than age.",
      },
      {
        heading: "The Loup sequence",
        body: "Loup is designed for the gap years: after they need a walkie-talkie, before they need Instagram. Many families use it from 8–14, then revisit a smartphone together when the kid can articulate why they want one.",
      },
    ],
  },
  {
    slug: "wait-until-8th-playbook",
    title: "Wait Until 8th — how to actually execute it",
    category: "Parent resources",
    summary: "The pledge works when you have a substitute, not just a rule.",
    sections: [
      {
        body: "Wait Until 8th is collective bargaining — parents agreeing to hold off on smartphones until 8th grade so no single kid pays the social cost alone. It's smart. It's also incomplete if you stop at \"no.\"",
      },
      {
        heading: "Step 1: Recruit three families",
        body: "You need a critical mass in your kid's actual social circle — not just your opinion group online. Three families who will hold the line together changes the pickup-line conversation.",
      },
      {
        heading: "Step 2: Give kids a real alternative",
        body: "Loup-to-Loup calling lets pledged kids stay in touch without breaking the pact. They can call each other, leave voice messages, and feel connected — on hardware with no feed to drift into.",
      },
      {
        heading: "Step 3: Talk to the school",
        body: "Some schools assume every kid has a phone for logistics. Ask how they reach parents and whether Loup (Wi-Fi calling, parent-approved contacts) fits their communication plan.",
      },
    ],
  },
];

export const LOUPKIDS_SETUP_STEPS = [
  {
    step: "1",
    section: "Set it up",
    title: "Pair Loup with your Wi-Fi",
    body: "Open the parent app, scan the code on the back of Loup, and choose your home network. You’ll be ready in about two minutes.",
    placeholder: "Setup screen",
  },
  {
    step: "2",
    section: "Choose their people",
    title: "Add the people they actually call",
    body: "Parents, grandparents, best friends — you decide who’s in. No strangers, spam, or surprise calls.",
    placeholder: "Contacts list",
  },
  {
    step: "3",
    section: "Purity of purpose",
    title: "As simple as pick up and talk.",
    body: "Turn the dial, choose a name, and press the talk bar. We stripped away the menus and the apps, leaving only the voices you know and trust.",
    placeholder: "Device screen",
  },
] as const;

export const LOUPKIDS_RESOURCES = [
  {
    title: "Delaying the smartphone without the fight",
    href: "/help/delaying-the-smartphone",
    type: "Guide",
    description: "Hold the line at pickup without leaving your kid disconnected.",
  },
  {
    title: "What's the right age for a first phone?",
    href: "/help/right-age-first-phone",
    type: "Guide",
    description: "Voice before video — and signs they might be ready for more.",
  },
  {
    title: "Wait Until 8th — how to actually execute it",
    href: "/help/wait-until-8th-playbook",
    type: "Guide",
    description: "The pledge works when you have a substitute, not just a rule.",
  },
  {
    title: "The Borrowed Childhood",
    href: "/journal/the-borrowed-childhood",
    type: "Journal",
    description: "What kids lose when the default is a glowing screen.",
  },
  {
    title: "Wait Until 8th — collective bargaining",
    href: "/journal/wait-until-8th-and-the-strategy-of-collective-bargaining",
    type: "Journal",
    description: "How parents are pushing back together on the smartphone timeline.",
  },
  {
    title: "The Parental Control Myth",
    href: "/journal/the-parental-control-myth",
    type: "Journal",
    description: "Why filters and time limits aren't the same as a different device.",
  },
  {
    title: "Boring Tech Can Be Anything But",
    href: "/journal/boring-tech-can-be-anything-but",
    type: "Journal",
    description: "The case for devices that do one thing well.",
  },
  {
    title: "White, tactile, and built for kids who need more help",
    href: "/journal/white-tactile-neurodivergence-and-hard-of-sight",
    type: "Journal",
    description: "Why e-ink and physical dials matter for neurodivergence and hard of sight.",
  },
  {
    title: "The public health crisis hiding in our pockets",
    href: "/journal/the-public-health-crisis-hiding-in-our-pockets",
    type: "Journal",
    description: "Heavy childhood screen use — and why we'll look back on it like smoking.",
  },
  {
    title: "The problem with locking down a smartphone",
    href: "/journal/the-problem-with-locking-down-a-smartphone",
    type: "Journal",
    description: "Why parental controls for kids' phones aren't the same as the right first phone.",
  },
  {
    title: "The age kids should get their first phone",
    href: "/journal/the-age-kids-should-get-their-first-phone",
    type: "Journal",
    description: "Skip the magic birthday — readiness, reachability, and the gap years.",
  },
  {
    title: "I just need a break — why the phone comes out at 5:15",
    href: "/journal/i-just-need-a-break-which-is-why-i-give-my-kid-a-phone",
    type: "Journal",
    description: "Parenting guilt, boredom, and why you don't have to be the cruise director.",
  },
] as const;

export const LOUPKIDS_FOOTER_LEGAL = [
  { href: "/legal/privacy", label: "Privacy" },
  { href: "/legal/terms", label: "Terms" },
  { href: "/legal/coppa", label: "COPPA" },
  { href: "/legal/warranty", label: "Warranty" },
  { href: "/legal/shipping", label: "Shipping" },
  { href: "/legal/accessibility", label: "Accessibility" },
] as const;

export const LOUPKIDS_FOOTER_SUPPORT = [
  { href: "/help", label: "Help center" },
  { href: "/setup", label: "Setup guide" },
  { href: "/resources", label: "Parent resources" },
  { href: "/reserve", label: "Waitlist" },
] as const;

export function getHelpArticle(slug: string) {
  return LOUPKIDS_HELP_ARTICLES.find((a) => a.slug === slug);
}

export function getHelpCategories() {
  return [...new Set(LOUPKIDS_HELP_ARTICLES.map((a) => a.category))];
}
