import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Launch Campaign | Your Phone. Not a Feed.",
  description:
    "LOUP is a real phone for kids 10–12 — calls, mute button, approved contacts only. No apps, no scroll. Pre-order $129.",
  alternates: { canonical: `${SITE.url}/` },
  robots: { index: false },
};

/** Campaign chrome lives in /home-full legacy; keep /launch out of the prod graph. */
export default function LaunchPage() {
  redirect("/");
}
