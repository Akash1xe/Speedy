import { useRef, useState } from "react";
import { FileCode2, Play, UploadCloud, X } from "lucide-react";
import { detectLanguage, isSupportedFile } from "@/lib/languageUtils";
import { normalizeLineEndings } from "@/lib/normalizeCode";
import type { PracticeSource } from "@/types/typing";

type Props = { onStart: (source: PracticeSource) => void };

export function FileUploader({ onStart }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [source, setSource] = useState<PracticeSource | null>(null);
  const [error, setError] = useState("");

  const readFile = (file?: File) => {
    setError("");
    if (!file) return;
    if (!isSupportedFile(file.name)) { setSource(null); setError("Unsupported file type. Choose a source code or .txt file."); return; }
    const reader = new FileReader();
    reader.onload = () => {
      const code = normalizeLineEndings(String(reader.result ?? ""));
      if (!code.length) { setSource(null); setError("This file is empty. Choose a file that contains code."); return; }
      setSource({ code, language: detectLanguage(file.name), filename: file.name });
    };
    reader.onerror = () => setError("The file could not be read. Please try again.");
    reader.readAsText(file);
  };

  if (source) {
    return (
      <div>
        <div className="editor-shell overflow-hidden">
          <div className="editor-toolbar">
            <span className="flex items-center gap-2"><FileCode2 size={15} /> {source.filename}</span>
            <div className="flex items-center gap-3"><span>{source.language}</span><button aria-label="Remove file" onClick={() => setSource(null)}><X size={16} /></button></div>
          </div>
          <pre className="h-80 overflow-auto whitespace-pre p-5 font-mono text-[15px] leading-6 text-text">{source.code}</pre>
        </div>
        {source.code.length > 100_000 && <p className="mt-3 text-sm text-warning">This file is large and may affect typing performance.</p>}
        <button type="button" onClick={() => onStart(source)} className="primary-button mt-5"><Play size={16} fill="currentColor" /> Start Typing</button>
      </div>
    );
  }

  return (
    <div>
      <button type="button" onClick={() => inputRef.current?.click()} className="group grid h-80 w-full place-items-center rounded-lg border border-dashed border-border bg-background text-center transition hover:border-accent/60 hover:bg-accent/[.03]">
        <span>
          <span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-lg border border-border bg-panel text-muted group-hover:text-accent"><UploadCloud size={22} /></span>
          <span className="block font-medium text-text">Choose a code file</span>
          <span className="mt-2 block text-sm text-muted">.cpp, .h, .hpp, .c, .js, .jsx, .ts, .tsx, .py, .java, .go, .rs, .cs, .txt</span>
        </span>
      </button>
      <input ref={inputRef} className="sr-only" type="file" accept=".cpp,.h,.hpp,.c,.js,.jsx,.ts,.tsx,.py,.java,.go,.rs,.cs,.txt" onChange={(e) => readFile(e.target.files?.[0])} />
      {error && <p role="alert" className="mt-3 text-sm text-error">{error}</p>}
    </div>
  );
}
