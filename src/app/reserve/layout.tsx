import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pre-order LOUP",
  description: "Order Loup — First 500 pricing. Ships within 60 days.",
  alternates: { canonical: `${SITE.url}/reserve` },
};

export default function ReserveLayout({ children }: { children: React.ReactNode }) {
  return children;
}
