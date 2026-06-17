import { cn } from "@/lib/utils";

export type Tone =
  | "neutral"
  | "green"
  | "amber"
  | "red"
  | "brand"
  | "blue";

const toneMap: Record<Tone, string> = {
  neutral: "bg-slate-100 text-slate-600",
  green: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-700",
  red: "bg-rose-50 text-rose-600",
  brand: "bg-brand-50 text-brand-700",
  blue: "bg-blue-50 text-blue-700",
};

export function Badge({
  children,
  tone = "neutral",
  dot = false,
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  dot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium",
        toneMap[tone],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            tone === "green" && "bg-emerald-500",
            tone === "amber" && "bg-amber-500",
            tone === "red" && "bg-rose-500",
            tone === "brand" && "bg-brand-500",
            tone === "blue" && "bg-blue-500",
            tone === "neutral" && "bg-slate-400"
          )}
        />
      )}
      {children}
    </span>
  );
}

/** Map common status / risk strings to a tone. */
export function statusTone(status: string): Tone {
  const s = status.toLowerCase();
  if (["connected", "on track", "complete", "active", "low", "high intent"].includes(s))
    return "green";
  if (["syncing", "at risk", "moderate", "medium", "harvesting", "paused"].includes(s))
    return "amber";
  if (["error", "delayed", "high", "critical"].includes(s)) return "red";
  if (["investing", "info"].includes(s)) return "blue";
  return "neutral";
}
