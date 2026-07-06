import { LOUPKIDS_FEATURE_CARDS } from "@/lib/content/loupkids-conversion";
import { FadeIn } from "../FadeIn";

export function LoupkidsFeatureGrid({ dark = false }: { dark?: boolean }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {LOUPKIDS_FEATURE_CARDS.map((f, i) => (
        <FadeIn key={f.title} delay={i * 0.04}>
          <div className={`lk-card lk-card-pad h-full ${dark ? "lk-card-dark text-white" : ""}`}>
            <span className="text-2xl" aria-hidden="true">
              {f.icon}
            </span>
            <h3 className="lk-display mt-3 text-lg">{f.title}</h3>
            <p
              className={`mt-2 text-[0.9375rem] leading-relaxed ${dark ? "text-white/75" : "text-[var(--lk-muted)]"}`}
            >
              {f.body}
            </p>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}
