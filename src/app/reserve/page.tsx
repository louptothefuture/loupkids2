import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Order Loup",
  description:
    "Order Loup for $129 — First 500. Loup↔Loup always free. First 500: 1 year unlimited calls to external contacts · then $10/mo. Ships within 60 days.",
  alternates: { canonical: `${SITE.url}/shop/loup` },
  robots: { index: false, follow: true },
};

/** Legacy waitlist URL — send buyers to the live PDP. */
export default function ReservePage() {
  redirect("/shop/loup");
}
