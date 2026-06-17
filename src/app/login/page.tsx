"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  BarChart3,
  Building2,
} from "lucide-react";
import { useAuth, DEMO_CREDENTIALS } from "@/lib/auth";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState(DEMO_CREDENTIALS.email);
  const [password, setPassword] = useState(DEMO_CREDENTIALS.password);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    const ok = login(email, password);
    if (ok) {
      router.replace("/");
    } else {
      setError("Incorrect email or password.");
      setBusy(false);
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden gradient-brand p-12 text-white lg:flex">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/15">
            <Activity className="h-6 w-6 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-lg font-bold">REOS</div>
            <div className="text-xs text-white/80">
              Real Estate Operating System
            </div>
          </div>
        </div>

        <div className="max-w-md">
          <h1 className="text-3xl font-bold leading-tight">
            Your entire portfolio. One clear picture.
          </h1>
          <p className="mt-3 text-sm text-white/80">
            Revenue, leasing, construction, and AI-driven actions across every
            connected system — in a single executive operating layer.
          </p>
          <div className="mt-8 space-y-3">
            {[
              { icon: BarChart3, text: "Live KPIs across 16 intelligence modules" },
              { icon: Building2, text: "125 assets · $4.2B portfolio · 14 states" },
              { icon: ShieldCheck, text: "Enterprise-grade, role-based access" },
            ].map((row) => (
              <div key={row.text} className="flex items-center gap-3">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-white/15">
                  <row.icon className="h-4 w-4" />
                </div>
                <span className="text-sm text-white/90">{row.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-xs text-white/70">
          © {new Date().getFullYear()} Northstar Real Estate Group · Demo build
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-canvas p-6">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="grid h-10 w-10 place-items-center rounded-xl gradient-brand">
              <Activity className="h-6 w-6 text-white" strokeWidth={2.5} />
            </div>
            <div className="text-lg font-bold text-ink">REOS</div>
          </div>

          <h2 className="text-2xl font-bold text-ink">Welcome back</h2>
          <p className="mt-1 text-sm text-ink-muted">
            Sign in to your operating dashboard.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink-muted">
                Email
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100">
                <Mail className="h-4 w-4 text-ink-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-sm text-ink outline-none"
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink-muted">
                Password
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100">
                <Lock className="h-4 w-4 text-ink-muted" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-sm text-ink outline-none"
                  autoComplete="current-password"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-ink-soft">
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-3.5 w-3.5 rounded border-slate-300 text-brand-600"
                />
                Remember me
              </label>
              <button
                type="button"
                className="font-medium text-brand-600 hover:text-brand-700"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={busy}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:opacity-70"
            >
              {busy ? "Signing in…" : "Sign in"}
              {!busy && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          <div className="mt-6 rounded-lg border border-dashed border-slate-300 bg-white/60 px-3 py-2.5 text-xs text-ink-muted">
            <span className="font-semibold text-ink-soft">Demo access:</span>{" "}
            credentials are pre-filled — just click{" "}
            <span className="font-medium text-brand-600">Sign in</span>.
          </div>
        </div>
      </div>
    </div>
  );
}
