import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/LandingPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Launch Campaign | Your Phone. Not a Feed.",
  description:
    "LOUP is a real phone for kids 10–12 — calls, mute button, approved contacts only. No apps, no scroll. Pre-order $149.",
  alternates: { canonical: `${SITE.url}/launch` },
  robots: { index: false },
};

export default function LaunchPage() {
  return <LandingPage />;
}
