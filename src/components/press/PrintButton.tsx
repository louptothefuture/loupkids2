"use client";

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="lk-btn lk-btn-sm">
      Save as PDF
    </button>
  );
}
