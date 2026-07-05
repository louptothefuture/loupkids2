"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FEATURE_ICONS } from "@/lib/content/architecture";
import { ProductFloat } from "@/components/landing/ProductFloat";
import { PopHeadline, PopLabel } from "@/components/typography/PopType";

export function PhoneSection() {
  return (
    <section id="phone" className="relative overflow-hidden bg-block-fuchsia py-24 text-white">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <PopLabel className="mb-3 block text-white/80">It&apos;s a phone</PopLabel>
            <PopHeadline as="h2" size="xl">
              Select.
              <br />
              Call.
              <br />
              Talk.
            </PopHeadline>
            <p className="mt-5 text-lg font-semibold text-white">
              Real calls — not push-to-talk. Approved contacts only. No apps. No algorithms.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {FEATURE_ICONS.slice(0, 4).map((f) => (
                <motion.div
                  key={f.title}
                  whileHover={{ y: -4 }}
                  className="pop-card bg-white p-4 text-ink"
                >
                  <p className="text-sm font-black uppercase">{f.title}</p>
                  <p className="mt-1 text-xs font-semibold text-ink/75">{f.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <ProductFloat
            src="/images/product/loup-three-quarter.jpg"
            alt="LOUP — select, call, talk"
          />
        </div>
      </div>
    </section>
  );
}

export function NothingSection() {
  return (
    <section id="nothing" className="relative overflow-hidden bg-block-coral py-24 text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <ProductFloat src="/images/product/loup-black-front.jpg" alt="LOUP in black" />
        <div className="text-center lg:text-left">
          <PopLabel className="mb-3 block text-white/80">Chock full of nothing</PopLabel>
          <PopHeadline as="h2" size="xl">
            Nothing
            <br />
            to scroll.
          </PopHeadline>
          <p className="mt-4 text-lg font-semibold text-white">
            No social media. No games. No rabbit holes.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            {["Social", "Games", "Feeds", "Ads", "Algorithms"].map((w) => (
              <span
                key={w}
                className="rounded-full border-2 border-white/40 bg-white/15 px-4 py-2 text-sm font-bold uppercase line-through"
              >
                {w}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function StoryTeaserSection() {
  return (
    <section className="relative bg-white py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <PopLabel className="mb-3 block text-ink/70">Our story</PopLabel>
        <PopHeadline as="h2" size="lg" tone="dark">
          Kids don&apos;t need
          <br />
          less connection.
        </PopHeadline>
        <p className="display mx-auto mt-3 text-2xl text-block-fuchsia sm:text-3xl">They need better.</p>
        <p className="mx-auto mt-5 max-w-xl font-semibold text-ink/75">
          We kept putting off the phone — then built the device that does the opposite.
        </p>
        <motion.div whileHover={{ scale: 1.03 }} className="mt-8 inline-block">
          <Link
            href="/story"
            className="inline-flex rounded-full border-[3px] border-ink bg-block-ink px-8 py-3.5 text-sm font-black uppercase text-white shadow-[4px_4px_0_#1e4bff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Read the whole story →
          </Link>
        </motion.div>
        <div className="pop-card pop-card-tilt-right relative mx-auto mt-12 aspect-[21/9] max-w-2xl overflow-hidden">
          <Image
            src="/images/lifestyle/kids-stoop.jpg"
            alt="Kids connected with LOUP"
            fill
            className="object-cover"
            sizes="672px"
          />
        </div>
      </div>
    </section>
  );
}
