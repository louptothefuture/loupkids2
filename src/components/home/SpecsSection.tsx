import Image from "next/image";
import { getSpecs } from "@/lib/content";
import { FEATURE_ICONS } from "@/lib/content/architecture";
import { Reveal } from "@/components/Reveal";

const HARDWARE_LABELS = [
  "Scroll dial",
  "E-ink strip",
  "Call bar",
  "Mute button",
  "Speaker",
  "Back plate",
];

export async function SpecsSection() {
  const specs = await getSpecs();
  const hardware = specs.filter((s) => s.group === "Hardware");

  return (
    <section id="specs" className="border-b border-ink/10 bg-paper py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="label-mono text-steel">Specs</p>
          <h2 className="display mt-3 max-w-2xl text-4xl sm:text-5xl">
            A phone, built like hardware
          </h2>
          <p className="mt-4 max-w-xl text-ink-soft">
            Anodized aluminum, e-ink contact strip, call bar and mute — everything you need, nothing
            you don&apos;t.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <Reveal delay={0.08}>
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface ring-1 ring-ink/10">
              <Image
                src="/images/product/loup-three-quarter.jpg"
                alt="LOUP — scroll dial, e-ink strip, call bar, and mute button"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {HARDWARE_LABELS.map((label) => (
                  <span
                    key={label}
                    className="rounded-md bg-surface/90 px-2 py-1.5 text-center text-[0.65rem] font-medium text-ink-soft ring-1 ring-ink/10 backdrop-blur-sm"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="space-y-8">
            <Reveal delay={0.1}>
              <div className="grid gap-3 sm:grid-cols-2">
                {FEATURE_ICONS.map((f) => (
                  <div key={f.title} className="card p-4 transition-colors hover:bg-cream/50">
                    <h3 className="text-sm font-semibold tracking-tight">{f.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{f.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="card overflow-hidden">
                <table className="w-full text-left text-sm">
                  <tbody>
                    {hardware.map((row) => (
                      <tr key={row.label} className="border-b border-ink/5 last:border-0">
                        <th className="label-mono w-1/3 px-4 py-3 text-steel">{row.label}</th>
                        <td className="px-4 py-3">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
