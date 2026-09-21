/** Sourced competitor data for /phones comparison page. */

export type PhoneValue =
  | { kind: "yes" }
  | { kind: "no" }
  | { kind: "partial"; label: string }
  | { kind: "text"; label: string };

export type ComparePhone = {
  id: string;
  name: string;
  nameShort: string;
  tagline: string;
  device: string;
  monthly: string;
  isLoup: boolean;
  source?: string;
};

export type CompareRow = {
  section: string;
  label: string;
  detail?: string;
  values: PhoneValue[];
};

// Column order: LOUP WiFi | LOUP LTE | Gabb | TickTalk | Pinwheel | Bark | Relay | Tin Can | Landline | Smartphone
export const COMPARE_PHONES: ComparePhone[] = [
  {
    id: "loup-wifi",
    name: "LOUP WiFi",
    nameShort: "LOUP WiFi",
    tagline: "From $149",
    device: "$149",
    monthly: "$10/mo",
    isLoup: true,
  },
  {
    id: "loup-lte",
    name: "LOUP WiFi + LTE",
    nameShort: "LOUP LTE",
    tagline: "From $199",
    device: "$199",
    monthly: "$20/mo",
    isLoup: true,
  },
  {
    id: "gabb",
    name: "Gabb Phone 4",
    nameShort: "Gabb",
    tagline: "Kids phone",
    device: "$149",
    monthly: "From $25/mo",
    isLoup: false,
    source: "gabb.com/gabb-phone-4",
  },
  {
    id: "ticktalk",
    name: "TickTalk 5",
    nameShort: "TickTalk",
    tagline: "Kids smartwatch",
    device: "$159",
    monthly: "From $10/mo",
    isLoup: false,
    source: "myticktalk.com",
  },
  {
    id: "pinwheel",
    name: "Pinwheel",
    nameShort: "Pinwheel",
    tagline: "Controlled smartphone",
    device: "From $59",
    monthly: "$18/mo + carrier",
    isLoup: false,
    source: "pinwheel.com",
  },
  {
    id: "bark",
    name: "Bark Phone",
    nameShort: "Bark",
    tagline: "Monitoring smartphone",
    device: "$240 over 24mo",
    monthly: "From $39/mo",
    isLoup: false,
    source: "bark.us/bark-phone",
  },
  {
    id: "relay",
    name: "Relay",
    nameShort: "Relay",
    tagline: "Walkie-talkie device",
    device: "~$49",
    monthly: "$10/mo",
    isLoup: false,
    source: "relaygo.com",
  },
  {
    id: "tincan",
    name: "Tin Can",
    nameShort: "Tin Can",
    tagline: "Corded handset app",
    device: "~$79",
    monthly: "$0–$5/mo",
    isLoup: false,
    source: "tincan.com",
  },
  {
    id: "landline",
    name: "Home Landline",
    nameShort: "Landline",
    tagline: "Traditional home phone",
    device: "$0–$50",
    monthly: "$20–$30/mo",
    isLoup: false,
  },
  {
    id: "smartphone",
    name: "Smartphone + controls",
    nameShort: "Smartphone",
    tagline: "iPhone / Android",
    device: "$400–$1,200",
    monthly: "$30–$80/mo",
    isLoup: false,
  },
];

const y = (): PhoneValue => ({ kind: "yes" });
const n = (): PhoneValue => ({ kind: "no" });
const p = (label: string): PhoneValue => ({ kind: "partial", label });
const t = (label: string): PhoneValue => ({ kind: "text", label });

