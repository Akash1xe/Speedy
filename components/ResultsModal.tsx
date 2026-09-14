import { RotateCcw, Sparkles } from "lucide-react";
import { formatDuration } from "@/lib/calculateStats";
import type { FinishReason } from "@/types/typing";

type Props = { reason: FinishReason; elapsedTime: number; wpm: number; accuracy: number; errors: number; characters: number; typedCharacters: number; correctCharacters: number; onRetry: () => void; onNewCode: () => void };

export function ResultsModal(props: Props) {
  const title = props.reason === "completed" ? "Code Completed" : props.reason === "time" ? "Time’s Up" : "Session Submitted";
  const subtitle = props.reason === "completed" ? "Every character matched." : props.reason === "time" ? "Your selected time limit has ended." : "Your current progress has been recorded.";
  const rows = [["Time", formatDuration(props.elapsedTime)], ["WPM", props.wpm], ["Accuracy", `${props.accuracy.toFixed(1)}%`], ["Errors", props.errors], ["Typed characters", props.typedCharacters], ["Correct characters", props.correctCharacters], ["Source characters", props.characters]];
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="results-title">
      <div className="w-full max-w-lg rounded-xl border border-border bg-panel p-7 shadow-2xl">
        <div className="mb-7 flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-full bg-correct/10 text-correct"><Sparkles size={21} /></span><div><h2 id="results-title" className="text-2xl font-semibold text-text">{title}</h2><p className="mt-1 text-sm text-muted">{subtitle}</p></div></div>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border">
          {rows.map(([label, value]) => <div key={label} className="bg-background p-4"><div className="text-xs text-muted">{label}</div><div className="mt-1 font-mono text-xl text-text">{value}</div></div>)}
        </div>
        <div className="mt-7 flex gap-3"><button className="secondary-button flex-1" onClick={props.onRetry}><RotateCcw size={16} /> Retry</button><button className="primary-button flex-1" onClick={props.onNewCode}>Practice New Code</button></div>
      </div>
    </div>
  );
}
