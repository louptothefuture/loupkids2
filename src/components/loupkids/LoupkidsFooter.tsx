"use client";

import Link from "next/link";
import { LOUPKIDS_CTA } from "@/lib/content/loupkids-conversion";
import { LOUPKIDS_FOOTER, LOUPKIDS_FOOTER_NAV } from "@/lib/content/loupkids-site";
import { LOUPKIDS_FOOTER_LEGAL, LOUPKIDS_FOOTER_SUPPORT } from "@/lib/content/loupkids-support";
import { SITE } from "@/lib/site";

function FooterLinks({ links }: { links: readonly { href: string; label: string }[] }) {
  return (
    <ul className="space-y-2.5">
      {links.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className="text-[0.9375rem] text-white/65 transition-colors hover:text-white">
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function LoupkidsFooter({ body }: { body?: string }) {
  const footerBody = body ?? LOUPKIDS_FOOTER.body;
  return (
    <footer className="lk-section-black border-t border-white/10 px-[var(--lk-section-x)] pb-28 pt-12 text-white sm:pb-32 sm:pt-14">
      <div className="lk-container max-w-5xl">
        <p className="max-w-3xl text-pretty text-[1rem] leading-[1.75] text-white/70 sm:text-[1.0625rem]">
          {footerBody}
        </p>

        <div className="mt-12 grid items-start gap-x-10 gap-y-8 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <FooterLinks links={LOUPKIDS_FOOTER_NAV} />
          <FooterLinks links={LOUPKIDS_FOOTER_SUPPORT} />
          <FooterLinks links={LOUPKIDS_FOOTER_LEGAL} />
          <div className="space-y-2.5 text-[0.9375rem] text-white/65">
            <a href={`mailto:${SITE.email}`} className="block transition-colors hover:text-white">
              {SITE.email}
            </a>
            <p className="pt-3 text-sm leading-relaxed">
              Parent updates, launch news, and journal picks.{" "}
              <a
                href={`mailto:${SITE.email}?subject=Stay%20in%20The%20Loup`}
                className="underline underline-offset-4 transition-colors hover:text-white"
              >
                {LOUPKIDS_CTA.newsletter}
              </a>
            </p>
          </div>
        </div>

        <p className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/35">
          © {new Date().getFullYear()} Loup
        </p>
      </div>
    </footer>
  );
}
