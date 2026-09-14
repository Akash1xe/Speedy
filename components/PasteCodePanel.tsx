import { Play } from "lucide-react";
import { languages } from "@/lib/languageUtils";
import type { Language } from "@/types/typing";

type Props = { code: string; language: Language; onCodeChange: (value: string) => void; onLanguageChange: (value: Language) => void; onStart: () => void };

export function PasteCodePanel({ code, language, onCodeChange, onLanguageChange, onStart }: Props) {
  return (
    <div>
      <div className="editor-shell overflow-hidden">
        <div className="editor-toolbar">
          <span>CODE INPUT</span>
          <select aria-label="Programming language" value={language} onChange={(e) => onLanguageChange(e.target.value as Language)} className="control h-8 py-0">
            {languages.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
        <textarea
          aria-label="Source code"
          spellCheck={false}
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          placeholder="Paste your code here..."
          className="h-80 w-full resize-y bg-background p-5 font-mono text-[15px] leading-6 text-text outline-none placeholder:text-muted/60"
        />
      </div>
      <button type="button" onClick={onStart} disabled={!code.length} className="primary-button mt-5">
        <Play size={16} fill="currentColor" /> Start Typing
      </button>
    </div>
  );
}
