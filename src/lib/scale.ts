/**
 * Date-range scaling.
 *
 * The demo ships a single static dataset that represents the "Last 30 days"
 * baseline. To make the header date selector feel like a real system, we
 * derive period-appropriate figures from that baseline:
 *
 *  - "flow" metrics (revenue, leads, deals, spend, pipeline…) scale up/down
 *    with the length of the window,
 *  - "point-in-time" metrics (occupancy %, portfolio value, cap rate…) keep
 *    their value but their period-over-period delta moves,
 *  - time-series charts show fewer/more points,
 *  - breakdown (donut) slices scale so magnitudes change while shares hold.
 */
import type { Kpi } from "./types";
import type { RangeKey } from "./dateRange";

/** Magnitude multiplier vs. the 30-day baseline. */
const rangeFactor: Record<RangeKey, number> = {
  "Last 7 days": 0.24,
  "Last 30 days": 1,
  "Last quarter": 2.95,
  "Year to date": 5.6,
};

/** Number of trailing points to show on time-series charts. */
const rangePoints: Record<RangeKey, number> = {
  "Last 7 days": 2,
  "Last 30 days": 4,
  "Last quarter": 6,
  "Year to date": 12,
};

/** How much period-over-period deltas stretch for the window. */
const deltaFactor: Record<RangeKey, number> = {
  "Last 7 days": 0.4,
  "Last 30 days": 1,
  "Last quarter": 1.9,
  "Year to date": 2.7,
};

export function rangeLabel(range: RangeKey): string {
  switch (range) {
    case "Last 7 days":
      return "last 7 days";
    case "Last quarter":
      return "last quarter";
    case "Year to date":
      return "year to date";
    default:
      return "last 30 days";
  }
}

/** Metrics that are a snapshot in time rather than an accumulating total. */
const POINT_IN_TIME = new Set([
  "Portfolio Value",
  "Occupancy Rate",
  "Cash Position",
  "Construction Exposure",
  "Cap Rate",
  "AUM",
  "Asset Score",
]);

function isPointInTime(kpi: Kpi): boolean {
  const value = (kpi.value ?? "").trim();
  if (value.endsWith("%")) return true;
  if (kpi.metricKey && POINT_IN_TIME.has(kpi.metricKey)) return true;
  const label = (kpi.label ?? "").toLowerCase();
  return /(occupancy|portfolio value|cash|cap rate|exposure|margin|score|aum|health|satisfaction|nps)/.test(
    label
  );
}

/** Scale the numeric portion of a formatted string ("$312M", "1,240", "94.2%"). */
function scaleValueString(value: string, factor: number): string {
  const match = value.match(/^([^\d-]*)(-?[\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) return value;
  const [, prefix, numStr, suffix] = match;
  const hadComma = numStr.includes(",");
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  const n = parseFloat(numStr.replace(/,/g, ""));
  if (Number.isNaN(n)) return value;
  const scaled = n * factor;

  let out: string;
  if (decimals > 0) {
    out = scaled.toFixed(decimals);
    if (hadComma)
      out = Number(out).toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
  } else {
    const rounded = Math.round(scaled);
    out = hadComma ? rounded.toLocaleString("en-US") : String(rounded);
  }
  return `${prefix}${out}${suffix}`;
}

function scaleKpi(kpi: Kpi, factor: number, dFactor: number): Kpi {
  const next: Kpi = { ...kpi };
  if (!isPointInTime(kpi)) {
    next.value = scaleValueString(kpi.value, factor);
  }
  if (typeof kpi.delta === "number") {
    next.delta = Math.round(kpi.delta * dFactor * 10) / 10;
  }
  return next;
}

function isTimeSeries(arr: unknown[]): boolean {
  return (
    arr.length > 0 &&
    arr.every(
      (it) => it !== null && typeof it === "object" && "label" in (it as object)
    )
  );
}

function isBreakdown(arr: unknown[]): boolean {
  return (
    arr.length > 0 &&
    arr.every((it) => {
      if (it === null || typeof it !== "object") return false;
      const o = it as Record<string, unknown>;
      return "name" in o && "value" in o && "color" in o;
    })
  );
}

/**
 * Apply the active range to a module dataset. Returns the input unchanged for
 * the 30-day baseline. Generic by design so every module benefits without
 * bespoke wiring.
 */
export function applyRange<T>(data: T, range: RangeKey): T {
  if (range === "Last 30 days" || data == null || typeof data !== "object")
    return data;

  const factor = rangeFactor[range];
  const points = rangePoints[range];
  const dFactor = deltaFactor[range];

  const out: Record<string, unknown> = { ...(data as Record<string, unknown>) };

  for (const key of Object.keys(out)) {
    const value = out[key];
    if (!Array.isArray(value)) continue;

    if (key === "kpis") {
      out[key] = value.map((k) => scaleKpi(k as Kpi, factor, dFactor));
    } else if (isTimeSeries(value)) {
      out[key] = value.slice(-points);
    } else if (isBreakdown(value)) {
      out[key] = value.map((s) => {
        const slice = s as Record<string, unknown> & { value: number };
        return { ...slice, value: Math.round(slice.value * factor) };
      });
    }
  }

  return out as T;
}
