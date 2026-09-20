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

// Column order: LOUP WiFi | LOUP LTE | Gabb | TickTalk | Pinwheel | Bark | Relay
export const COMPARE_PHONES: ComparePhone[] = [
  {
    id: "loup-wifi",
    name: "LOUP WiFi",
    nameShort: "LOUP",
    tagline: "The screenless first phone",
    device: "$149",
    monthly: "$10/mo",
    isLoup: true,
  },
  {
    id: "loup-lte",
    name: "LOUP WiFi + LTE",
    nameShort: "LOUP LTE",
    tagline: "Reachable anywhere",
    device: "$199",
    monthly: "$20/mo",
    isLoup: true,
  },
  {
    id: "gabb",
    name: "Gabb Phone 4",
    nameShort: "Gabb",
    tagline: "No social media smartphone",
    device: "$149",
    monthly: "From $24.99/mo + carrier",
    isLoup: false,
    source: "gabb.com/gabb-phone-4",
  },
  {
    id: "ticktalk",
    name: "TickTalk 5",
    nameShort: "TickTalk",
    tagline: "Kids smartwatch with calling",
    device: "$159",
    monthly: "From $9.99/mo + carrier",
    isLoup: false,
    source: "myticktalk.com/products/ticktalk-5",
  },
  {
    id: "pinwheel",
    name: "Pinwheel",
    nameShort: "Pinwheel",
    tagline: "Smartphone with parental controls",
    device: "From $59",
    monthly: "$17.99/mo portal + carrier",
    isLoup: false,
    source: "pinwheel.com/phones",
  },
  {
    id: "bark",
    name: "Bark Phone",
    nameShort: "Bark",
    tagline: "Monitoring-first smartphone",
    device: "$240 over 24mo",
    monthly: "From $39/mo total",
    isLoup: false,
    source: "bark.us/bark-phone",
  },
  {
    id: "relay",
    name: "Relay",
    nameShort: "Relay",
    tagline: "Screenless walkie-talkie device",
    device: "$49",
    monthly: "$9.99/mo + carrier",
    isLoup: false,
    source: "relaygo.com",
  },
];

const y = (): PhoneValue => ({ kind: "yes" });
const n = (): PhoneValue => ({ kind: "no" });
const p = (label: string): PhoneValue => ({ kind: "partial", label });
const t = (label: string): PhoneValue => ({ kind: "text", label });

