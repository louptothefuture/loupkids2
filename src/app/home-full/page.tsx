import type { Metadata } from "next";
import { LoupkidsHomeLegacy } from "@/components/loupkids/LoupkidsHomeLegacy";

export const metadata: Metadata = {
  title: "Loup (full homepage preview)",
  robots: { index: false, follow: false },
};

export default function HomeFullPreviewPage() {
  return <LoupkidsHomeLegacy />;
}
