import Link from "next/link";
import { SITE } from "@/lib/site";

const LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/story", label: "Our Story" },
  { href: "/faq", label: "FAQ" },
  { href: "/help", label: "Help" },
  { href: "/contact", label: "Contact" },
];

const LEGAL = [
  { href: "/legal/privacy", label: "Privacy" },
  { href: "/legal/terms", label: "Terms" },
  { href: "/legal/warranty", label: "Warranty" },
];

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-white py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-ink-soft hover:text-ink">
              {l.label}
            </Link>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
          {LEGAL.map((l) => (
            <Link key={l.href} href={l.href} className="text-xs text-ink-soft hover:text-ink">
              {l.label}
            </Link>
          ))}
        </div>
        <p className="mt-6 text-xs text-ink-soft">
          © {new Date().getFullYear()} LOUP ·{" "}
          <a href={`mailto:${SITE.email}`} className="hover:text-ink">
            {SITE.email}
          </a>
        </p>
      </div>
    </footer>
  );
}
