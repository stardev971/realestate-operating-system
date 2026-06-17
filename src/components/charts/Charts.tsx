"use client";

import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  type TooltipProps,
} from "recharts";
import type { BreakdownSlice, TimePoint } from "@/lib/types";

const axisStyle = { fontSize: 11, fill: "#94a3b8" };

function ChartTooltip({
  active,
  payload,
  label,
  valueFormatter,
}: TooltipProps<number, string> & {
  valueFormatter?: (v: number) => string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-pop">
      {label && (
        <div className="mb-1 text-[11px] font-semibold text-ink">{label}</div>
      )}
      {payload.map((p) => (
        <div key={p.dataKey as string} className="flex items-center gap-2 text-xs">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: p.color }}
          />
          <span className="text-ink-muted">{p.name}</span>
          <span className="ml-auto font-semibold text-ink">
            {valueFormatter
              ? valueFormatter(p.value as number)
              : (p.value as number)?.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

export interface SeriesDef {
  key: string;
  color: string;
}

export function AreaTrendChart({
  data,
  series,
  height = 280,
  valueFormatter,
}: {
  data: TimePoint[];
  series: SeriesDef[];
  height?: number;
  valueFormatter?: (v: number) => string;
}) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
          <defs>
            {series.map((s) => (
              <linearGradient
                key={s.key}
                id={`grad-${s.key}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={s.color} stopOpacity={0.28} />
                <stop offset="100%" stopColor={s.color} stopOpacity={0.02} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#eef0f5" vertical={false} />
          <XAxis dataKey="label" tickLine={false} axisLine={false} tick={axisStyle} />
          <YAxis tickLine={false} axisLine={false} tick={axisStyle} width={42} />
          <Tooltip
            content={<ChartTooltip valueFormatter={valueFormatter} />}
            cursor={{ stroke: "#cbd5e1", strokeWidth: 1 }}
          />
          {series.map((s) => (
            <Area
              key={s.key}
              type="monotone"
              dataKey={s.key}
              stroke={s.color}
              strokeWidth={2.4}
              fill={`url(#grad-${s.key})`}
              dot={false}
              activeDot={{ r: 4 }}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function LineTrendChart({
  data,
  series,
  height = 280,
  valueFormatter,
}: {
  data: TimePoint[];
  series: SeriesDef[];
  height?: number;
  valueFormatter?: (v: number) => string;
}) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eef0f5" vertical={false} />
          <XAxis dataKey="label" tickLine={false} axisLine={false} tick={axisStyle} />
          <YAxis tickLine={false} axisLine={false} tick={axisStyle} width={42} />
          <Tooltip content={<ChartTooltip valueFormatter={valueFormatter} />} />
          {series.map((s) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              stroke={s.color}
              strokeWidth={2.4}
              dot={false}
              activeDot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BarChartViz({
  data,
  series,
  height = 280,
  layout = "horizontal",
  categoryKey = "label",
  valueFormatter,
}: {
  data: Array<Record<string, string | number>>;
  series: SeriesDef[];
  height?: number;
  layout?: "horizontal" | "vertical";
  categoryKey?: string;
  valueFormatter?: (v: number) => string;
}) {
  const vertical = layout === "vertical";
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          layout={layout}
          margin={{ top: 8, right: 12, left: vertical ? 8 : -12, bottom: 0 }}
          barCategoryGap={vertical ? "28%" : "22%"}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#eef0f5" horizontal={!vertical} vertical={vertical} />
          {vertical ? (
            <>
              <XAxis type="number" tickLine={false} axisLine={false} tick={axisStyle} />
              <YAxis
                type="category"
                dataKey={categoryKey}
                tickLine={false}
                axisLine={false}
                tick={axisStyle}
                width={120}
              />
            </>
          ) : (
            <>
              <XAxis dataKey={categoryKey} tickLine={false} axisLine={false} tick={axisStyle} />
              <YAxis tickLine={false} axisLine={false} tick={axisStyle} width={42} />
            </>
          )}
          <Tooltip
            content={<ChartTooltip valueFormatter={valueFormatter} />}
            cursor={{ fill: "rgba(108,92,231,0.06)" }}
          />
          {series.map((s) => (
            <Bar key={s.key} dataKey={s.key} fill={s.color} radius={vertical ? [0, 6, 6, 0] : [6, 6, 0, 0]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function DonutChart({
  data,
  height = 280,
  valueLabel,
  valueFormatter,
}: {
  data: BreakdownSlice[];
  height?: number;
  valueLabel?: string;
  valueFormatter?: (v: number) => string;
}) {
  const total = data.reduce((s, d) => s + d.value, 0);
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <div style={{ width: 200, height }} className="relative shrink-0">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={62}
              outerRadius={92}
              paddingAngle={2}
              stroke="none"
            >
              {data.map((d) => (
                <Cell key={d.name} fill={d.color} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip valueFormatter={valueFormatter} />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-ink">
            {valueFormatter ? valueFormatter(total) : total.toLocaleString()}
          </span>
          {valueLabel && (
            <span className="text-[11px] text-ink-muted">{valueLabel}</span>
          )}
        </div>
      </div>
      <ul className="flex-1 space-y-2 self-center">
        {data.map((d) => (
          <li key={d.name} className="flex items-center gap-2 text-sm">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
            <span className="text-ink-soft">{d.name}</span>
            <span className="ml-auto font-semibold text-ink">
              {((d.value / total) * 100).toFixed(0)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
