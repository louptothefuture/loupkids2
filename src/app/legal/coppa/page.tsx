import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "COPPA Compliance — LOUP",
  alternates: { canonical: `${SITE.url}/legal/coppa` },
};

export default function CoppaPage() {
  return (
    <LegalLayout title="COPPA Compliance" updated="September 1, 2026">
      <div className="rounded-xl border-2 border-[var(--lk-ink)] p-6 not-prose mb-8">
        <p className="font-bold text-lg leading-snug">The short version.</p>
        <p className="mt-3 text-[var(--lk-muted)] leading-relaxed">
          LOUP is a children&apos;s device. We collect only the minimum data needed to operate it. We require parental consent before collecting anything from a child. We do not sell children&apos;s data. We do not share it with advertisers. We do not build profiles of children.
        </p>
      </div>

      <h2>What is COPPA?</h2>
      <p>
        The Children&apos;s Online Privacy Protection Act (COPPA) is a US federal law that limits the data companies can collect from children under 13 without verifiable parental consent. LOUP is designed for children, and we comply with COPPA — not as a minimum standard, but as a design principle.
      </p>

      <h2>Parental consent</h2>
      <p>
        A parent or legal guardian must create the LOUP account and activate the device. No child account is created until a parent completes setup and consents to our data practices. Children cannot create standalone accounts or change their own settings.
      </p>

      <h2>What we collect from children</h2>
      <p>Very little, for specific reasons:</p>
      <ul>
        <li><strong>Device identifier.</strong> A serial number that links the device to the parent account. Used to sync contacts and settings. Not used for advertising.</li>
        <li><strong>Call logs.</strong> A record of who called whom and when — the same metadata any phone carrier retains. Not the content of calls. Voice is end-to-end encrypted and not stored by LOUP.</li>
      </ul>

      <h2>What we do not collect from children</h2>
      <p>
        Because of how LOUP is built, we cannot collect the following — and we do not attempt to:
      </p>
      <ul>
        <li><strong>No messages.</strong> LOUP does not support texting. No message content is ever collected.</li>
        <li><strong>No photos or videos.</strong> LOUP has no camera. No images are ever collected.</li>
        <li><strong>No location data.</strong> LOUP has no GPS. We do not track, store, or share where a child is — ever, on any model.</li>
        <li><strong>No browsing history.</strong> LOUP has no browser. There is no browsing history to collect.</li>
        <li><strong>No app usage.</strong> LOUP has no apps. No usage data is collected.</li>
        <li><strong>No biometrics.</strong> LOUP collects no face data, fingerprints, or voice prints.</li>
        <li><strong>No behavioral profiles.</strong> We do not analyze how children use the device to build advertising profiles or behavioral models.</li>
      </ul>

      <h2>Third parties</h2>
      <p>
        We do not share children&apos;s data with any third party for advertising, marketing, or profiling purposes. We do not use third-party advertising SDKs on the device or in the parent app. The only third parties who may process data are infrastructure providers (AWS for hosting, Stripe for payments) operating under strict data processing agreements that prohibit them from using the data for their own purposes.
      </p>

      <h2>Parental rights</h2>
      <p>Parents may at any time:</p>
      <ul>
        <li>Review any personal information we have collected from their child.</li>
        <li>Request deletion of their child&apos;s data.</li>
        <li>Refuse further collection or use of their child&apos;s data by deactivating the device.</li>
        <li>Revoke consent by contacting us (see below).</li>
      </ul>
      <p>
        We will respond to parental requests within 30 days and will delete data promptly upon a verified request.
      </p>

      <h2>Data retention</h2>
      <p>
        We retain call logs for 90 days to support billing and troubleshooting. They are then deleted. Account data is retained until you request deletion or deactivate your account.
      </p>

      <h2>Contact</h2>
      <p>
        For COPPA-related requests or questions:{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>
    </LegalLayout>
  );
}
