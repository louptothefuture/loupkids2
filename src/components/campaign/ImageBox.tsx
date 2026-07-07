export function ImageBox({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center border-2 border-ink bg-neutral-100 font-mono text-sm text-ink/50 ${className}`}
      aria-hidden="true"
    >
      [x]
    </div>
  );
}
