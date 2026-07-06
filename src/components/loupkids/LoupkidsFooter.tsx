"use client";

import Link from "next/link";
import { LOUPKIDS_CTA } from "@/lib/content/loupkids-conversion";
import { LOUPKIDS_FOOTER, LOUPKIDS_FOOTER_NAV } from "@/lib/content/loupkids-site";
import { LOUPKIDS_FOOTER_LEGAL, LOUPKIDS_FOOTER_SUPPORT } from "@/lib/content/loupkids-support";
import { SITE } from "@/lib/site";

function FooterColumn({ title, links }: { title: string; links: readonly { href: string; label: string }[] }) {
  return (
    <div>
      <p className="lk-label mb-3 text-white/45">{title}</p>
      <ul className="space-y-2">
        {links.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-[0.9375rem] text-white/65 transition-colors hover:text-white">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function LoupkidsFooter() {
  return (
    <footer className="lk-section-black border-t border-white/10 px-[var(--lk-section-x)] py-8 text-white sm:py-9">
      <div className="lk-container">
        <p className="mx-auto max-w-xl text-center text-[0.9375rem] leading-snug text-white/70">{LOUPKIDS_FOOTER.body}</p>

        <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <FooterColumn title="Site" links={LOUPKIDS_FOOTER_NAV} />
          <FooterColumn title="Support" links={LOUPKIDS_FOOTER_SUPPORT} />
          <FooterColumn title="Legal" links={LOUPKIDS_FOOTER_LEGAL} />
          <div>
            <p className="lk-label mb-3 text-white/45">Contact</p>
            <ul className="space-y-2 text-[0.9375rem] text-white/65">
              <li>
                <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-white">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.press}`} className="transition-colors hover:text-white">
                  {SITE.press}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="lk-label mb-3 text-white/45">Newsletter</p>
            <p className="text-[0.9375rem] leading-relaxed text-white/65">
              Parent updates, launch news, and journal picks.
            </p>
            <a
              href={`mailto:${SITE.email}?subject=Stay%20in%20The%20Loup`}
              className="lk-read-link mt-3 inline-block text-white/55 hover:text-white"
            >
              {LOUPKIDS_CTA.newsletter}
            </a>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-white/35">© {new Date().getFullYear()} Loup</p>
      </div>
    </footer>
  );
}
