import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Order Loup",
  description:
    "Order Loup for $129 — First 500. Year 1 unlimited domestic included, then $10/mo. Ships within 60 days.",
  alternates: { canonical: `${SITE.url}/shop/loup` },
  robots: { index: false, follow: true },
};

/** Legacy waitlist URL — send buyers to the live PDP. */
export default function ReservePage() {
  redirect("/shop/loup");
}
