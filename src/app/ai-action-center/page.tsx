"use client";

import { useState } from "react";
import { Sparkles, Check, ArrowRight, Zap } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge, statusTone } from "@/components/ui/Badge";
import { useAiActions } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export default function AiActionCenterPage() {
  const { data } = useAiActions();
  const [done, setDone] = useState<Record<string, boolean>>({});

  const stats = [
    { label: "Open Recommendations", value: String(data.stats.total) },
    { label: "High Priority", value: String(data.stats.highPriority) },
    { label: "Potential Upside", value: data.stats.potentialUpside },
    { label: "Actions Taken", value: String(data.stats.actionsTaken) },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Sparkles}
        title="AI Action Center"
        subtitle="Your executive AI copilot — insights converted into one-click, executable actions."
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-4">
            <div className="text-[12px] font-medium text-ink-muted">{s.label}</div>
            <div className="mt-1.5 text-[26px] font-bold tracking-tight text-ink">{s.value}</div>
          </Card>
        ))}
      </div>

      <div className="space-y-3">
        {data.actions.map((a) => {
          const taken = done[a.id];
          return (
            <Card key={a.id} className="p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50">
                  <Zap className="h-5 w-5 text-brand-600" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-[15px] font-semibold text-ink">{a.title}</h3>
                    <Badge tone={statusTone(a.priority)} dot>{a.priority} priority</Badge>
                    <Badge tone="neutral">{a.category}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-ink-muted">{a.detail}</p>
                  <p className="mt-1.5 text-[13px] font-semibold text-emerald-600">{a.impact}</p>
                </div>
                <button
                  onClick={() => setDone((d) => ({ ...d, [a.id]: !d[a.id] }))}
                  className={cn(
                    "flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition",
                    taken
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-brand-600 text-white hover:bg-brand-700"
                  )}
                >
                  {taken ? (
                    <>
                      <Check className="h-4 w-4" /> Action taken
                    </>
                  ) : (
                    <>
                      {a.cta} <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
