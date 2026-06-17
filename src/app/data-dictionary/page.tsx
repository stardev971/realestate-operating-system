"use client";

import { useMemo, useState } from "react";
import { BookOpen, Search } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useDataDictionary } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export default function DataDictionaryPage() {
  const { data } = useDataDictionary();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(data.metrics.map((m) => m.category)))],
    [data.metrics]
  );

  const rows = useMemo(
    () =>
      data.metrics.filter(
        (m) =>
          (cat === "All" || m.category === cat) &&
          (m.metric.toLowerCase().includes(query.toLowerCase()) ||
            m.meaning.toLowerCase().includes(query.toLowerCase()))
      ),
    [data.metrics, query, cat]
  );

  return (
    <div className="space-y-6">
      <PageHeader
        icon={BookOpen}
        title="Data Dictionary"
        subtitle="Every metric in the platform — its formula, source systems, and business meaning. This powers all tooltips."
      />

      <Card className="p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 sm:w-80">
            <Search className="h-4 w-4 text-ink-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search metrics…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-ink-muted"
            />
          </div>
          <span className="text-xs text-ink-muted">{rows.length} metrics</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition",
                cat === c ? "bg-brand-600 text-white" : "bg-slate-100 text-ink-soft hover:bg-slate-200"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </Card>

      <div className="grid gap-3 lg:grid-cols-2">
        {rows.map((m) => (
          <Card key={m.metric} className="p-5">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-[15px] font-semibold text-ink">{m.metric}</h3>
              <Badge tone="brand">{m.category}</Badge>
            </div>
            <div className="mt-2 rounded-md bg-slate-50 px-3 py-2 font-mono text-[12px] text-ink-soft">
              {m.formula}
            </div>
            <p className="mt-2.5 text-[13px] leading-relaxed text-ink-soft">{m.meaning}</p>
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">
                Sources
              </span>
              {m.sources.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-medium text-brand-600"
                >
                  {s}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
