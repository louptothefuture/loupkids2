"use client";

import { Document, Page, View, Text, StyleSheet, pdf } from "@react-pdf/renderer";
import { useState } from "react";
import {
  COMPARE_PHONES,
  COMPARE_ROWS,
  COMPARE_SECTIONS,
} from "@/lib/content/loupkids-compare-phones";

// A4 landscape: 841.89 × 595.28 pt  |  margins: 24 top, 20 bottom, 28 sides
// Usable: 785 × 551 pt
// Label col: 112pt  |  10 data cols: (785-112)/10 = 67.3pt each

const LABEL_W = 112;
const DATA_W = 67;
const C = { ink: "#111", white: "#fff", loup: "#111", muted: "#555", faint: "#999", line: "#ddd", bg: "#f7f7f5" };

const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    backgroundColor: C.white,
    paddingHorizontal: 28,
    paddingTop: 22,
    paddingBottom: 18,
    fontSize: 6,
  },
  // Masthead
  masthead: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end",
    borderBottomWidth: 1.5, borderBottomColor: C.ink, paddingBottom: 5, marginBottom: 8,
  },
  title: { fontSize: 16, fontFamily: "Helvetica-Bold", letterSpacing: -0.3 },
  subtitle: { fontSize: 6.5, color: C.muted, marginTop: 1.5 },
  mastRight: { textAlign: "right", fontSize: 6, color: C.faint, lineHeight: 1.5 },

  // Column header row
  headerRow: { flexDirection: "row", marginBottom: 0 },
  headerLabel: {
    width: LABEL_W, minWidth: LABEL_W,
    paddingHorizontal: 5, paddingBottom: 4, paddingTop: 2,
    borderBottomWidth: 1, borderBottomColor: C.ink,
  },
  headerCell: {
    width: DATA_W, minWidth: DATA_W,
    paddingHorizontal: 4, paddingBottom: 4, paddingTop: 2,
    borderBottomWidth: 1, borderBottomColor: C.ink,
  },
  headerCellLoup: {
    width: DATA_W, minWidth: DATA_W,
    paddingHorizontal: 4, paddingBottom: 4, paddingTop: 2,
    backgroundColor: C.loup,
    borderBottomWidth: 1, borderBottomColor: C.ink,
  },
  colName: { fontSize: 7, fontFamily: "Helvetica-Bold", lineHeight: 1.2 },
  colNameLoup: { fontSize: 7, fontFamily: "Helvetica-Bold", color: C.white, lineHeight: 1.2 },
  colSub: { fontSize: 5.5, color: C.muted, marginTop: 1 },
  colSubLoup: { fontSize: 5.5, color: "rgba(255,255,255,0.6)", marginTop: 1 },

  // Section header
  sectionRow: { flexDirection: "row" },
  sectionCell: {
    paddingHorizontal: 5, paddingTop: 5, paddingBottom: 2,
    backgroundColor: C.bg,
  },
  sectionLabel: { fontSize: 5.5, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 1.2, color: C.ink },

  // Data rows
  dataRow: { flexDirection: "row", borderBottomWidth: 0.4, borderBottomColor: C.line },
  labelCell: {
    width: LABEL_W, minWidth: LABEL_W,
    paddingHorizontal: 5, paddingVertical: 3.5,
    backgroundColor: C.white,
  },
  labelText: { fontSize: 6, color: C.ink, lineHeight: 1.4 },
  dataCell: { width: DATA_W, minWidth: DATA_W, paddingHorizontal: 4, paddingVertical: 3.5 },
  dataCellLoup: { width: DATA_W, minWidth: DATA_W, paddingHorizontal: 4, paddingVertical: 3.5, backgroundColor: C.loup },
  dataText: { fontSize: 5.5, color: C.muted, lineHeight: 1.4 },
  dataTextLoup: { fontSize: 5.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.4 },
  dataTextYes: { fontSize: 5.5, color: "#059669", fontFamily: "Helvetica-Bold", lineHeight: 1.4 },
  dataTextNo: { fontSize: 5.5, color: C.faint, lineHeight: 1.4 },
  dataTextYesLoup: { fontSize: 5.5, color: "#6ee7b7", fontFamily: "Helvetica-Bold", lineHeight: 1.4 },

  // Footer
  footer: {
    flexDirection: "row", justifyContent: "space-between",
    borderTopWidth: 1, borderTopColor: C.ink, paddingTop: 5, marginTop: 5,
  },
  footerText: { fontSize: 5.5, color: C.faint },
});

