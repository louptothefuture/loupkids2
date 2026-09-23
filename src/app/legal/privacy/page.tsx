import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy — LOUP",
  alternates: { canonical: `${SITE.url}/legal/privacy` },
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="September 1, 2026">
      {/* Plain-language pledge */}
      <div className="rounded-xl border-2 border-[var(--lk-ink)] p-6 not-prose mb-8">
        <p className="font-bold text-lg leading-snug">The short version.</p>
        <p className="mt-3 text-[var(--lk-muted)] leading-relaxed">
          LOUP does not sell your data. LOUP does not sell your child&apos;s data. We do not run ads on the device or in the parent app. We do not build profiles. We collect the minimum necessary to make a phone call work and ship you a device — nothing more.
        </p>
      </div>

      <h2>What we collect</h2>
      <ul>
        <li><strong>Account and order information.</strong> Your name, email, and shipping address — used to create your account, process your order, and contact you about it.</li>
        <li><strong>The contact list you build.</strong> The names and numbers you approve in the parent app. Stored on our servers so the device stays in sync with your settings. You own this list. You can delete it at any time.</li>
        <li><strong>Call logs.</strong> A record of who called whom and when — the same metadata your phone carrier keeps. Not the content of calls. Voice is end-to-end encrypted and not stored.</li>
        <li><strong>Device identifiers.</strong> A serial number that links the device to your account. Used for support, not for advertising.</li>
      </ul>

      <h2>What we do not collect</h2>
      <p>Because of how LOUP is built, there is a lot we simply cannot collect:</p>
      <ul>
        <li><strong>No messages.</strong> LOUP does not support text messaging. There are no messages to collect.</li>
        <li><strong>No photos or videos.</strong> LOUP has no camera. There are no images to collect.</li>
        <li><strong>No browsing history.</strong> LOUP has no browser. There is no browsing history.</li>
        <li><strong>No location data.</strong> LOUP has no GPS. We do not track where your child is. We do not store location history.</li>
        <li><strong>No app usage data.</strong> LOUP has no app store. There are no apps to track.</li>
        <li><strong>No behavioral profiles.</strong> We do not build profiles of your child&apos;s habits, interests, or activity for any purpose — advertising, research, or otherwise.</li>
        <li><strong>No social graph.</strong> We do not know who your child&apos;s friends are, what groups they belong to, or anything about their social life beyond the contact list you created.</li>
      </ul>

      <h2>Children&apos;s privacy</h2>
      <p>
        LOUP is a children&apos;s device. We take this seriously. See our{" "}
        <a href="/legal/coppa">COPPA compliance page</a> for the full picture.
        The summary: we collect only what is necessary to operate the device, we require verifiable parental consent before any child data is collected, and we do not share children&apos;s data with any third party for advertising or profiling — full stop.
      </p>

      <h2>Who we share data with</h2>
      <p>We share data only in these specific cases:</p>
      <ul>
        <li><strong>Service providers.</strong> Companies that help us operate — our cloud infrastructure provider (AWS), payment processor (Stripe), and shipping partner. They process data on our behalf under strict contractual limits and cannot use it for their own purposes.</li>
        <li><strong>Legal requirements.</strong> If required by a court order, subpoena, or applicable law. We will notify you if legally permitted to do so.</li>
        <li><strong>Business transfer.</strong> If LOUP is acquired or merges with another company, your data would transfer to the acquiring entity, and we would notify you before that happens.</li>
      </ul>
      <p>We do not sell data. We do not share data with advertisers. We do not share data with data brokers. We do not share children&apos;s data with any third party beyond the service providers listed above.</p>

      <h2>Analytics on this website</h2>
      <p>
        loupkids.com uses Google Analytics and Meta Pixel to understand how people find and navigate the marketing site. This is website analytics — it has nothing to do with the device or the parent app, and is never used to profile children. You can reject analytics cookies on the cookie banner; the shopping cart still works.
      </p>

      <h2>Your rights</h2>
      <p>You may request access to, correction of, or deletion of any data we hold about you or your child by emailing{" "}<a href={`mailto:${SITE.email}`}>{SITE.email}</a>. We will respond within 30 days.</p>

      <h2>Contact</h2>
      <p>
        Questions about privacy:{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>
    </LegalLayout>
  );
}
