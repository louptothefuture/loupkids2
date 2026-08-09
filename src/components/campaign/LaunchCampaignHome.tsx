import Link from "next/link";
import {
  LOUPKIDS_CTA,
  LOUPKIDS_GUARANTEE,
  LOUPKIDS_PRICE,
  LOUPKIDS_SHIPPING,
} from "@/lib/content/loupkids-conversion";
import { LOUPKIDS_CONVERT, LOUPKIDS_CONVERT_ANTI } from "@/lib/content/loupkids-convert";
import {
  LOUPKIDS_ACCORDION,
  LOUPKIDS_IMAGES,
} from "@/lib/content/loupkids-site";
import { Marquee } from "@/components/Marquee";
import { LoupkidsImage } from "@/components/loupkids/LoupkidsImage";
import { DevCampaignAccordion } from "./DevCampaignAccordion";
import { DevCampaignCallingPricingSection } from "./DevCampaignCallingPricingSection";
import { DevCampaignComparisonSection } from "./DevCampaignComparisonSection";
import { DevCampaignUseCasesSection } from "./DevCampaignUseCasesSection";
import { DevCampaignQuoteBar } from "./DevCampaignQuoteBar";
import { DevConvertStickyCta } from "./DevConvertStickyCta";

const NAV = [
  { href: "/shop/loup", label: "Shop" },
  { href: "/setup", label: "How It Works" },
  { href: "/about", label: "The Story" },
  { href: "/faq", label: "FAQ" },
  { href: "/journal", label: "Journal" },
] as const;

const FEATURE_ITEMS = LOUPKIDS_ACCORDION.slice(0, 4);

const PROOF_STATS = [
  {
    stat: "46%",
    body: "Of teens say they are online almost constantly — families want a calmer first step.",
    cite: "Pew Research 2024",
    citeHref:
      "https://www.pewresearch.org/internet/2024/12/12/teens-social-media-and-technology-2024/",
  },
  {
    stat: "5.5hrs",
    body: "Daily entertainment-screen average for kids 8–12 — room to reclaim play and voice.",
    cite: "Common Sense Media",
  },
  {
    stat: "Play",
    body: "Kids thrive with outdoor play, friendship, and conversation. Loup protects that space.",
  },
] as const;