// Rows — column order must match COMPARE_PHONES above
export const COMPARE_ROWS: CompareRow[] = [
  // ── Design & Screen ──────────────────────────────────────────
  {
    section: "Design",
    label: "Screen type",
    values: [
      t("E-ink only"),
      t("E-ink only"),
      t("LCD touchscreen"),
      t("LCD touchscreen (watch)"),
      t("LCD touchscreen"),
      t("LCD touchscreen"),
      t("No screen"),
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
    ],
  },
  {
    section: "Design",
    label: "E-ink display (eye-safe, no glow)",
    values: [y(), y(), n(), n(), n(), n(), n()],
  },

  // ── Connectivity ─────────────────────────────────────────────
  {
    section: "Connectivity",
    label: "Requires carrier/SIM plan",
    values: [n(), p("eSIM via LOUP"), y(), y(), y(), y(), y()],
  },
  {
    section: "Connectivity",
    label: "Works without cellular (WiFi only)",
    values: [y(), y(), n(), n(), n(), n(), n()],
  },
  {
    section: "Connectivity",
    label: "LTE / cellular",
    values: [n(), y(), y(), y(), y(), y(), y()],
  },
  {
    section: "Connectivity",
    label: "E911 emergency calls",
    detail: "Can the device call 911 in an emergency?",
    values: [n(), y(), y(), y(), y(), y(), y()],
  },

  // ── Content & Access ─────────────────────────────────────────
  {
    section: "Content & access",
    label: "Open internet / browser",
    values: [n(), n(), n(), n(), p("Restricted/approved only"), p("Managed"), n()],
  },
  {
    section: "Content & access",
    label: "App store",
    values: [n(), n(), p("Optional on Advanced plan"), n(), p("Curated/approved"), p("Managed"), n()],
  },
  {
    section: "Content & access",
    label: "Social media",
    values: [n(), n(), n(), n(), n(), p("Managed/blocked"), n()],
  },
  {
    section: "Content & access",
    label: "Games",
    values: [n(), n(), p("Some built-in"), p("Built-in"), p("Managed"), p("Managed"), n()],
  },
  {
    section: "Content & access",
    label: "Text / messaging",
    values: [n(), n(), y(), p("In-app only"), y(), y(), n()],
  },

  // ── Parent controls ───────────────────────────────────────────
  {
    section: "Parent controls",
    label: "Hardware-enforced contact whitelist",
    detail: "Can a kid call/be called by anyone outside the approved list?",
    values: [y(), y(), p("Optional — child-managed by default"), p("Approved contacts"), p("Safelist"), p("Managed"), y()],
  },
  {
    section: "Parent controls",
    label: "Quiet hours / schedule",
    values: [y(), y(), y(), y(), y(), y(), y()],
  },
  {
    section: "Parent controls",
    label: "Parent reads child's messages",
    values: [n(), n(), y(), n(), y(), y(), n()],
  },
  {
    section: "Parent controls",
    label: "Content scanning / AI monitoring",
    values: [n(), n(), p("Optional on Advanced"), n(), p("App safety ratings"), y(), n()],
  },

  // ── Privacy & data ────────────────────────────────────────────
  {
    section: "Privacy & data",
    label: "Location tracking",
    values: [n(), n(), p("GPS every 15 min"), p("Continuous — can't disable"), p("On demand"), p("On demand"), p("Continuous GPS")],
  },
  {
    section: "Privacy & data",
    label: "Collects child's messages/photos",
    values: [n(), n(), y(), n(), p("Deleted texts visible to parent"), y(), n()],
  },
  {
    section: "Privacy & data",
    label: "Sells data to advertisers",
    values: [n(), n(), n(), n(), n(), n(), n()],
  },
  {
    section: "Privacy & data",
    label: "Third-party SDKs can collect child data",
    detail: "Disclosed in privacy policy",
    values: [n(), n(), p("Yes — if apps enabled"), n(), p("Possible"), p("Possible"), n()],
  },

  // ── Calling ───────────────────────────────────────────────────
  {
    section: "Calling",
    label: "Device-to-device calls free",
    values: [y(), y(), n(), p("In-app"), n(), n(), p("Relay-to-Relay free on WiFi")],
  },
  {
    section: "Calling",
    label: "External phone numbers",
    values: [p("$10/mo"), p("$10/mo"), p("Included in plan"), p("Included in plan"), p("Included in plan"), p("Included in plan"), p("Push-to-talk only")],
  },
  {
    section: "Calling",
    label: "Video calling",
    values: [n(), n(), p("Gabb Messenger"), y(), y(), y(), n()],
  },

  // ── Pricing ───────────────────────────────────────────────────
  {
    section: "Pricing",
    label: "Device price",
    values: [t("$149"), t("$199"), t("$149"), t("$159"), t("From $59"), t("$240 (24mo)"), t("~$49")],
  },
  {
    section: "Pricing",
    label: "Monthly cost (all-in)",
    values: [t("$10/mo"), t("$20/mo"), t("From $25/mo + carrier"), t("From $10/mo"), t("From $18/mo + carrier"), t("From $39/mo"), t("$10/mo")],
  },
  {
    section: "Pricing",
    label: "Carrier contract required",
    values: [n(), n(), p("Required"), p("Required"), p("Required"), p("Required"), p("Required")],
  },
  {
    section: "Pricing",
    label: "24-month commitment",
    values: [n(), n(), p("Lowest rate needs 2-yr contract"), n(), n(), p("Device payment is 24-month"), n()],
  },
] as const;

// Group rows by section for rendering
export const COMPARE_SECTIONS = [
  ...new Set(COMPARE_ROWS.map((r) => r.section)),
];
