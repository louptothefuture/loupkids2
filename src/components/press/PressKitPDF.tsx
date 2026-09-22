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
  bg: "#f5f5f3",
  white: "#ffffff",
};

// A4: 595 × 842 pt  |  margins: 32 top, 28 bottom, 36 sides
// Usable: 523 × 782 pt
// Left: 186pt  Gutter: 16pt  Right: 321pt
// Masthead: 44pt  Footer: 34pt  Body: ~668pt

const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    backgroundColor: C.white,
    paddingTop: 32,
    paddingBottom: 28,
    paddingHorizontal: 36,
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
    paddingBottom: 7,
    marginBottom: 12,
  },
  wordmark: { fontSize: 32, fontFamily: "Helvetica-Bold", letterSpacing: -0.6, lineHeight: 1 },
  mastheadEyebrow: { fontSize: 6, textTransform: "uppercase", letterSpacing: 1.4, color: C.faint, marginBottom: 2 },
  tagline: { fontSize: 7, color: C.muted, marginTop: 2 },
  contactBlock: { textAlign: "right", fontSize: 6.5, color: C.muted, lineHeight: 1.6 },

  // Body layout
  body: { flexDirection: "row" },
  leftCol: { width: 186, flexDirection: "column" },
  gutter: { width: 16 },
  rightCol: { width: 321, flexDirection: "column", justifyContent: "space-between" },

  // Type
  label: {
    fontSize: 5.5, fontFamily: "Helvetica-Bold",
    textTransform: "uppercase", letterSpacing: 1.5,
    color: C.faint, marginBottom: 3,
  },
  headline: {
    fontSize: 16, fontFamily: "Helvetica-Bold",
    lineHeight: 1.2, letterSpacing: -0.3,
    color: C.ink, marginBottom: 6,
  },
  bodyText: { fontSize: 8, lineHeight: 1.6, color: C.muted },
  bodyDark: { fontSize: 8, lineHeight: 1.6, color: C.ink },

  rule: { borderTopWidth: 0.5, borderTopColor: C.line, marginVertical: 8 },

  // Stats strip
  statsRow: {
    flexDirection: "row",
    borderTopWidth: 0.5, borderBottomWidth: 0.5,
    borderColor: C.line,
    paddingVertical: 7,
    marginBottom: 9,
    gap: 0,
  },
  statCell: { flex: 1 },
  statNum: { fontSize: 14, fontFamily: "Helvetica-Bold", color: C.ink, lineHeight: 1 },
  statLabel: { fontSize: 5.5, color: C.faint, marginTop: 2, lineHeight: 1.4 },

  // Enemy / pull quote
  enemyBlock: {
    borderLeftWidth: 2, borderLeftColor: C.ink,
    paddingLeft: 8, marginBottom: 9,
  },

  // Steps
  stepRow: { flexDirection: "row", gap: 5, marginBottom: 4 },
  stepNum: { fontSize: 6.5, fontFamily: "Helvetica-Bold", color: C.ink, width: 12 },
  stepText: { flex: 1, fontSize: 8, lineHeight: 1.55, color: C.muted },

  // Specs
  specsGrid: { flexDirection: "row", flexWrap: "wrap" },
  specCell: { width: "50%", marginBottom: 5, paddingRight: 6 },
  specLabel: { fontSize: 5, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 1.2, color: C.faint },
  specValue: { fontSize: 7, color: C.ink, marginTop: 1 },

  // Founder
  founderBlock: { backgroundColor: C.bg, borderRadius: 3, padding: 8 },
  founderName: { fontSize: 9, fontFamily: "Helvetica-Bold", marginBottom: 0.5 },
  founderRole: { fontSize: 5.5, color: C.faint, marginBottom: 4 },

  // Footer
  footer: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end",
    borderTopWidth: 1.5, borderTopColor: C.ink,
    paddingTop: 7, marginTop: 10,
  },
  footerLeft: { fontSize: 7, lineHeight: 1.6 },
  footerRight: { fontSize: 5.5, color: C.faint, textAlign: "right", lineHeight: 1.7 },
});

