"use client";

import { Bell, AlertOctagon, AlertTriangle, Info } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useAlerts } from "@/lib/hooks";
import type { AlertItem } from "@/lib/types";
import { cn } from "@/lib/utils";

const config = {
  Critical: { icon: AlertOctagon, ring: "bg-rose-50 text-rose-600", tone: "red" as const },
  Warning: { icon: AlertTriangle, ring: "bg-amber-50 text-amber-600", tone: "amber" as const },
  Info: { icon: Info, ring: "bg-blue-50 text-blue-600", tone: "blue" as const },
};

export default function AlertsPage() {
  const { data } = useAlerts();

  const stats = [
    { label: "Critical", value: data.stats.critical, cls: "text-rose-600" },
    { label: "Warning", value: data.stats.warning, cls: "text-amber-600" },
    { label: "Informational", value: data.stats.info, cls: "text-blue-600" },
  ];

  const groups: AlertItem["severity"][] = ["Critical", "Warning", "Info"];

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Bell}
        title="Alerts Center"
        subtitle="Real-time alerts across the portfolio — prioritized by severity and routed to the right module."
      />

      <div className="grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <Card key={s.label} className="p-4">
            <div className="text-[12px] font-medium text-ink-muted">{s.label}</div>
            <div className={cn("mt-1.5 text-[26px] font-bold tracking-tight", s.cls)}>
              {s.value}
            </div>
          </Card>
        ))}
      </div>

      {groups.map((sev) => {
        const items = data.alerts.filter((a) => a.severity === sev);
        if (items.length === 0) return null;
        const c = config[sev];
        const Icon = c.icon;
        return (
          <div key={sev}>
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink">
              <Icon className="h-4 w-4" />
              {sev === "Info" ? "Informational" : sev} ({items.length})
            </h2>
            <div className="space-y-2.5">
              {items.map((a) => (
                <Card key={a.id} className="flex items-start gap-3 p-4">
                  <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-lg", c.ring)}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-semibold text-ink">{a.title}</h3>
                      <Badge tone="neutral">{a.module}</Badge>
                    </div>
                    <p className="mt-0.5 text-[13px] text-ink-muted">{a.detail}</p>
                  </div>
                  <span className="shrink-0 text-[11px] text-ink-muted">{a.time}</span>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
