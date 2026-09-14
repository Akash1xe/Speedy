"use client";

import { useState } from "react";
import { Clipboard, Clock3, Upload } from "lucide-react";
import { FileUploader } from "@/components/FileUploader";
import { PasteCodePanel } from "@/components/PasteCodePanel";
import type { Language, PracticeSource, TypingSettings } from "@/types/typing";

type Props = { onStart: (source: PracticeSource) => void; settings: TypingSettings };

export function SetupScreen({ onStart }: Props) {
  const [tab, setTab] = useState<"paste" | "upload">("paste");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState<Language>("C++");
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(0);
  const start = (source: PracticeSource) => onStart({ ...source, timeLimitMinutes: timeLimitMinutes || undefined });

  return (
    <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <div className="mb-12 max-w-3xl">
        <p className="mb-4 font-mono text-sm text-accent">{"// deliberate practice for developers"}</p>
        <h1 className="text-4xl font-semibold tracking-[-0.04em] text-text md:text-6xl">Type code. Build speed.<br /><span className="text-muted">Make fewer mistakes.</span></h1>
        <p className="mt-6 text-lg text-muted">Practice typing real code with instant character-level feedback.</p>
      </div>
      <div className="rounded-xl border border-border bg-panel p-1 shadow-2xl shadow-black/20">
        <div className="flex border-b border-border px-3 pt-2">
          <button className={`tab-button ${tab === "paste" ? "tab-active" : ""}`} onClick={() => setTab("paste")}><Clipboard size={15} /> Paste Code</button>
          <button className={`tab-button ${tab === "upload" ? "tab-active" : ""}`} onClick={() => setTab("upload")}><Upload size={15} /> Upload File</button>
        </div>
        <div className="p-5 md:p-6">
          <div className="mb-5 flex flex-col justify-between gap-3 rounded-lg border border-border bg-background px-4 py-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3"><Clock3 size={17} className="text-accent" /><div><div className="text-sm font-medium text-text">Time limit</div><div className="text-xs text-muted">Choose how long you have to complete the code.</div></div></div>
            <select aria-label="Time limit" className="control min-w-40" value={timeLimitMinutes} onChange={(event) => setTimeLimitMinutes(Number(event.target.value))}>
              <option value={0}>No limit</option>
              <option value={1}>1 minute</option>
              <option value={3}>3 minutes</option>
              <option value={5}>5 minutes</option>
              <option value={10}>10 minutes</option>
              <option value={15}>15 minutes</option>
            </select>
          </div>
          {tab === "paste" ? (
            <PasteCodePanel code={code} language={language} onCodeChange={setCode} onLanguageChange={setLanguage} onStart={() => start({ code, language })} />
          ) : <FileUploader onStart={start} />}
          {tab === "paste" && code.length > 100_000 && <p className="mt-3 text-sm text-warning">This code is large and may affect typing performance.</p>}
        </div>
      </div>
    </section>
  );
}
