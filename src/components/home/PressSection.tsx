import Link from "next/link";
import { getPress } from "@/lib/content";
import { PRESS_KIT_FACTS } from "@/lib/content/fallback";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";

export async function PressSection() {
  const press = await getPress();

  return (
    <section id="press" className="border-b border-ink/10 bg-surface py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="label-mono text-steel">Press</p>
          <h2 className="display mt-3 text-4xl sm:text-5xl">Media kit</h2>
        </Reveal>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/press" className="btn-sticker bg-ink px-6 py-2.5 text-surface">
            Download press kit
          </Link>
          <a href="mailto:press@loupkids.com" className="self-center text-sm text-ink-soft hover:text-ink">
            press@loupkids.com
          </a>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PRESS_KIT_FACTS.slice(0, 4).map((fact) => (
            <div key={fact.label} className="card p-4">
              <p className="label-mono text-steel">{fact.label}</p>
              <p className="mt-1 text-sm">{fact.value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 border-t border-ink/10 py-6">
        <Marquee fast>
          {press.map((mention) => (
            <span key={mention.outlet} className="mx-10 inline-flex items-baseline gap-3">
              <span className="font-semibold tracking-tight">{mention.outlet}</span>
              <span className="max-w-xs truncate text-sm italic text-ink-soft">
                &ldquo;{mention.pullQuote}&rdquo;
              </span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
