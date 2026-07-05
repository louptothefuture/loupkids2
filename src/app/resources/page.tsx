import type { Metadata } from "next";
import Link from "next/link";
import { RESOURCES } from "@/lib/content/architecture";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Parent Resource Hub",
  description: "Guides and research on delaying smartphones, screen time, and kids' first phones — no social media required.",
  alternates: { canonical: `${SITE.url}/resources` },
};

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <Reveal>
        <p className="label-mono text-loup-red">Engagement / parent resources</p>
        <h1 className="display mt-2 text-6xl">Parent resource hub</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">
          On-site guides and research — no external social feeds, no algorithm. Just the stuff we
          wish someone had handed us at the pickup line.
        </p>
      </Reveal>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {RESOURCES.map((item, i) => (
          <Reveal key={item.href} delay={i * 0.05}>
            <Link
              href={item.href}
              className="block rounded-2xl border-2 border-ink bg-paper p-6 shadow-sticker transition-transform hover:-translate-y-1"
            >
              <p className="label-mono text-loup-red">{item.type}</p>
              <h2 className="display mt-2 text-2xl">{item.title}</h2>
            </Link>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.15}>
        <div className="mt-12 rounded-2xl border-2 border-ink bg-ink p-8 text-paper">
          <p className="display text-3xl">More coming weekly</p>
          <p className="mt-3 max-w-lg text-paper/70">
            Downloadable playbooks, school-pact templates, and conversation scripts — all hosted
            here, not on a feed.
          </p>
          <Link href="/journal" className="link-underline label-mono mt-6 inline-block text-sun">
            Browse the journal →
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
