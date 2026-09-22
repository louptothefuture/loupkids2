"use client";

import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import { useState } from "react";

const C = {
  ink: "#111111",
  muted: "#444444",
  faint: "#999999",
  line: "#e0e0e0",
  bg: "#f7f7f5",
  white: "#ffffff",
  accent: "#111111",
};

// A4: 595 × 842 pt  |  margins: top 32, bottom 30, sides 38
// Usable: 519 × 780 pt
// Left col: 188pt (image, full height)
// Right col: 311pt (text)
// Gutter: 20pt

const MARGIN_H = 38;
const MARGIN_T = 32;
const MARGIN_B = 30;
const MASTHEAD_H = 44;
const FOOTER_H = 34;
const GUTTER = 18;
const LEFT_W = 190;
const RIGHT_W = 519 - LEFT_W - GUTTER; // 311

const BODY_H = 842 - MARGIN_T - MARGIN_B - MASTHEAD_H - FOOTER_H; // ≈ 706

const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    backgroundColor: C.white,
    paddingTop: MARGIN_T,
    paddingBottom: MARGIN_B,
    paddingHorizontal: MARGIN_H,
    fontSize: 8.5,
    color: C.ink,
  },

  // ── Masthead ──────────────────────────────────────────────
  masthead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: MASTHEAD_H,
    borderBottomWidth: 1.5,
    borderBottomColor: C.ink,
    paddingBottom: 7,
    marginBottom: 0,
  },
  wordmark: {
    fontSize: 34,
    fontFamily: "Helvetica-Bold",
    letterSpacing: -0.8,
    lineHeight: 1,
    color: C.ink,
  },
  mastheadMeta: {
    fontSize: 6.5,
    color: C.faint,
    letterSpacing: 0.5,
    lineHeight: 1.5,
    marginBottom: 1,
  },
  tagline: {
    fontSize: 7,
    color: C.muted,
    marginTop: 1.5,
  },
  contactBlock: {
    textAlign: "right",
    fontSize: 7,
    color: C.muted,
    lineHeight: 1.7,
  },

  // ── Body ─────────────────────────────────────────────────
  body: {
    flexDirection: "row",
    height: BODY_H,
    marginTop: 0,
    paddingTop: 14,
  },

  // ── Left column ───────────────────────────────────────────
  leftCol: {
    width: LEFT_W,
    flexDirection: "column",
  },
  phoneImage: {
    width: LEFT_W,
    height: Math.round(LEFT_W * 1.38), // ~262pt — fills ~37% of page
    objectFit: "cover",
    objectPosition: "center top",
  },
  leftLower: {
    flex: 1,
    paddingTop: 12,
    flexDirection: "column",
    justifyContent: "space-between",
  },

  // ── Gutter ────────────────────────────────────────────────
  gutter: {
    width: GUTTER,
  },

  // ── Right column ──────────────────────────────────────────
  rightCol: {
    width: RIGHT_W,
    flexDirection: "column",
    justifyContent: "space-between",
  },

  // ── Type ─────────────────────────────────────────────────
  label: {
    fontSize: 5.5,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    color: C.faint,
    marginBottom: 4,
  },
  headline: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    lineHeight: 1.15,
    letterSpacing: -0.4,
    color: C.ink,
    marginBottom: 7,
  },
  body1: {
    fontSize: 8.5,
    lineHeight: 1.6,
    color: C.muted,
  },
  body1Dark: {
    fontSize: 8.5,
    lineHeight: 1.6,
    color: C.ink,
  },
  body2: {
    fontSize: 8,
    lineHeight: 1.55,
    color: C.muted,
  },

  rule: {
    borderTopWidth: 0.5,
    borderTopColor: C.line,
    marginVertical: 9,
  },

  // Steps
  stepRow: { flexDirection: "row", gap: 6, marginBottom: 5 },
  stepNum: { fontSize: 7, fontFamily: "Helvetica-Bold", color: C.ink, width: 14 },
  stepText: { flex: 1, fontSize: 8, lineHeight: 1.55, color: C.muted },

  // Specs grid
  specsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  specCell: { width: "50%", marginBottom: 6, paddingRight: 8 },
  specLabel: {
    fontSize: 5,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1.3,
    color: C.faint,
    marginBottom: 1,
  },
  specValue: { fontSize: 7.5, color: C.ink },

  // Founder
  founderBlock: {
    backgroundColor: C.bg,
    borderRadius: 3,
    padding: 9,
  },
  founderName: { fontSize: 9.5, fontFamily: "Helvetica-Bold", marginBottom: 0.5 },
  founderRole: { fontSize: 6, color: C.faint, marginBottom: 5 },

  // Footer
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderTopWidth: 1.5,
    borderTopColor: C.ink,
    paddingTop: 8,
    marginTop: 8,
    height: FOOTER_H,
  },
  footerLeft: { fontSize: 7.5, lineHeight: 1.6 },
  footerRight: { fontSize: 6, color: C.faint, textAlign: "right", lineHeight: 1.7 },
});

