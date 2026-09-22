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

// ── Styles ────────────────────────────────────────────────────────────────────

const C = {
  ink: "#111111",
  muted: "#555555",
  faint: "#888888",
  line: "#dddddd",
  bg: "#f9f9f7",
  white: "#ffffff",
};

const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    backgroundColor: C.white,
    paddingTop: 36,
    paddingBottom: 32,
    paddingHorizontal: 40,
    fontSize: 8,
    color: C.ink,
  },

  // Masthead
  masthead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderBottomWidth: 1.5,
    borderBottomColor: C.ink,
    paddingBottom: 8,
    marginBottom: 14,
  },
  wordmark: { fontSize: 30, fontFamily: "Helvetica-Bold", letterSpacing: -0.5, lineHeight: 1 },
  tagline: { fontSize: 7, color: C.muted, marginTop: 2 },
  eyebrow: { fontSize: 6, textTransform: "uppercase", letterSpacing: 1.2, color: C.faint, marginBottom: 2 },
  contactTop: { textAlign: "right", fontSize: 6.5, color: C.muted, lineHeight: 1.6 },

  // Layout
  body: { flexDirection: "row", gap: 18 },
  leftCol: { width: "36%" },
  rightCol: { width: "64%" },

  // Image
  phoneImage: {
    width: "100%",
    borderRadius: 4,
    marginBottom: 10,
    backgroundColor: C.bg,
  },

  // Sections
  section: { marginBottom: 10 },
  label: {
    fontSize: 5.5,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1.4,
    color: C.faint,
    marginBottom: 3,
  },
  headline: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    lineHeight: 1.2,
    letterSpacing: -0.2,
    color: C.ink,
    marginBottom: 5,
  },
  bodyText: {
    fontSize: 7.5,
    lineHeight: 1.55,
    color: C.muted,
  },
  bodyTextDark: {
    fontSize: 7.5,
    lineHeight: 1.55,
    color: C.ink,
  },

  // Steps
  step: { flexDirection: "row", gap: 5, marginBottom: 4 },
  stepNum: { fontSize: 6.5, fontFamily: "Helvetica-Bold", color: C.ink, width: 12, paddingTop: 0.5 },
  stepText: { fontSize: 7.5, lineHeight: 1.5, color: C.muted, flex: 1 },

  // Dividers
  rule: { borderTopWidth: 0.5, borderTopColor: C.line, marginVertical: 8 },
  ruleStrong: { borderTopWidth: 1, borderTopColor: C.ink, marginVertical: 8 },

  // Founder block
  founderBox: {
    backgroundColor: C.bg,
    borderRadius: 3,
    padding: 8,
    marginBottom: 10,
  },
  founderName: { fontSize: 9, fontFamily: "Helvetica-Bold", marginBottom: 1 },
  founderRole: { fontSize: 6, color: C.faint, marginBottom: 4 },

  // Specs
  specsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 0 },
  specCell: { width: "25%", paddingRight: 6, marginBottom: 5 },
  specLabel: { fontSize: 5, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 1.2, color: C.faint },
  specValue: { fontSize: 6.5, color: C.ink, marginTop: 1 },

  // Footer
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderTopWidth: 1.5,
    borderTopColor: C.ink,
    paddingTop: 7,
    marginTop: 4,
  },
  footerContact: { fontSize: 6.5, lineHeight: 1.6 },
  footerNote: { fontSize: 5.5, color: C.faint, textAlign: "right", lineHeight: 1.6 },
});

// ── PDF Document ──────────────────────────────────────────────────────────────

