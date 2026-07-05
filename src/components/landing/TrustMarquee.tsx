import { Marquee } from "@/components/Marquee";

const TRUST = [
  "Free shipping",
  "30-day returns",
  "2-year warranty",
  "No subscription",
  "Parent-controlled",
];

export function TrustMarquee() {
  return (
    <section className="border-y-3 border-ink bg-white py-5">
      <Marquee fast>
        {TRUST.map((item) => (
          <span key={item} className="pop-marquee-text mx-10">
            {item} ◆
          </span>
        ))}
      </Marquee>
    </section>
  );
}