/** CSS phone shell — blue-stage product pages (matches pitch-card structure). */
function LaunchPhone({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative mx-auto aspect-[10/16] w-full max-w-[280px] sm:max-w-[320px] ${className}`}
      aria-hidden={false}
    >
      <div className="absolute inset-0 rounded-[2rem] bg-[#f4f4f2] shadow-[0_24px_60px_rgba(0,0,0,0.28)] ring-1 ring-black/10">
        {/* side controls */}
        <span className="absolute -right-[6px] top-[28%] h-14 w-[6px] rounded-r-sm bg-[#1a1a1a]" />
        <span className="absolute -right-[5px] top-[48%] h-8 w-[5px] rounded-r-sm bg-[#1a1a1a]" />
        <span className="absolute -left-[5px] top-[32%] h-6 w-[5px] rounded-l-sm bg-[#2a2a2a]" />
        <span className="absolute -left-[5px] top-[42%] h-6 w-[5px] rounded-l-sm bg-[#2a2a2a]" />
        {/* status dots */}
        <div className="absolute left-1/2 top-4 flex -translate-x-1/2 gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-black/15" />
          <span className="h-1.5 w-1.5 rounded-full bg-black/15" />
          <span className="h-1.5 w-1.5 rounded-full bg-black/15" />
        </div>
        {/* screen bed */}
        <div className="absolute inset-[11%_18%_12%_14%] overflow-hidden rounded-sm bg-[#cfcfcf]">
          <div className="relative h-full w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}

function LaunchCta({ light = false }: { light?: boolean }) {
  return (
    <div className="flex flex-col gap-3">
      <Link
        href="/shop/loup"
        className={`inline-flex w-full items-center justify-center rounded-full px-8 py-3.5 text-base font-bold transition sm:w-auto ${
          light
            ? "bg-white text-[var(--launch-blue)] hover:bg-white/90"
            : "bg-[var(--launch-ink)] text-white hover:bg-black/85"
        }`}
      >
        {LOUPKIDS_CTA.primary}
      </Link>
      <p className={`text-sm ${light ? "text-white/75" : "text-black/55"}`}>
        <strong className={light ? "text-white" : "text-black"}>
          {LOUPKIDS_GUARANTEE.title}
        </strong>
        {" — "}
        {LOUPKIDS_SHIPPING.line}.
      </p>
    </div>
  );
}

/**
 * Campaign site copy at /launch — bold blue/coral blocks, Atkinson Hyperlegible.
 * First three pages: (1) blue hero, (2) coral features, (3) white social proof.
 */
export function LaunchCampaignHome() {
  return (
    <div className="launch-campaign">
      {/* ——— Page 1: Blue hero ——— */}
      <section className="relative overflow-hidden bg-[var(--launch-blue)] text-white">
        <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <Link href="/launch" className="text-lg font-bold tracking-tight">
            LOUP
          </Link>
          <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-bold text-white/85 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/shop/loup"
            className="rounded-full border border-white/80 px-4 py-1.5 text-sm font-bold text-white transition hover:bg-white hover:text-[var(--launch-blue)]"
          >
            Order
          </Link>
        </header>

        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-6 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-24 lg:pt-10">
          <div>
            <h1 className="launch-display max-w-xl text-4xl sm:text-5xl lg:text-[3.5rem]">
              Their phone safe from day one
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/85 sm:text-lg">
              Peace of mind for you, real connection for them. A voice-only phone so kids
              can reach their people — and still be kids.
            </p>
            <p className="mt-5 text-sm font-bold text-white/90">
              {LOUPKIDS_PRICE.formatted}{" "}
              <span className="line-through opacity-70">
                {LOUPKIDS_PRICE.compareFormatted}
              </span>
              {" · "}
              {LOUPKIDS_PRICE.launchNote}
            </p>
            <div className="mt-8">
              <LaunchCta light />
            </div>
            <p className="mt-4 text-xs text-white/65">
              Ships within 60 days. 30-day trial starts upon delivery.
            </p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <LaunchPhone>
              <div className="flex h-full flex-col items-center justify-center gap-1 bg-[#d8d8d8] px-3 py-6">
                {"LOUP".split("").map((ch) => (
                  <span
                    key={ch}
                    className="text-4xl font-bold leading-none text-black sm:text-5xl"
                  >
                    {ch}
                  </span>
                ))}
              </div>
            </LaunchPhone>
          </div>
        </div>
      </section>

      {/* ——— Page 2: Coral features ——— */}
      <div className="bg-[var(--launch-coral)] py-4 text-[var(--launch-ink)]">
        <Marquee fast>
          {[...LOUPKIDS_CONVERT_ANTI, "no online bullying", "just safe connection"].map(
            (line) => (
              <span
                key={line}
                className="mx-6 inline-flex items-center gap-5 text-lg font-bold lowercase sm:text-xl"
              >
                {line.replace(/\.$/, "")}
                <span className="opacity-40">·</span>
              </span>
            ),
          )}
        </Marquee>
      </div>

      <section className="bg-[var(--launch-coral)] pb-16 pt-10 text-[var(--launch-ink)] sm:pb-20 sm:pt-14">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="launch-display text-3xl sm:text-4xl lg:text-5xl">
              Made for Kids
              <br />
              Approved by Adults
            </h2>
            <div className="mt-8 [&_.display]:!font-[inherit] [&_.display]:!text-xl sm:[&_.display]:!text-2xl">
              <DevCampaignAccordion items={FEATURE_ITEMS} />
            </div>
          </div>
          <div className="flex justify-center lg:sticky lg:top-10 lg:justify-end">
            <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl bg-black/10">
              <LoupkidsImage
                src="/images/product/loup-silver-front.png"
                alt="Loup side profile — dial and controls"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-contain object-center p-6"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ——— Page 3: White social proof ——— */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <h2 className="launch-display text-3xl text-[var(--launch-coral)] sm:text-4xl">
                You are not alone in wanting a better first phone.
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--launch-coral)] sm:text-lg">
                Parents want kids reachable and free to grow. Loup makes both feel possible.
              </p>
            </div>
            <div className="relative aspect-[5/4] w-full overflow-hidden rounded-3xl bg-[var(--launch-soft)]">
              <LoupkidsImage
                src={LOUPKIDS_IMAGES.kidsPhonesTout}
                alt="Kids together — friends offline and on Loup"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-12 grid gap-6 rounded-3xl bg-[var(--launch-soft)] p-6 sm:grid-cols-3 sm:gap-0 sm:p-8">
            {PROOF_STATS.map((item, i) => (
              <div
                key={item.stat}
                className={`px-2 py-2 sm:px-6 ${i > 0 ? "sm:border-l sm:border-black/10" : ""}`}
              >
                <p className="launch-display text-3xl sm:text-4xl">{item.stat}</p>
                <p className="mt-3 text-sm leading-relaxed text-black/70">{item.body}</p>
                {"cite" in item && item.cite && (
                  <p className="mt-3 text-xs font-bold underline underline-offset-2">
                    {"citeHref" in item && item.citeHref ? (
                      <a href={item.citeHref} target="_blank" rel="noreferrer">
                        {item.cite}
                      </a>
                    ) : (
                      item.cite
                    )}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Rest of site copy — same palette via launch.css ——— */}
      <div className="launch-funnel border-t border-black/10">
        <DevCampaignQuoteBar />
        <DevCampaignComparisonSection />
        <DevCampaignUseCasesSection />
        <DevCampaignCallingPricingSection />

        <section className="bg-[var(--launch-blue)] py-16 text-white sm:py-20">
          <div className="mx-auto max-w-2xl px-5 text-center sm:px-8">
            <h2 className="launch-display text-4xl sm:text-5xl">
              {LOUPKIDS_CONVERT.close.headline}
            </h2>
            <p className="mt-4 text-lg text-white/85">
              Pre-order {LOUPKIDS_PRICE.formatted} — {LOUPKIDS_PRICE.compareFormatted} at
              launch.
            </p>
            <p className="mt-2 text-sm text-white/65">{LOUPKIDS_CONVERT.close.sub}</p>
            <div className="mt-8 flex justify-center">
              <LaunchCta light />
            </div>
            <p className="mt-6 text-sm text-white/70">
              Or{" "}
              <Link href="/shop/loup" className="underline underline-offset-2">
                {LOUPKIDS_CTA.primary}
              </Link>
            </p>
          </div>
        </section>
      </div>

      <DevConvertStickyCta />
      <div className="h-24" aria-hidden="true" />
    </div>
  );
}
