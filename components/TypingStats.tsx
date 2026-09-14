import { formatDuration } from "@/lib/calculateStats";

type Props = { elapsedTime: number; wpm: number; accuracy: number; errors: number; progress: number };

export function TypingStats({ elapsedTime, wpm, accuracy, errors, progress }: Props) {
  const items = [
    ["Time", formatDuration(elapsedTime)], ["WPM", String(wpm)], ["Accuracy", `${accuracy.toFixed(1)}%`],
    ["Errors", String(errors)], ["Progress", `${Math.floor(progress)}%`],
  ];
  return (
    <div className="grid grid-cols-2 gap-y-4 px-5 py-4 sm:grid-cols-5 sm:px-8">
      {items.map(([label, value]) => (
        <div key={label} className="border-border sm:border-r sm:last:border-0 sm:text-center">
          <div className="text-[11px] font-semibold uppercase tracking-[.14em] text-muted">{label}</div>
          <div className={`mt-1 font-mono text-xl font-medium ${label === "Errors" && value !== "0" ? "text-error" : "text-text"}`}>{value}</div>
        </div>
      ))}
    </div>
  );
}
