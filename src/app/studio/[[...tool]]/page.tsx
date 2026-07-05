"use client";

import dynamic from "next/dynamic";
import config from "../../../../sanity.config";

const NextStudio = dynamic(
  () => import("next-sanity/studio").then((m) => m.NextStudio),
  { ssr: false },
);

export default function StudioPage() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24">
        <h1 className="display text-4xl">Studio not connected yet</h1>
        <p className="mt-4 text-ink-soft">
          Create a free project at{" "}
          <a className="underline" href="https://sanity.io/manage">
            sanity.io/manage
          </a>{" "}
          then set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{" "}
          <code>NEXT_PUBLIC_SANITY_DATASET</code> in your environment. The full
          editing studio will appear at this URL — no code needed after that.
        </p>
      </div>
    );
  }
  return <NextStudio config={config} />;
}
