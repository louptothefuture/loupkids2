import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Setup Guide",
  description: "Step-by-step LOUP setup — Wi-Fi, contacts, quiet hours, and your first call.",
  alternates: { canonical: `${SITE.url}/setup` },
};

const STEPS = [
  {
    step: "1",
    title: "Unbox & charge",
    body: "Plug LOUP in with the included USB-C cable. While it charges, download the LOUP parent app on iOS or Android.",
  },
  {
    step: "2",
    title: "Connect to Wi-Fi",
    body: "Follow the in-app wizard to connect LOUP to your home Wi-Fi. School Wi-Fi can be added later from the app.",
  },
  {
    step: "3",
    title: "Approve contacts",
    body: "Add the people your kid can call — parents, grandparents, trusted friends. Only approved contacts can reach LOUP.",
  },
  {
    step: "4",
    title: "Set quiet hours",
    body: "Homework time, dinner, bedtime — set windows when LOUP won't ring or send. You can override anytime.",
  },
  {
    step: "5",
    title: "First call",
    body: "Scroll the dial to pick a contact, press the call bar to talk, mute when you need quiet. That's it — a phone, not an app.",
  },
];

export default function SetupPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <Reveal>
        <p className="label-mono text-loup-red">Support / setup guide</p>
        <h1 className="display mt-2 text-6xl">Setup guide</h1>
        <p className="mt-4 text-ink-soft">
          From box to first call in about ten minutes. Video walkthrough coming at launch — for now,
          follow these steps.
        </p>
      </Reveal>
      <ol className="mt-12 space-y-6">
        {STEPS.map((s, i) => (
          <Reveal key={s.step} delay={i * 0.05}>
            <li className="flex gap-6 rounded-2xl border-2 border-ink bg-paper p-6 shadow-sticker-sm">
              <span className="display flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-sun text-xl">
                {s.step}
              </span>
              <div>
                <h2 className="display text-2xl">{s.title}</h2>
                <p className="mt-2 text-sm text-ink-soft">{s.body}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
      <Reveal delay={0.2}>
        <p className="mt-10 text-sm text-ink-soft">
          Stuck? Browse the{" "}
          <Link href="/help" className="underline">
            knowledge base
          </Link>{" "}
          or{" "}
          <Link href="/contact" className="underline">
            contact support
          </Link>
          .
        </p>
      </Reveal>
    </div>
  );
}
