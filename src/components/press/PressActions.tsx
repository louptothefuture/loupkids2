"use client";

import dynamic from "next/dynamic";

const PressKitDownload = dynamic(
  () => import("./PressKitPDF").then((m) => m.PressKitDownload),
  { ssr: false, loading: () => <span className="lk-btn lk-btn-sm opacity-50">Loading…</span> },
);

export function PressActions() {
  return <PressKitDownload />;
}
