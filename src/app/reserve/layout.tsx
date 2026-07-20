import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pre-order LOUP",
  description: "Join the LOUP waitlist for cellular launch or get notified about Wi-Fi batches.",
  alternates: { canonical: `${SITE.url}/reserve` },
};

export default function ReserveLayout({ children }: { children: React.ReactNode }) {
  return children;
}
