"use client";

import { useState } from "react";
import { Clipboard, Upload } from "lucide-react";
import { FileUploader } from "@/components/FileUploader";
import { PasteCodePanel } from "@/components/PasteCodePanel";
import type { Language, PracticeSource, TypingSettings } from "@/types/typing";

type Props = { onStart: (source: PracticeSource) => void; settings: TypingSettings };

export function SetupScreen({ onStart }: Props) {
  const [tab, setTab] = useState<"paste" | "upload">("paste");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState<Language>("C++");

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
          {tab === "paste" ? (
            <PasteCodePanel code={code} language={language} onCodeChange={setCode} onLanguageChange={setLanguage} onStart={() => onStart({ code, language })} />
          ) : <FileUploader onStart={onStart} />}
          {tab === "paste" && code.length > 100_000 && <p className="mt-3 text-sm text-warning">This code is large and may affect typing performance.</p>}
        </div>
      </div>
    </section>
  );
}