// Rows — order matches COMPARE_PHONES above (10 values each)
export const COMPARE_ROWS: CompareRow[] = [
  // ── Design ───────────────────────────────────────────────────
  {
    section: "Design",
    label: "Screen type",
    values: [
      t("E-ink only"),
      t("E-ink only"),
      t("LCD touch"),
      t("LCD touch (watch)"),
      t("LCD touch"),
      t("LCD touch"),
      t("None"),
      t("None"),
      t("None / keypad"),
      t("OLED / LCD"),
    ],
  },
  {
    section: "Design",
    label: "Form factor",
    values: [
      t("Pocket phone"),
      t("Pocket phone"),
      t("Smartphone"),
      t("Wrist watch"),
      t("Smartphone"),
      t("Smartphone"),
      t("Clip / pocket"),
      t("Corded handset"),
      t("Corded / cordless"),
      t("Smartphone"),
    ],
  },
  {
    section: "Design",
    label: "No glowing screen",
    values: [y(), y(), n(), n(), n(), n(), y(), y(), y(), n()],
  },
  {
    section: "Design",
    label: "Kids will actually carry it",
    values: [y(), y(), y(), p("Watch only"), y(), y(), p("Belt clip"), n(), n(), y()],
  },

  // ── Connectivity ─────────────────────────────────────────────
  {
    section: "Connectivity",
    label: "Requires carrier / SIM plan",
    values: [
      n(),
      p("eSIM via LOUP"),
      y(),
      y(),
      y(),
      y(),
      y(),
      n(),
      y(),
      y(),
    ],
  },
  {
    section: "Connectivity",
    label: "Works on home WiFi (no carrier)",
    values: [y(), y(), n(), n(), n(), n(), p("WiFi mode"), y(), n(), n()],
  },
  {
    section: "Connectivity",
    label: "LTE / cellular anywhere",
    values: [n(), y(), y(), y(), y(), y(), y(), n(), n(), y()],
  },
  {
    section: "Connectivity",
    label: "E911 emergency calls",
    detail: "Can the device call 911?",
    values: [n(), y(), y(), y(), y(), y(), y(), n(), y(), y()],
  },

  // ── What kids can access ──────────────────────────────────────
  {
    section: "What kids can access",
    label: "Open internet / browser",
    values: [n(), n(), n(), n(), p("Approved sites"), p("Managed"), n(), n(), n(), p("Restricted")],
  },
  {
    section: "What kids can access",
    label: "App store",
    values: [n(), n(), p("Advanced plan only"), n(), p("Curated apps"), p("Managed"), n(), n(), n(), p("Restricted")],
  },
  {
    section: "What kids can access",
    label: "Social media",
    values: [n(), n(), n(), n(), n(), p("Managed / blocked"), n(), n(), n(), p("Restricted")],
  },
  {
    section: "What kids can access",
    label: "Games",
    values: [n(), n(), p("Some built-in"), p("Built-in"), p("Managed"), p("Managed"), n(), n(), n(), p("Restricted")],
  },
  {
    section: "What kids can access",
    label: "Text / SMS messaging",
    values: [n(), n(), y(), p("In-app only"), y(), y(), n(), n(), n(), p("Restricted")],
  },
  {
    section: "What kids can access",
    label: "Video calling",
    values: [n(), n(), p("Gabb Messenger"), y(), y(), y(), n(), n(), n(), y()],
  },

  // ── Parent controls ───────────────────────────────────────────
  {
    section: "Parent controls",
    label: "Contacts enforced in hardware",
    detail: "Can a kid call / receive calls from anyone outside the list?",
    values: [y(), y(), p("Optional — child-managed by default"), p("Paired contacts only"), p("Safelist"), p("Managed"), y(), n(), n(), p("Varies")],
  },
  {
    section: "Parent controls",
    label: "Quiet hours / schedule",
    values: [y(), y(), y(), y(), y(), y(), p("School mode"), n(), n(), p("Screen Time")],
  },
  {
    section: "Parent controls",
    label: "Parent can read child's messages",
    values: [n(), n(), y(), n(), p("Yes — deleted texts too"), y(), n(), n(), n(), p("If on family plan")],
  },
  {
    section: "Parent controls",
    label: "AI / content monitoring",
    values: [n(), n(), p("Advanced plan"), n(), p("App ratings"), y(), n(), n(), n(), n()],
  },
  {
    section: "Parent controls",
    label: "Remote disable / lock",
    values: [y(), y(), y(), y(), y(), y(), p("Do Not Disturb"), n(), n(), p("Screen Time")],
  },

  // ── Privacy & data ────────────────────────────────────────────
  {
    section: "Privacy & data",
    label: "Location tracking",
    values: [
      n(),
      n(),
      p("GPS every 15 min"),
      p("Continuous — can't disable"),
      p("On demand"),
      p("On demand"),
      p("Continuous GPS"),
      n(),
      n(),
      p("Find My / Family Sharing"),
    ],
  },
  {
    section: "Privacy & data",
    label: "Collects child's messages or photos",
    values: [n(), n(), y(), n(), p("Deleted texts visible to parent"), y(), n(), n(), n(), p("iCloud backup")],
  },
  {
    section: "Privacy & data",
    label: "Third-party SDKs can access child data",
    detail: "Disclosed in privacy policy",
    values: [n(), n(), p("If apps enabled"), n(), p("Possible"), p("Possible"), n(), n(), n(), p("Per app")],
  },
  {
    section: "Privacy & data",
    label: "Sells or shares data for advertising",
    values: [n(), n(), n(), n(), n(), n(), n(), n(), n(), p("Varies by carrier")],
  },

  // ── Calling & cost ────────────────────────────────────────────
  {
    section: "Calling & cost",
    label: "Device-to-device calls free",
    values: [y(), y(), n(), p("In-app only"), n(), n(), p("Relay-to-Relay on WiFi"), p("Tin Can–to–Tin Can"), y(), n()],
  },
  {
    section: "Calling & cost",
    label: "Calls to regular phone numbers",
    values: [p("$10/mo"), p("$10/mo"), p("Included in plan"), p("Included in plan"), p("Included in plan"), p("Included in plan"), n(), n(), y(), y()],
  },
  {
    section: "Calling & cost",
    label: "Carrier contract required",
    values: [n(), n(), p("Lowest rate = 2yr"), n(), n(), p("24-month device payment"), n(), n(), p("Varies"), p("Varies")],
  },
  {
    section: "Calling & cost",
    label: "Device price",
    values: [t("$149"), t("$199"), t("$149"), t("$159"), t("From $59"), t("$240 over 24mo"), t("~$49"), t("~$79"), t("$0–$50"), t("$400–$1,200")],
  },
  {
    section: "Calling & cost",
    label: "Monthly cost (all-in)",
    values: [t("$10"), t("$20"), t("From $25 + carrier"), t("From $10"), t("From $18 + carrier"), t("From $39"), t("$10"), t("$0–$5"), t("$20–$30"), t("$30–$80")],
  },
];

export const COMPARE_SECTIONS = [
  ...new Set(COMPARE_ROWS.map((r) => r.section)),
];
