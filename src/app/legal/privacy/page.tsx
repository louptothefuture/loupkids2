import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: `${SITE.url}/legal/privacy` },
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="July 1, 2026">
      <p>
        LOUP (&quot;we,&quot; &quot;us&quot;) collects only what we need to ship your device, provide
        calling services, and operate the parent app. We do not sell personal data. We do not run
        ads. We do not build engagement profiles of your child.
      </p>
      <h2 className="display mt-8 text-2xl text-ink">What we collect</h2>
      <p>
        Account email, order and shipping information, approved contact lists you configure, and
        optional location check-ins if you enable them. Voice messages are end-to-end encrypted.
      </p>
      <h2 className="display mt-8 text-2xl text-ink">Children&apos;s privacy</h2>
      <p>
        LOUP is designed for kids under 13 with verifiable parental consent. See our{" "}
        <a href="/legal/coppa" className="underline">
          COPPA compliance
        </a>{" "}
        page for details.
      </p>
      <h2 className="display mt-8 text-2xl text-ink">Contact</h2>
      <p>
        Questions: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>
    </LegalLayout>
  );
}
