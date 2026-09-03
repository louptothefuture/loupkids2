/** 5-year growth from LOUP_Financial_Model_Sept.xlsx → sheet “5-Year Projections”. */

export const GRAPH_YEARS = [1, 2, 3, 4, 5] as const;

export const GRAPH_SERIES = [
  {
    id: "device",
    label: "Device",
    hint: "Device Revenue (annual)",
    color: "#121212",
    // XLS row 9
    values: [2_557_800, 17_126_820, 43_673_391, 66_820_288.23, 102_235_041],
  },
  {
    id: "subs",
    label: "Subs",
    hint: "Total sub revenue (annual)",
    color: "#ff2d9b",
    // XLS row 50 / row 11 — Subscription Revenue (WiFi + Cellular)
    values: [1_020_000, 12_434_000, 37_318_900, 71_846_065, 121_256_655.3],
  },
] as const;

export type GraphSeries = (typeof GRAPH_SERIES)[number];

/** Shared Y — Subs Y5 is the top of the chart. */
export const GRAPH_Y_MAX = Math.max(...GRAPH_SERIES.flatMap((s) => [...s.values]));

/** year in [1, 5] — linear between the five annual points. */
export function lerpYears(values: readonly number[], year: number) {
  const t = Math.min(5, Math.max(1, year));
  const i = Math.min(3, Math.floor(t) - 1);
  const f = t - (i + 1);
  return values[i] + (values[i + 1] - values[i]) * f;
}

export function formatGraphValue(n: number) {
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return `$${(n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1)}M`;
  if (abs >= 1_000) return `$${Math.round(n / 1_000)}K`;
  return `$${Math.round(n)}`;
}

export function seriesById(id: GraphSeries["id"]) {
  return GRAPH_SERIES.find((s) => s.id === id)!;
}

/** Workbook “MRR > HW”: aggregated Subs vs device. NO through Y3, YES from Y4. */
export function subsLeadHardware(year: number) {
  return lerpYears(seriesById("subs").values, year) > lerpYears(seriesById("device").values, year);
}

/** Where the two plotted lines cross — between Y3 and Y4 (~3.6). */
export const GRAPH_INFLECTION_YEAR = (() => {
  let lo = 1;
  let hi = 5;
  for (let i = 0; i < 32; i++) {
    const mid = (lo + hi) / 2;
    if (subsLeadHardware(mid)) hi = mid;
    else lo = mid;
  }
  return hi;
})();

// ponytail: one check that interpolation hits the workbook endpoints + Y4 flag
if (process.env.NODE_ENV !== "production") {
  const device = seriesById("device").values;
  const subs = seriesById("subs").values;
  console.assert(lerpYears(device, 1) === 2_557_800, "graph y1 device $");
  console.assert(lerpYears(subs, 5) === 121_256_655.3, "graph y5 subs $");
  console.assert(!subsLeadHardware(3), "model: MRR still behind at Y3");
  console.assert(subsLeadHardware(4), "model: MRR > HW from Y4");
  console.assert(GRAPH_INFLECTION_YEAR > 3 && GRAPH_INFLECTION_YEAR < 4, "inflection in Y3–Y4");
}
