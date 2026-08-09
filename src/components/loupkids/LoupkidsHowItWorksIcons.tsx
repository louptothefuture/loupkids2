/** Inline step icons — IDs targeted by CSS micro-animations */

export function StepPhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 72 72"
      width="72"
      height="72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* soft motion ticks */}
      <path d="M10 28v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.2" />
      <path d="M14 32v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
      <path d="M62 28v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.2" />
      <path d="M58 32v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
      <g className="lk-step-phone-shake">
        <rect x="22" y="10" width="28" height="52" rx="6" fill="white" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="29" cy="22" r="2.4" fill="#121212" />
        <rect x="35" y="20.5" width="10" height="3" rx="1.5" fill="currentColor" opacity="0.75" />
        <circle cx="29" cy="33" r="2.4" fill="#121212" />
        <rect x="35" y="31.5" width="10" height="3" rx="1.5" fill="currentColor" opacity="0.75" />
        <circle cx="29" cy="44" r="2.4" fill="#666666" />
        <rect x="35" y="42.5" width="10" height="3" rx="1.5" fill="currentColor" opacity="0.75" />
        <circle cx="29" cy="55" r="2.4" fill="#666666" />
        <rect x="35" y="53.5" width="10" height="3" rx="1.5" fill="currentColor" opacity="0.75" />
      </g>
    </svg>
  );
}

export function StepWifiIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`lk-step-wifi ${className}`}
      viewBox="0 0 72 72"
      width="72"
      height="72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        id="wifi-arc-1"
        d="M14 30c11-11 33-11 44 0"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="18" cy="28" r="2.2" fill="#666666" className="lk-wifi-spark" />
      <path
        id="wifi-arc-2"
        d="M21 36c7.2-7.2 22.8-7.2 30 0"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="48" cy="34" r="2.2" fill="#121212" className="lk-wifi-spark" />
      <path
        id="wifi-arc-3"
        d="M27.5 42c3.6-3.6 13.4-3.6 17 0"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="30" cy="41" r="2" fill="#666666" className="lk-wifi-spark" />
      <circle id="wifi-dot" cx="36" cy="50" r="3.6" fill="currentColor" />
      {/* tiny device hint */}
      <rect x="52" y="44" width="10" height="16" rx="2" fill="white" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

/** Side-view knurled dial in circular housing — ribs scroll on Y */
export function StepWheelIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`lk-step-wheel ${className}`}
      viewBox="0 0 72 72"
      width="72"
      height="72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle id="wheel-casing" cx="36" cy="36" r="26" fill="#f3f4f8" stroke="currentColor" strokeWidth="2" />
      <path d="M18 36h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
      <path d="M48 36h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
      <path d="M20 36l-3-3M20 36l-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.4" />
      <path d="M52 36l3-3M52 36l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.4" />

      <defs>
        <clipPath id="wheel-rib-clip">
          <rect x="28" y="16" width="16" height="40" rx="8" />
        </clipPath>
        <linearGradient id="wheel-shine" x1="28" y1="16" x2="44" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6b7280" />
          <stop offset="0.45" stopColor="#d1d5db" />
          <stop offset="1" stopColor="#4b5563" />
        </linearGradient>
      </defs>

      <rect x="28" y="16" width="16" height="40" rx="8" fill="url(#wheel-shine)" stroke="currentColor" strokeWidth="1.5" />
      <g id="wheel-rotating-group" className="lk-wheel-rotating" clipPath="url(#wheel-rib-clip)">
        {Array.from({ length: 14 }).map((_, i) => (
          <rect
            key={i}
            x="29.5"
            y={12 + i * 5.2}
            width="13"
            height="2.6"
            rx="1"
            fill="currentColor"
            opacity={i % 2 === 0 ? 0.55 : 0.22}
          />
        ))}
      </g>
    </svg>
  );
}
