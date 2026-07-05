import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-32 text-center sm:px-6">
      <p className="label-mono text-loup-red">404</p>
      <h1 className="display mt-3 text-7xl">No signal here.</h1>
      <p className="mt-4 text-ink-soft">
        This page doesn&apos;t exist — which, honestly, is very on-brand for us.
      </p>
      <Link href="/" className="btn-sticker mt-8 inline-flex bg-sun px-6 py-3">
        ← Back home
      </Link>
    </div>
  );
}
