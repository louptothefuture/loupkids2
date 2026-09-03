"use client";

import { useEffect, useRef, type Ref, type RefObject } from "react";
import {
  GRAPH_INFLECTION_YEAR,
  GRAPH_SERIES,
  GRAPH_Y_MAX,
  formatGraphValue,
  lerpYears,
} from "@/lib/content/loupkids-graph";

const W = 1000;
const H = 620;
const PAD = { l: 36, r: 28, t: 56, b: 64 };

function xAt(year: number) {
  return PAD.l + ((year - 1) / 4) * (W - PAD.l - PAD.r);
}

function scrollProgress(track: HTMLElement) {
  const rect = track.getBoundingClientRect();
  const viewH = window.innerHeight || 1;
  const total = rect.height - viewH;
  if (total <= 1) return 0;
  return Math.min(1, Math.max(0, -rect.top / total));
}

function yearFromProgress(p: number) {
  return 1 + p * 4;
}

function yAt(v: number) {
  const innerH = H - PAD.t - PAD.b;
  return PAD.t + innerH - (v / GRAPH_Y_MAX) * innerH;
}

function polyline(values: readonly number[], year: number) {
  const steps = 48;
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = 1 + ((year - 1) * i) / steps;
    if (t > year + 1e-6) break;
    pts.push(`${xAt(t).toFixed(1)},${yAt(lerpYears(values, t)).toFixed(1)}`);
  }
  return pts.join(" ");
}

function paintYear(root: HTMLElement, yr: number, marker: SVGLineElement | null) {
  const x = xAt(yr);
  if (marker) {
    marker.setAttribute("x1", String(x));
    marker.setAttribute("x2", String(x));
  }
  const inf = root.querySelector("[data-graph-inflection]");
  if (inf) inf.setAttribute("opacity", yr >= GRAPH_INFLECTION_YEAR ? "1" : "0");
  for (const series of GRAPH_SERIES) {
    const v = lerpYears(series.values, yr);
    const val = root.querySelector(`[data-graph-val="${series.id}"]`);
    if (val) val.textContent = formatGraphValue(v);
    const line = root.querySelector(`[data-graph-line="${series.id}"]`);
    if (line) line.setAttribute("points", polyline(series.values, yr));
    const dot = root.querySelector(`[data-graph-dot="${series.id}"]`);
    if (dot) {
      dot.setAttribute("cx", String(x));
      dot.setAttribute("cy", String(yAt(v)));
    }
  }
}

function MetricCards({ year }: { year: number }) {
  return (
    <ul className="flex shrink-0 flex-row flex-wrap gap-x-8 gap-y-4 md:flex-col md:gap-5">
      {GRAPH_SERIES.map((series) => (
        <li key={series.id}>
          <p className="text-[0.65rem] uppercase tracking-[0.14em] text-[var(--lk-muted)]">
            <span
              className="mr-1.5 inline-block h-2 w-2 rounded-full"
              style={{ background: series.color }}
            />
            {series.label}
          </p>
          <p className="lk-display mt-1 text-2xl leading-none sm:text-[1.75rem]">
            <span data-graph-val={series.id}>
              {formatGraphValue(lerpYears(series.values, year))}
            </span>
          </p>
        </li>
      ))}
    </ul>
  );
}

