import type { LoupkidsFaqAnswer } from "@/lib/content/loupkids-site";

export function FaqAnswer({ answer }: { answer: LoupkidsFaqAnswer }) {
  if (typeof answer === "string") {
    return <p className="leading-relaxed text-[var(--lk-muted)]">{answer}</p>;
  }

  return (
    <div className="space-y-4 leading-relaxed text-[var(--lk-muted)]">
      {answer.paragraphs.map((p) => (
        <p key={p.slice(0, 40)}>{p}</p>
      ))}
      {answer.bullets && (
        <ul className="list-disc space-y-2 pl-5">
          {answer.bullets.map((b) => (
            <li key={b.slice(0, 40)}>{b}</li>
          ))}
        </ul>
      )}
      {answer.paragraphs2?.map((p) => (
        <p key={p.slice(0, 40)}>{p}</p>
      ))}
    </div>
  );
}
