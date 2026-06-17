"use client";

import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Shield,
  Settings as SettingsIcon,
  Clock,
} from "lucide-react";
import { PageHeader, SectionTitle } from "@/components/ui/PageHeader";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { useCompany } from "@/lib/activeCompany";
import { DEMO_CREDENTIALS } from "@/lib/auth";

const profile = {
  name: "Alexandra Reed",
  title: "Chief Executive Officer",
  initials: "AR",
  phone: "+1 (415) 555-0142",
  location: "San Francisco, CA",
  joined: "Member since March 2019",
};

const stats = [
  { label: "Reports created", value: "248" },
  { label: "AI actions reviewed", value: "1,032" },
  { label: "Dashboards owned", value: "16" },
  { label: "Avg. session", value: "24m" },
];

const activity = [
  { text: "Approved AI action: rebalance Dallas residential leasing spend", time: "2 hours ago" },
  { text: "Generated Q2 executive portfolio report", time: "Yesterday" },
  { text: "Updated occupancy alert threshold to 85%", time: "2 days ago" },
  { text: "Connected new integration: CoStar market data", time: "4 days ago" },
  { text: "Reviewed construction risk on Riverside Logistics Park", time: "1 week ago" },
];

export default function ProfilePage() {
  const { company } = useCompany();

  return (
    <div className="space-y-6">
      <PageHeader
        icon={User}
        title="My Profile"
        subtitle="Your account, role, and recent activity across REOS."
        action={
          <Link
            href="/settings"
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-ink-soft shadow-sm transition hover:bg-slate-50"
          >
            <SettingsIcon className="h-4 w-4" />
            Edit in Settings
          </Link>
        }
      />

      {/* Identity card */}
      <Card>
        <CardBody className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-400 text-2xl font-bold text-white shadow-card">
            {profile.initials}
          </div>
          <div className="flex-1">
            <div className="text-xl font-bold text-ink">{profile.name}</div>
            <div className="text-sm text-ink-soft">{profile.title}</div>
            <div className="mt-1 flex items-center gap-2 text-xs text-ink-muted">
              <Building2 className="h-3.5 w-3.5" />
              {company.name}
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600">
            <Shield className="h-3.5 w-3.5" />
            Administrator
          </span>
        </CardBody>
      </Card>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-card"
          >
            <div className="text-[26px] font-bold leading-none tracking-tight text-ink">
              {s.value}
            </div>
            <div className="mt-2 text-xs text-ink-muted">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Contact details */}
        <Card>
          <CardHeader title="Contact details" subtitle="How to reach you" />
          <CardBody className="space-y-3">
            {[
              { icon: Mail, label: "Email", value: DEMO_CREDENTIALS.email },
              { icon: Phone, label: "Phone", value: profile.phone },
              { icon: MapPin, label: "Location", value: profile.location },
              { icon: Clock, label: "Tenure", value: profile.joined },
            ].map((row) => (
              <div key={row.label} className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-slate-50">
                  <row.icon className="h-4 w-4 text-ink-muted" />
                </div>
                <div className="leading-tight">
                  <div className="text-[11px] uppercase tracking-wide text-ink-muted">
                    {row.label}
                  </div>
                  <div className="text-sm font-medium text-ink">{row.value}</div>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>

        {/* Recent activity */}
        <Card className="lg:col-span-2">
          <CardHeader
            title="Recent activity"
            subtitle="Your latest actions across the platform"
          />
          <CardBody>
            <ul className="space-y-4">
              {activity.map((a, i) => (
                <li key={i} className="flex gap-3">
                  <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-500" />
                  <div className="flex-1">
                    <div className="text-sm text-ink">{a.text}</div>
                    <div className="text-xs text-ink-muted">{a.time}</div>
                  </div>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </div>

      <section>
        <SectionTitle>Account</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-card transition hover:shadow-cardhover"
          >
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand-50">
              <SettingsIcon className="h-5 w-5 text-brand-600" />
            </div>
            <div>
              <div className="text-sm font-semibold text-ink">Settings</div>
              <div className="text-xs text-ink-muted">
                Profile, notifications & preferences
              </div>
            </div>
          </Link>
          <Link
            href="/alerts"
            className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-card transition hover:shadow-cardhover"
          >
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-rose-50">
              <Shield className="h-5 w-5 text-rose-500" />
            </div>
            <div>
              <div className="text-sm font-semibold text-ink">Alerts Center</div>
              <div className="text-xs text-ink-muted">
                Review portfolio risks and notifications
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