function ChartSvg({ year, markerRef }: { year: number; markerRef?: Ref<SVGLineElement> }) {
  const x = xAt(year);
  return (
    <div className="w-full" style={{ aspectRatio: `${W} / ${H}` }}>
      <svg
        className="block h-full w-full overflow-visible"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Device and Subs over five years"
      >
      <line
        x1={PAD.l}
        y1={H - PAD.b}
        x2={W - PAD.r}
        y2={H - PAD.b}
        stroke="currentColor"
        strokeOpacity="0.2"
      />
      {[1, 2, 3, 4, 5].map((y) => {
        const gx = xAt(y);
        return (
          <g key={y}>
            <line
              x1={gx}
              y1={PAD.t}
              x2={gx}
              y2={H - PAD.b}
              stroke="currentColor"
              strokeOpacity="0.08"
            />
            <text
              x={gx}
              y={H - 22}
              textAnchor="middle"
              fill="#8a8680"
              fontSize="28"
              fontWeight="700"
            >
              Y{y}
            </text>
          </g>
        );
      })}
      {markerRef ? (
        <line
          ref={markerRef}
          x1={x}
          x2={x}
          y1={PAD.t}
          y2={H - PAD.b}
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeDasharray="3 5"
        />
      ) : null}
      {GRAPH_SERIES.map((series) => (
        <g key={series.id}>
          <polyline
            data-graph-line={series.id}
            fill="none"
            stroke={series.color}
            strokeWidth="3.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            points={polyline(series.values, year)}
          />
          <circle
            data-graph-dot={series.id}
            r="6"
            fill={series.color}
            cx={x}
            cy={yAt(lerpYears(series.values, year))}
          />
        </g>
      ))}
      <g opacity={year >= GRAPH_INFLECTION_YEAR ? 1 : 0} data-graph-inflection="">
        <line
          x1={xAt(GRAPH_INFLECTION_YEAR)}
          x2={xAt(GRAPH_INFLECTION_YEAR)}
          y1={PAD.t}
          y2={H - PAD.b}
          stroke="#ff2d9b"
          strokeWidth="1.5"
        />
        <text
          x={xAt(GRAPH_INFLECTION_YEAR) + 10}
          y={PAD.t - 16}
          fill="#ff2d9b"
          fontSize="26"
          fontWeight="700"
        >
          MRR &gt; Hardware
        </text>
      </g>
    </svg>
    </div>
  );
}

function GraphPanel({
  year,
  markerRef,
}: {
  year: number;
  markerRef?: Ref<SVGLineElement>;
}) {
  return (
    <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[auto_minmax(0,1fr)] md:gap-10">
      <MetricCards year={year} />
      <div className="min-w-0 w-full">
        <ChartSvg year={year} markerRef={markerRef} />
      </div>
    </div>
  );
}

function useGraphPaint(
  trackRef: RefObject<HTMLDivElement | null>,
  markerRef: RefObject<SVGLineElement | null>,
  yearRef?: RefObject<HTMLParagraphElement | null>,
) {
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const paint = (p: number) => {
      const yr = Math.min(5, Math.max(1, yearFromProgress(p)));
      if (yearRef?.current) yearRef.current.textContent = `Year ${yr.toFixed(1)}`;
      paintYear(track, yr, markerRef.current);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => paint(reduce ? 1 : scrollProgress(track)));
    };
    paint(reduce ? 1 : scrollProgress(track));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [trackRef, markerRef, yearRef]);
}

/** Raise page — scroll-drawn, same as /graph but in-page. */
export function GraphRaiseScroll() {
  const trackRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<SVGLineElement>(null);
  useGraphPaint(trackRef, markerRef);

  return (
    <div ref={trackRef} className="relative w-full" style={{ height: "320vh" }}>
      <div
        className="sticky flex flex-col justify-center py-6"
        style={{ top: "var(--lk-nav-h)", height: "calc(100svh - var(--lk-nav-h))" }}
      >
        <GraphPanel year={1} markerRef={markerRef} />
      </div>
    </div>
  );
}

export function GraphScroll() {
  const trackRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLParagraphElement>(null);
  const markerRef = useRef<SVGLineElement>(null);
  useGraphPaint(trackRef, markerRef, yearRef);

  return (
    <div ref={trackRef} className="relative bg-[var(--lk-bg)]" style={{ height: "500vh" }}>
      <div className="sticky top-0 flex h-svh flex-col justify-center px-[var(--lk-section-x)] py-10">
        <div className="mx-auto w-full max-w-[1200px]">
          <p ref={yearRef} className="lk-display mb-6 text-[clamp(1.75rem,4vw,2.75rem)] leading-none">
            Year 1.0
          </p>
          <GraphPanel year={1} markerRef={markerRef} />
        </div>
      </div>
    </div>
  );
}
