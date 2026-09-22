"use client";

import dynamic from "next/dynamic";

const ComparisonDownload = dynamic(
  () => import("./ComparisonPDF").then((m) => m.ComparisonDownload),
  { ssr: false, loading: () => <span className="lk-btn lk-btn-sm opacity-50">Loading…</span> },
);

export function ComparisonActions() {
  return <ComparisonDownload />;
}
