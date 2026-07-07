import Link from "next/link";
import { SITE } from "@/lib/site";

const COLUMNS = [
  {
    heading: "Shop",
    links: [
      { href: "/shop/loup", label: "LOUP Device" },
      { href: "/shop/custom-back-plates", label: "Custom Plates" },
      { href: "/account", label: "Order Tracking" },
    ],
  },
  {
    heading: "Learn",
    links: [
      { href: "/story", label: "Why LOUP" },
      { href: "/blog", label: "Journal" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/press", label: "Press & Media Kit" },
      { href: "/contact", label: "Contact" },
      { href: "/faq#shipping", label: "Shipping & Returns" },
    ],
  },
];

export function DevCampaignFooter() {
  return (
    <footer className="relative border-t-2 border-ink bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <p className="display text-5xl text-white">
              LOUP.
            </p>
            <p className="mt-3 max-w-xs text-sm text-paper/70">
              Phones for the anti-screen age. The phone before their first smartphone.
            </p>
            <div className="mt-5 flex gap-4">
              <a href={SITE.social.instagram} className="label-mono link-underline" rel="noopener">
                IG
              </a>
              <a href={SITE.social.tiktok} className="label-mono link-underline" rel="noopener">
                TikTok
              </a>
              <a href={SITE.social.youtube} className="label-mono link-underline" rel="noopener">
                YT
              </a>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <p className="label-mono mb-4 text-paper/50">{col.heading}</p>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href} className="link-underline text-sm">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-paper/15 pt-6 text-xs text-paper/50 sm:flex-row">
          <p>© {new Date().getFullYear()} LOUP. Less screen. More life.</p>
          <p>
            <a href={`mailto:${SITE.email}`} className="link-underline">
              {SITE.email}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
