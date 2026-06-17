"use client";

import { useState } from "react";
import { Plug, RefreshCw, Plus, Search } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge, statusTone } from "@/components/ui/Badge";
import { useIntegrations } from "@/lib/hooks";
import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function IntegrationsPage() {
  const { data } = useIntegrations();
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("All");

  const categories = ["All", ...data.catalog.map((c) => c.category)];
  const filteredCatalog = data.catalog
    .filter((c) => activeCat === "All" || c.category === activeCat)
    .map((c) => ({
      ...c,
      items: c.items.filter((i) =>
        i.name.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter((c) => c.items.length > 0);

  const stats = [
    { label: "Connected", value: String(data.stats.connected) },
    { label: "Syncing", value: String(data.stats.syncing) },
    { label: "Errors", value: String(data.stats.errors) },
    { label: "Records Synced", value: formatNumber(data.stats.records) },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Plug}
        title="Integrations"
        subtitle="Connect the tools your organization already runs on. Every source feeds your operating system."
        action={
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-ink-soft shadow-sm transition hover:bg-slate-50">
            <RefreshCw className="h-4 w-4" />
            Sync All
          </button>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-4">
            <div className="text-[12px] font-medium text-ink-muted">{s.label}</div>
            <div className="mt-1.5 text-[26px] font-bold tracking-tight text-ink">{s.value}</div>
          </Card>
        ))}
      </div>

      {/* Connected integrations */}
      <Card className="p-5">
        <h3 className="mb-4 text-[15px] font-semibold text-ink">
          Connected Integrations ({data.connected.length})
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {data.connected.map((it) => (
            <div
              key={it.id}
              className="rounded-xl border border-slate-200/70 p-4 transition hover:shadow-card"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="grid h-9 w-9 place-items-center rounded-lg text-xs font-bold text-white"
                    style={{ background: it.color }}
                  >
                    {it.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-ink">{it.name}</div>
                    <div className="text-[11px] text-ink-muted">{it.category}</div>
                  </div>
                </div>
                <Badge tone={statusTone(it.status)} dot>{it.status}</Badge>
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] text-ink-muted">
                <span>Last sync: {it.lastSync}</span>
                <span
                  className={cn(
                    "font-semibold",
                    it.health >= 90
                      ? "text-emerald-600"
                      : it.health >= 60
                      ? "text-amber-600"
                      : "text-rose-500"
                  )}
                >
                  {it.health}% health
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className={cn(
                    "h-full rounded-full",
                    it.health >= 90 ? "bg-emerald-500" : it.health >= 60 ? "bg-amber-500" : "bg-rose-500"
                  )}
                  style={{ width: `${it.health}%` }}
                />
              </div>
              <div className="mt-2 text-[11px] text-ink-muted">
                {formatNumber(it.records)} records synced
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Add an integration */}
      <Card className="p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-[15px] font-semibold text-ink">Add an Integration</h3>
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 sm:w-72">
            <Search className="h-4 w-4 text-ink-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search integrations…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-ink-muted"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCat(c)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition",
                activeCat === c
                  ? "bg-brand-600 text-white"
                  : "bg-slate-100 text-ink-soft hover:bg-slate-200"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-5 space-y-6">
          {filteredCatalog.map((cat) => (
            <div key={cat.category}>
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
                {cat.category}
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {cat.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-3 rounded-xl border border-slate-200/70 p-3.5 transition hover:border-brand-200 hover:shadow-card"
                  >
                    <div
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-xs font-bold text-white"
                      style={{ background: item.color }}
                    >
                      {item.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate text-sm font-semibold text-ink">{item.name}</span>
                        {item.popular && <Badge tone="brand">Popular</Badge>}
                      </div>
                      <div className="truncate text-[11px] text-ink-muted">{item.blurb}</div>
                    </div>
                    <button className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-slate-200 text-ink-soft transition hover:bg-brand-50 hover:text-brand-600">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