function PressKitDocument() {
  return (
    <Document title="LOUP Media Kit 2026" author="LOUP">
      <Page size="A4" orientation="portrait" style={s.page}>

        {/* Masthead */}
        <View style={s.masthead}>
          <View>
            <Text style={s.mastheadEyebrow}>2026</Text>
            <Text style={s.wordmark}>LOUP</Text>
            <Text style={s.tagline}>Phones for the anti-screen age.</Text>
          </View>
          <View>
            <Text style={s.contactBlock}>loupkids.com</Text>
            <Text style={s.contactBlock}>hi@loupkids.com</Text>
          </View>
        </View>

        {/* Body */}
        <View style={s.body}>

          {/* ── LEFT COLUMN ── */}
          <View style={s.leftCol}>
            <Image
              style={{ width: 186, height: 248, objectFit: "cover", objectPosition: "center top", borderRadius: 3 }}
              src="/images/press-hand-hi.jpg"
            />

            <View style={{ marginTop: 10 }}>
              <Text style={s.label}>Who it&apos;s for</Text>
              <Text style={s.bodyText}>
                Kids 6–16. Families in the gap between too young for a smartphone
                and ready for one — which is most families.
              </Text>
            </View>

            <View style={s.rule} />

            {/* Founder */}
            <View style={s.founderBlock}>
              <Text style={s.label}>Founders</Text>
              <Text style={s.founderName}>Thomas O&apos;Connell</Text>
              <Text style={s.founderRole}>CEO + Founder</Text>
              <Text style={s.bodyText}>
                When Thomas and his wife became parents, the pressure to hand kids a
                phone arrived years before it should have. Thomas had spent 20 years
                building attention machinery — brand strategy for Nike, LEGO, Google.
                His wife watched the same forces shape their kids&apos; world from the
                other side. The answer they needed didn&apos;t exist. So they built it.
              </Text>
            </View>

            <View style={{ marginTop: 9 }}>
              <Text style={s.label}>At a glance</Text>
              <View style={s.specsGrid}>
                {[
                  ["Category", "Screenless voice phone"],
                  ["Display", "E-ink, no glow"],
                  ["Connectivity", "WiFi · WiFi + LTE"],
                  ["Calling", "Approved contacts only"],
                  ["Price", "From $149 pre-order"],
                  ["Monthly", "From $10/mo"],
                ].map(([l, v]) => (
                  <View key={l} style={s.specCell}>
                    <Text style={s.specLabel}>{l}</Text>
                    <Text style={s.specValue}>{v}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Gutter */}
          <View style={s.gutter} />

          {/* ── RIGHT COLUMN ── */}
          <View style={s.rightCol}>

            {/* Stats strip */}
            <View style={s.statsRow}>
              {[
                ["80%", "of parents feel pushed to buy their kid a smartphone before they're ready"],
                ["5.5 hrs", "of screens every day for the average 8–12 year old"],
                ["$27B", "global market for kids' connected devices — growing 18% a year, six times faster than all of tech"],
                ["Worldwide", "Australia, France, UK, Spain. Governments are banning phones in schools. The window is open."],
              ].map(([n, l]) => (
                <View key={n} style={s.statCell}>
                  <Text style={s.statNum}>{n}</Text>
                  <Text style={s.statLabel}>{l}</Text>
                </View>
              ))}
            </View>

            {/* The problem */}
            <View style={{ marginBottom: 8 }}>
              <Text style={s.label}>The problem</Text>
              <Text style={s.headline}>
                The first phone used to be a rite of passage.{"\n"}
                Now it&apos;s a liability.
              </Text>
              <Text style={s.bodyText}>
                A portal to attention merchants, social comparison, and
                algorithmically-optimized distraction. Parents know it. Kids feel it.
                And the pressure to hand one over — for safety, for logistics, for not
                being the only family that hasn&apos;t — arrives years before it should.
              </Text>
            </View>

            {/* The enemy */}
            <View style={s.enemyBlock}>
              <Text style={s.label}>Big tech knows</Text>
              <Text style={{ ...s.bodyDark, fontSize: 8.5, fontFamily: "Helvetica-Bold", marginBottom: 3 }}>
                They designed it this way.
              </Text>
              <Text style={s.bodyText}>
                Meta&apos;s own internal research showed Instagram was harming teenage
                girls&apos; mental health. They kept going. The feeds, the loops, the
                dopamine hits — none of it is accidental. Attention is the product.
                Children are the market. The industry monetizes the anxiety it creates.
              </Text>
            </View>

            <View style={s.rule} />

            {/* Alternatives */}
            <View style={{ marginBottom: 8 }}>
              <Text style={s.label}>The alternatives are bandaids</Text>
              <Text style={s.bodyText}>
                Gabb and TickTalk remove the apps but keep the architecture — lobotomized
                smartphones, designed for 5-year-olds, that require carrier plans and
                continuously GPS-track children. They&apos;re not a philosophy.
                They&apos;re a workaround. LOUP is built from the ground up.
              </Text>
            </View>

            <View style={s.rule} />

            {/* What LOUP is */}
            <View style={{ marginBottom: 8 }}>
              <Text style={s.label}>What LOUP is</Text>
              <Text style={s.bodyDark}>
                A WiFi voice device for kids — calls only, to approved contacts.
                No texts, no internet, no apps, no feeds. Anodized aluminum frame,
                e-ink display, tactile scroll dial. v1 WiFi-only. v2 adds LTE — same
                closed contact list, cellular range.
              </Text>
            </View>

            <View style={s.rule} />

            {/* How it works */}
            <View style={{ marginBottom: 8 }}>
              <Text style={s.label}>How it works</Text>
              <View style={s.stepRow}>
                <Text style={s.stepNum}>01</Text>
                <Text style={s.stepText}>Parents whitelist contacts. Nobody else can call in or out.</Text>
              </View>
              <View style={s.stepRow}>
                <Text style={s.stepNum}>02</Text>
                <Text style={s.stepText}>Kids scroll the dial, find a name, press call. That&apos;s it.</Text>
              </View>
              <View style={s.stepRow}>
                <Text style={s.stepNum}>03</Text>
                <Text style={s.stepText}>Quiet hours, schedules, parent paging. Setup: ten minutes.</Text>
              </View>
            </View>

          </View>
        </View>

        {/* Footer */}
        <View style={s.footer}>
          <View>
            <Text style={{ ...s.footerLeft, fontFamily: "Helvetica-Bold" }}>Press contact</Text>
            <Text style={s.footerLeft}>hi@loupkids.com · loupkids.com</Text>
          </View>
          <View>
            <Text style={s.footerRight}>High-res images and product renders available on request.</Text>
            <Text style={s.footerRight}>Founders available for interview.</Text>
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
    <button type="button" onClick={download} disabled={loading}
      className="lk-btn lk-btn-sm disabled:opacity-60">
      {loading ? "Generating PDF…" : "Download Media Kit PDF"}
    </button>
  );
}