function PressKitDocument() {
  return (
    <Document
      title="LOUP Media Kit 2026"
      author="LOUP"
      subject="Press kit for journalists, editors, and podcast hosts"
    >
      <Page size="A4" orientation="portrait" style={s.page}>

        {/* Masthead */}
        <View style={s.masthead}>
          <View>
            <Text style={s.eyebrow}>Media Kit · 2026</Text>
            <Text style={s.wordmark}>LOUP</Text>
            <Text style={s.tagline}>Phones for the anti-screen age.</Text>
          </View>
          <View>
            <Text style={s.contactTop}>loupkids.com</Text>
            <Text style={s.contactTop}>hi@loupkids.com</Text>
          </View>
        </View>

        {/* Two-column body */}
        <View style={s.body}>

          {/* Left column — image + specs */}
          <View style={s.leftCol}>
            <Image
              style={s.phoneImage}
              src="/images/renders/shop/studio/01-three-quarter.jpg"
            />

            <View style={s.section}>
              <Text style={s.label}>Who it&apos;s for</Text>
              <Text style={s.bodyText}>
                Kids 6–16. Parents who want connection without compromise.
                Families navigating the gap between too young for a smartphone
                and ready for one.
              </Text>
            </View>

            <View style={s.rule} />

            <View style={s.founderBox}>
              <Text style={s.label}>Founder</Text>
              <Text style={s.founderName}>Thomas O&apos;Connell</Text>
              <Text style={s.founderRole}>CEO + Founder</Text>
              <Text style={s.bodyText}>
                Thomas spent 20 years building brands for Nike, LEGO, and Google — organizations
                very good at capturing attention. Then he had kids and watched the same machinery
                get aimed at them. LOUP is what he built instead.
              </Text>
            </View>
          </View>

          {/* Right column — all text */}
          <View style={s.rightCol}>

            {/* Problem */}
            <View style={s.section}>
              <Text style={s.label}>The problem</Text>
              <Text style={s.headline}>
                The first phone used to be a rite of passage.{"\n"}Now it&apos;s a liability.
              </Text>
              <Text style={s.bodyText}>
                A portal to attention merchants, social comparison, and algorithmically-optimized
                distraction. Parents know it. Kids feel it. And for a decade, the only available
                answer has been parental controls layered onto a device that was never designed
                to be controlled. The category that should exist — a purposeful first phone —
                didn&apos;t. Until now.
              </Text>
            </View>

            <View style={s.rule} />

            {/* What it is */}
            <View style={s.section}>
              <Text style={s.label}>What LOUP is</Text>
              <Text style={{...s.bodyText, color: C.ink}}>
                LOUP is a WiFi voice device for kids — calls only, to the people parents have
                approved, and nobody else. No texts, no internet, no apps, no feeds, no
                algorithm deciding what comes next. The hardware is purpose-built: anodized
                aluminum frame, tactile rotary scroll dial, e-ink display. v1 is WiFi-only.
                v2 adds LTE — same closed contact list, cellular range.
              </Text>
            </View>

            <View style={s.rule} />

            {/* How it works */}
            <View style={s.section}>
              <Text style={s.label}>How it works</Text>
              <View style={s.step}>
                <Text style={s.stepNum}>01</Text>
                <Text style={s.stepText}>
                  Parents whitelist contacts in the companion app. Nobody outside the list
                  can call in or out.
                </Text>
              </View>
              <View style={s.step}>
                <Text style={s.stepNum}>02</Text>
                <Text style={s.stepText}>
                  Kids scroll the dial, find a name, press call. That&apos;s the whole interface.
                </Text>
              </View>
              <View style={s.step}>
                <Text style={s.stepNum}>03</Text>
                <Text style={s.stepText}>
                  Quiet hours, schedules, and parent-to-device paging all live in the companion
                  app. Setup takes about ten minutes.
                </Text>
              </View>
            </View>

            <View style={s.rule} />

            {/* Hardware */}
            <View style={s.section}>
              <Text style={s.label}>The hardware</Text>
              <Text style={s.bodyText}>
                Anodized aluminum frame. E-ink display — no glow, no video, no algorithm.
                Tactile scroll dial. Designed to be held, carried, and kept — not stared at.
                This is not a plastic toy. It is a considered object built for the space
                between a walkie-talkie and a smartphone.
              </Text>
            </View>

            <View style={s.rule} />

            {/* Specs */}
            <View style={{ marginBottom: 4 }}>
              <Text style={s.label}>At a glance</Text>
              <View style={s.specsGrid}>
                {[
                  ["Category", "Screenless voice phone"],
                  ["Display", "E-ink, no glow"],
                  ["Connectivity", "WiFi (v1) · LTE (v2)"],
                  ["Calling", "Approved contacts only"],
                  ["Price", "WiFi $149 · LTE $199"],
                  ["Monthly", "WiFi $10 · LTE $20"],
                  ["Ages", "6–16"],
                  ["Ships", "Within 60 days"],
                ].map(([label, value]) => (
                  <View key={label} style={s.specCell}>
                    <Text style={s.specLabel}>{label}</Text>
                    <Text style={s.specValue}>{value}</Text>
                  </View>
                ))}
              </View>
            </View>

          </View>
        </View>

        {/* Footer */}
        <View style={s.footer}>
          <View>
            <Text style={{...s.footerContact, fontFamily: "Helvetica-Bold"}}>
              Press contact
            </Text>
            <Text style={s.footerContact}>hi@loupkids.com · loupkids.com</Text>
          </View>
          <View>
            <Text style={s.footerNote}>High-res images and product renders available on request.</Text>
            <Text style={s.footerNote}>Founder available for interview.</Text>
          </View>
        </View>

      </Page>
    </Document>
  );
}

// ── Download Button ────────────────────────────────────────────────────────────

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