function PressKitDocument() {
  return (
    <Document title="LOUP Media Kit 2026" author="LOUP">
      <Page size="A4" orientation="portrait" style={s.page}>

        {/* ── Masthead ── */}
        <View style={s.masthead}>
          <View>
            <Text style={s.mastheadMeta}>Media Kit · 2026</Text>
            <Text style={s.wordmark}>LOUP</Text>
            <Text style={s.tagline}>Phones for the anti-screen age.</Text>
          </View>
          <View>
            <Text style={s.contactBlock}>loupkids.com</Text>
            <Text style={s.contactBlock}>hi@loupkids.com</Text>
          </View>
        </View>

        {/* ── Body ── */}
        <View style={s.body}>

          {/* Left column */}
          <View style={s.leftCol}>
            <Image
              style={s.phoneImage}
              src="/images/press-hand-hi.jpg"
            />

            <View style={s.leftLower}>
              {/* Who it's for */}
              <View>
                <Text style={s.label}>Who it&apos;s for</Text>
                <Text style={s.body2}>
                  Kids 6–16. Parents who want their kids reachable without handing them
                  the internet. Families in the gap between too young for a smartphone
                  and ready for one.
                </Text>
              </View>

              <View style={s.rule} />

              {/* Founder */}
              <View style={s.founderBlock}>
                <Text style={s.label}>Founder</Text>
                <Text style={s.founderName}>Thomas O&apos;Connell</Text>
                <Text style={s.founderRole}>CEO + Founder</Text>
                <Text style={s.body2}>
                  Thomas spent 20 years building brands for Nike, LEGO, and Google —
                  organizations very good at capturing attention. Then he had kids and
                  watched the same machinery get aimed at them. LOUP is what he built
                  instead.
                </Text>
              </View>

              {/* Specs */}
              <View style={{ marginTop: 10 }}>
                <Text style={s.label}>At a glance</Text>
                <View style={s.specsGrid}>
                  {[
                    ["Price", "WiFi $149 · LTE $199"],
                    ["Monthly", "WiFi $10 · LTE $20"],
                    ["Ages", "6–16"],
                    ["Ships", "Within 60 days"],
                  ].map(([l, v]) => (
                    <View key={l} style={s.specCell}>
                      <Text style={s.specLabel}>{l}</Text>
                      <Text style={s.specValue}>{v}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>

          {/* Gutter */}
          <View style={s.gutter} />

          {/* Right column */}
          <View style={s.rightCol}>

            {/* Problem */}
            <View>
              <Text style={s.label}>The problem</Text>
              <Text style={s.headline}>
                The first phone used to be a rite of passage.{"\n"}
                Now it&apos;s a liability.
              </Text>
              <Text style={s.body1}>
                A portal to attention merchants, social comparison, and
                algorithmically-optimized distraction. Parents know it. Kids feel it.
                And for a decade, the only available answer has been parental controls
                layered onto a device that was never designed to be controlled. The
                category that should exist — a purposeful first phone — didn&apos;t.
                Until now.
              </Text>
            </View>

            <View style={s.rule} />

            {/* What it is */}
            <View>
              <Text style={s.label}>What LOUP is</Text>
              <Text style={s.body1Dark}>
                LOUP is a WiFi voice device for kids — calls only, to the people parents
                have approved, and nobody else. No texts, no internet, no apps, no feeds,
                no algorithm deciding what comes next. The hardware is purpose-built:
                anodized aluminum frame, tactile rotary scroll dial, e-ink display. v1 is
                WiFi-only. v2 adds LTE — same closed contact list, cellular range. It
                looks like something worth carrying. It is.
              </Text>
            </View>

            <View style={s.rule} />

            {/* How it works */}
            <View>
              <Text style={s.label}>How it works</Text>
              <View style={s.stepRow}>
                <Text style={s.stepNum}>01</Text>
                <Text style={s.stepText}>
                  Parents whitelist contacts in the companion app. Nobody outside the
                  list can call in or out.
                </Text>
              </View>
              <View style={s.stepRow}>
                <Text style={s.stepNum}>02</Text>
                <Text style={s.stepText}>
                  Kids scroll the dial, find a name, press call. That&apos;s the whole
                  interface.
                </Text>
              </View>
              <View style={s.stepRow}>
                <Text style={s.stepNum}>03</Text>
                <Text style={s.stepText}>
                  Quiet hours, schedules, and parent-to-device paging live in the
                  companion app. Setup takes about ten minutes.
                </Text>
              </View>
            </View>

            <View style={s.rule} />

            {/* Hardware */}
            <View>
              <Text style={s.label}>The hardware</Text>
              <Text style={s.body1}>
                Anodized aluminum frame. E-ink display — no glow, no video, no
                algorithm. Tactile scroll dial. Designed to be held, carried, and kept —
                not stared at. This is not a plastic toy. It is a considered object built
                for the space between a walkie-talkie and a smartphone.
              </Text>
            </View>

            <View style={s.rule} />

            {/* Specs — right side */}
            <View>
              <Text style={s.label}>Technical</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {[
                  ["Category", "Screenless voice phone for kids"],
                  ["Display", "E-ink — no glow, no video, no apps"],
                  ["Connectivity", "WiFi (v1) · WiFi + LTE (v2)"],
                  ["Calling", "Approved contacts only — no open dialing"],
                ].map(([l, v]) => (
                  <View key={l} style={{ width: "50%", marginBottom: 7, paddingRight: 8 }}>
                    <Text style={s.specLabel}>{l}</Text>
                    <Text style={s.specValue}>{v}</Text>
                  </View>
                ))}
              </View>
            </View>

          </View>
        </View>

        {/* ── Footer ── */}
        <View style={s.footer}>
          <View>
            <Text style={{ ...s.footerLeft, fontFamily: "Helvetica-Bold" }}>
              Press contact
            </Text>
            <Text style={s.footerLeft}>hi@loupkids.com · loupkids.com</Text>
          </View>
          <View>
            <Text style={s.footerRight}>
              High-res images and product renders available on request.
            </Text>
            <Text style={s.footerRight}>Founder available for interview.</Text>
          </View>
        </View>

      </Page>
    </Document>
  );
}

export function PressKitDownload() {
  const [loading, setLoading] = useState(false);

  const download = async () => {
    setLoading(true);
    try {
      const blob = await pdf(<PressKitDocument />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "LOUP-Media-Kit-2026.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={download}
      disabled={loading}
      className="lk-btn lk-btn-sm disabled:opacity-60"
    >
      {loading ? "Generating PDF…" : "Download Media Kit PDF"}
    </button>
  );
}
