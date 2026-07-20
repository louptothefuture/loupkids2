"use client";

import Link from "next/link";

export function HeroSection() {
  return (
    <section className="bg-block-fuchsia px-4 py-24 text-center text-white">
      <h1 className="text-4xl font-bold">Your phone. Not a feed.</h1>
      <Link href="/shop/loup" className="mt-8 inline-block bg-white px-6 py-3 font-bold text-black">
        Pre-order — $129
      </Link>
    </section>
  );
}

export function PreOrderSection() {
  return (
    <section id="pre-order" className="bg-block-fuchsia px-4 py-24 text-center text-white">
      <h2 className="text-4xl font-bold">Get LOUP.</h2>
      <Link href="/shop/loup" className="mt-8 inline-block bg-white px-6 py-3 font-bold text-black">
        Pre-order now
      </Link>
    </section>
  );
}