function renderVal(val: { kind: string; label?: string } | undefined, isLoup: boolean) {
  if (!val) return <Text style={isLoup ? s.dataTextLoup : s.dataText}>—</Text>;
  switch (val.kind) {
    case "yes": return <Text style={isLoup ? s.dataTextYesLoup : s.dataTextYes}>Yes</Text>;
    case "no": return <Text style={isLoup ? { ...s.dataTextLoup, color: "rgba(255,255,255,0.35)" } : s.dataTextNo}>No</Text>;
    case "partial": return <Text style={isLoup ? s.dataTextLoup : s.dataText}>{val.label}</Text>;
    case "text": return <Text style={isLoup ? { ...s.dataTextLoup, color: "rgba(255,255,255,0.9)", fontFamily: "Helvetica-Bold" } : { ...s.dataText, color: C.ink, fontFamily: "Helvetica-Bold" }}>{val.label}</Text>;
  }
}

function CompareDoc() {
  // Split rows into two halves for two pages
  const allRows = COMPARE_ROWS;
  const half = Math.ceil(allRows.length / 2);
  const page1Rows = allRows.slice(0, half);
  const page2Rows = allRows.slice(half);

  const PageContent = ({ rows, showMasthead }: { rows: typeof COMPARE_ROWS, showMasthead: boolean }) => (
    <Page size="A4" orientation="landscape" style={s.page}>
      {showMasthead && (
        <View style={s.masthead}>
          <View>
            <Text style={s.title}>LOUP vs. every alternative.</Text>
            <Text style={s.subtitle}>Device price · monthly cost · what kids can access · privacy · calling</Text>
          </View>
          <View>
            <Text style={s.mastRight}>loupkids.com/phones</Text>
            <Text style={s.mastRight}>Prices current September 2026</Text>
          </View>
        </View>
      )}
      {!showMasthead && (
        <View style={{ borderBottomWidth: 1, borderBottomColor: C.line, marginBottom: 8, paddingBottom: 4 }}>
          <Text style={{ fontSize: 8, fontFamily: "Helvetica-Bold" }}>LOUP vs. every alternative — continued</Text>
        </View>
      )}

      {/* Column headers */}
      <View style={s.headerRow}>
        <View style={s.headerLabel} />
        {COMPARE_PHONES.map((p) => (
          <View key={p.id} style={p.isLoup ? s.headerCellLoup : s.headerCell}>
            <Text style={p.isLoup ? s.colNameLoup : s.colName}>{p.nameShort}</Text>
            <Text style={p.isLoup ? s.colSubLoup : s.colSub}>{p.device}</Text>
            <Text style={p.isLoup ? { ...s.colSubLoup, fontFamily: "Helvetica-Bold" } : { ...s.colSub, fontFamily: "Helvetica-Bold" }}>
              {p.monthly}
            </Text>
          </View>
        ))}
      </View>

      {/* Rows grouped by section */}
      {COMPARE_SECTIONS.map((section) => {
        const sectionRows = rows.filter((r) => r.section === section);
        if (!sectionRows.length) return null;
        return (
          <View key={section}>
            {/* Section label */}
            <View style={s.sectionRow}>
              <View style={{ ...s.sectionCell, width: 785 }}>
                <Text style={s.sectionLabel}>{section}</Text>
              </View>
            </View>
            {/* Data rows */}
            {sectionRows.map((row) => (
              <View key={row.label} style={s.dataRow}>
                <View style={s.labelCell}>
                  <Text style={s.labelText}>{row.label}</Text>
                </View>
                {COMPARE_PHONES.map((phone, ci) => (
                  <View key={phone.id} style={phone.isLoup ? s.dataCellLoup : s.dataCell}>
                    {renderVal(row.values[ci], phone.isLoup)}
                  </View>
                ))}
              </View>
            ))}
          </View>
        );
      })}

      {/* Footer (only on last page) */}
      {!showMasthead && (
        <View style={s.footer}>
          <Text style={s.footerText}>Sources: gabb.com · myticktalk.com · pinwheel.com · bark.us · relaygo.com · FTC.gov · loupkids.com/phones</Text>
          <Text style={s.footerText}>loupkids.com · hi@loupkids.com</Text>
        </View>
      )}
    </Page>
  );

  return (
    <Document title="LOUP vs. Every Alternative" author="LOUP">
      <PageContent rows={page1Rows} showMasthead={true} />
      <PageContent rows={page2Rows} showMasthead={false} />
    </Document>
  );
}

export function ComparisonDownload() {
  const [loading, setLoading] = useState(false);

  const download = async () => {
    setLoading(true);
    try {
      const blob = await pdf(<CompareDoc />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "LOUP-Comparison-2026.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button type="button" onClick={download} disabled={loading}
      className="lk-btn lk-btn-sm disabled:opacity-60">
      {loading ? "Generating PDF…" : "Download Comparison PDF"}
    </button>
  );
}
