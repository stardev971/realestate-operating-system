"use client";

import { useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Badge, type Tone } from "./Badge";
import { cn } from "@/lib/utils";

export interface DetailField {
  label: string;
  value: ReactNode;
}

export interface DetailSection {
  title?: string;
  /** Rendered as a label/value grid. */
  fields?: DetailField[];
  /** Optional free-form content rendered below the fields. */
  content?: ReactNode;
}

export interface DetailStat {
  label: string;
  value: ReactNode;
}

export type NoteTone = "default" | "positive" | "warning" | "critical";

export interface DetailNote {
  tone?: NoteTone;
  text: string;
}

export interface DetailConfig {
  /** Small uppercase label above the title, e.g. "Property · P-1001". */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  badge?: { text: string; tone?: Tone };
  /** Highlighted figures shown as a grid near the top. */
  stats?: DetailStat[];
  sections?: DetailSection[];
  /** Callout notes (insights, risks, recommendations). */
  notes?: DetailNote[];
  /** Optional primary action label (no-op demo button when set). */
  actionLabel?: string;
}

const noteStyle: Record<NoteTone, string> = {
  default: "bg-slate-50 text-ink-soft border-slate-200",
  positive: "bg-emerald-50 text-emerald-700 border-emerald-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  critical: "bg-rose-50 text-rose-600 border-rose-200",
};

export function DetailDrawer({
  config,
  onClose,
}: {
  config: DetailConfig | null;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {config && (
        <motion.div
          key="detail-drawer"
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px]"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.aside
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-canvas shadow-pop"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.26, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 border-b border-slate-200/70 bg-white px-5 py-4">
              <div>
                {config.eyebrow && (
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-brand-600">
                    {config.eyebrow}
                  </div>
                )}
                <h2 className="mt-0.5 text-lg font-bold leading-tight text-ink">
                  {config.title}
                </h2>
                {config.subtitle && (
                  <p className="mt-0.5 text-sm text-ink-muted">
                    {config.subtitle}
                  </p>
                )}
                {config.badge && (
                  <div className="mt-2">
                    <Badge tone={config.badge.tone ?? "neutral"} dot>
                      {config.badge.text}
                    </Badge>
                  </div>
                )}
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-slate-200 bg-white text-ink-soft transition hover:bg-slate-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-5 py-5">
              {config.stats && config.stats.length > 0 && (
                <div className="mb-5 grid grid-cols-2 gap-3">
                  {config.stats.map((s, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-slate-200/70 bg-white p-3 shadow-card"
                    >
                      <div className="text-lg font-bold leading-none tracking-tight text-ink">
                        {s.value}
                      </div>
                      <div className="mt-1.5 text-[11px] text-ink-muted">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {config.sections?.map((section, si) => (
                <div key={si} className="mb-5">
                  {section.title && (
                    <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
                      {section.title}
                    </div>
                  )}
                  {section.fields && section.fields.length > 0 && (
                    <div className="overflow-hidden rounded-xl border border-slate-200/70 bg-white">
                      {section.fields.map((f, fi) => (
                        <div
                          key={fi}
                          className={cn(
                            "flex items-center justify-between gap-4 px-4 py-2.5 text-sm",
                            fi > 0 && "border-t border-slate-100"
                          )}
                        >
                          <span className="text-ink-muted">{f.label}</span>
                          <span className="text-right font-medium text-ink">
                            {f.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  {section.content && <div className="mt-3">{section.content}</div>}
                </div>
              ))}

              {config.notes && config.notes.length > 0 && (
                <div className="space-y-2">
                  {config.notes.map((n, i) => (
                    <div
                      key={i}
                      className={cn(
                        "rounded-xl border px-3.5 py-2.5 text-[13px] leading-snug",
                        noteStyle[n.tone ?? "default"]
                      )}
                    >
                      {n.text}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200/70 bg-white px-5 py-3">
              <div className="flex gap-2">
                <button
                  onClick={onClose}
                  className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-ink-soft transition hover:bg-slate-50"
                >
                  Close
                </button>
                <button className="flex-1 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700">
                  {config.actionLabel ?? "Open full record"}
                </button>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
