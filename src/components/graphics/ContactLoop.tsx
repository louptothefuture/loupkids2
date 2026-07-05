"use client";

const CONTACTS = ["Mom", "Dad", "Gran", "Sam", "Coach", "You"];

type ContactLoopProps = {
  className?: string;
  variant?: "light" | "dark";
};

/** Approved contacts on a clean circular orbit */
export function ContactLoop({ className = "", variant = "dark" }: ContactLoopProps) {
  const pillBg = variant === "dark" ? "bg-ink text-white" : "bg-white text-ink";
  const ring = variant === "dark" ? "border-ink/25" : "border-white/40";

  return (
    <div className={`relative mx-auto aspect-square w-full max-w-[280px] ${className}`}>
      <div className={`absolute inset-[8%] rounded-full border-4 border-dashed ${ring}`} />
      <div className={`absolute inset-[22%] rounded-full border-2 border-dashed ${ring}`} />

      <div className="absolute inset-0 animate-[spin_28s_linear_infinite]">
        {CONTACTS.map((name, i) => {
          const deg = (i / CONTACTS.length) * 360;
          return (
            <div
              key={name}
              className="absolute left-1/2 top-1/2 h-0 w-0"
              style={{ transform: `rotate(${deg}deg)` }}
            >
              <span
                className={`absolute left-1/2 -translate-x-1/2 rounded-full px-3 py-1.5 text-[0.7rem] font-black uppercase tracking-wide shadow-[2px_2px_0_rgba(0,0,0,0.2)] ${pillBg}`}
                style={{ transform: "translateY(-108px)" }}
              >
                {name}
              </span>
            </div>
          );
        })}
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="pop-label text-ink [-webkit-text-stroke:1px_#fff] [text-shadow:2px_2px_0_#0a0a0a]">
          Your loop
        </span>
      </div>
    </div>
  );
}
