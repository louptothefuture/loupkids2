import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "LOUP vs. every alternative — full comparison",
  description:
    "LOUP vs Gabb, TickTalk, Pinwheel, Bark, Relay, Tin Can, landlines, and smartphones. Every feature, pricing, privacy, and parent control side by side.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE.url}/phones` },
};

export default function PhonesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
