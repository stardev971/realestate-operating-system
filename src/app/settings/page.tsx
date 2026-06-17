"use client";

import { useState } from "react";
import { Settings as SettingsIcon } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { company } from "@/lib/data/company";
import { cn } from "@/lib/utils";

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative h-6 w-11 rounded-full transition",
        on ? "bg-brand-600" : "bg-slate-300"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition",
          on ? "left-[22px]" : "left-0.5"
        )}
      />
    </button>
  );
}

const fields = [
  { label: "Full name", value: company.user.name },
  { label: "Title", value: company.user.title },
  { label: "Email", value: "alexandra.reed@northstarre.com" },
  { label: "Organization", value: company.name },
];

export default function SettingsPage() {
  const [toggles, setToggles] = useState({
    critical: true,
    weekly: true,
    ai: true,
    digest: false,
    compact: false,
  });
  const flip = (k: keyof typeof toggles) =>
    setToggles((t) => ({ ...t, [k]: !t[k] }));

  return (
    <div className="space-y-6">
      <PageHeader
        icon={SettingsIcon}
        title="Settings"
        subtitle="Manage your profile, notifications, and platform preferences."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Profile" subtitle="Your account details" />
          <CardBody className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-400 text-lg font-bold text-white">
                {company.user.initials}
              </div>
              <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-ink-soft transition hover:bg-slate-50">
                Change photo
              </button>
            </div>
            {fields.map((f) => (
              <div key={f.label}>
                <label className="mb-1 block text-xs font-medium text-ink-muted">
                  {f.label}
                </label>
                <input
                  defaultValue={f.value}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-ink outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                />
              </div>
            ))}
            <button className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700">
              Save changes
            </button>
          </CardBody>
        </Card>

        <div className="space-y-5">
          <Card>
            <CardHeader title="Notifications" subtitle="Choose what you want to hear about" />
            <CardBody className="space-y-1">
              {[
                { k: "critical" as const, label: "Critical alerts", desc: "Occupancy, revenue, and construction risks" },
                { k: "weekly" as const, label: "Weekly CEO summary", desc: "Every Monday at 8:00 AM" },
                { k: "ai" as const, label: "AI recommendations", desc: "New high-priority actions" },
                { k: "digest" as const, label: "Daily digest email", desc: "End-of-day portfolio recap" },
              ].map((row) => (
                <div key={row.k} className="flex items-center justify-between py-2.5">
                  <div>
                    <div className="text-sm font-medium text-ink">{row.label}</div>
                    <div className="text-xs text-ink-muted">{row.desc}</div>
                  </div>
                  <Toggle on={toggles[row.k]} onClick={() => flip(row.k)} />
                </div>
              ))}
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Appearance" subtitle="Display preferences" />
            <CardBody className="space-y-1">
              <div className="flex items-center justify-between py-2.5">
                <div>
                  <div className="text-sm font-medium text-ink">Compact density</div>
                  <div className="text-xs text-ink-muted">Tighter spacing across tables and cards</div>
                </div>
                <Toggle on={toggles.compact} onClick={() => flip("compact")} />
              </div>
              <div className="flex items-center justify-between py-2.5">
                <div>
                  <div className="text-sm font-medium text-ink">Theme</div>
                  <div className="text-xs text-ink-muted">Light theme (enterprise default)</div>
                </div>
                <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-medium text-ink-soft">
                  Light
                </span>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      <Card className="p-5">
        <div className="text-xs text-ink-muted">
          REOS — Real Estate Operating System · Demo build. All data is simulated for demonstration purposes.
        </div>
      </Card>
    </div>
  );
}
