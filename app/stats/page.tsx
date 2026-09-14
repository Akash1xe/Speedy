"use client";

import { useEffect, useState } from "react";
import { BarChart3, Clock3 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { formatDuration } from "@/lib/calculateStats";
import { getSessionHistory } from "@/lib/sessionHistory";
import type { SessionResult } from "@/types/typing";

export default function StatsPage() {
  const [history, setHistory] = useState<SessionResult[]>([]);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setHistory(getSessionHistory()));
    return () => cancelAnimationFrame(frame);
  }, []);
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-5xl px-6 py-14">
        <p className="font-mono text-sm text-accent">{"// session history"}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-text">Your recent practice</h1>
        <p className="mb-9 mt-3 text-muted">Your latest 25 completed sessions, stored locally.</p>
        {!history.length ? (
          <div className="grid min-h-72 place-items-center rounded-xl border border-dashed border-border bg-panel text-center"><div><BarChart3 className="mx-auto text-muted" size={28} /><h2 className="mt-4 font-medium text-text">No completed sessions yet</h2><p className="mt-2 text-sm text-muted">Finish a code sample to see your stats here.</p></div></div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border bg-panel">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-border text-xs uppercase tracking-wider text-muted"><tr><th className="p-4">Session</th><th>WPM</th><th>Accuracy</th><th>Errors</th><th>Time</th><th>Characters</th></tr></thead>
              <tbody>{history.map((item) => <tr key={item.id} className="border-b border-border last:border-0"><td className="p-4"><div className="font-medium text-text">{item.filename ?? item.language}</div><div className="mt-1 flex items-center gap-1 text-xs text-muted"><Clock3 size={12} /> {new Date(item.date).toLocaleString()}</div></td><td className="font-mono text-text">{item.wpm}</td><td className="font-mono text-text">{item.accuracy.toFixed(1)}%</td><td className="font-mono text-error">{item.errors}</td><td className="font-mono text-text">{formatDuration(item.duration)}</td><td className="font-mono text-text">{item.characterCount}</td></tr>)}</tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
