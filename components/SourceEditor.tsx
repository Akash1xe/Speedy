import { forwardRef, memo } from "react";
import type { TypingSettings } from "@/types/typing";

type Props = { code: string; typedCode: string; currentIndex: number; language: string; settings: TypingSettings; onScroll: (top: number) => void };

export const SourceEditor = memo(forwardRef<HTMLDivElement, Props>(function SourceEditor({ code, typedCode, currentIndex, language, settings, onScroll }, ref) {
  const lines = code.split("\n");
  const currentLine = code.slice(0, currentIndex).split("\n").length - 1;
  let offset = 0;
  return (
    <section className="flex min-h-0 flex-1 flex-col border-b border-border lg:border-b-0 lg:border-r">
      <div className="editor-toolbar h-14 shrink-0">
        <div><strong className="text-text">SOURCE CODE</strong><span className="ml-3 normal-case tracking-normal text-muted">{language} • {lines.length} {lines.length === 1 ? "line" : "lines"}</span></div>
        <span className="rounded border border-border px-2 py-1 font-mono text-[10px]">READ ONLY</span>
      </div>
      <div ref={ref} onScroll={(e) => onScroll(e.currentTarget.scrollTop)} className="code-scroll" style={{ fontSize: settings.fontSize, lineHeight: 1.65 }}>
        <div className="min-w-max py-4">
          {lines.map((line, lineIndex) => {
            const lineStart = offset;
            offset += line.length + 1;
            const cursorColumn = currentIndex - lineStart;
            return (
              <div key={lineIndex} className={`code-line ${lineIndex === currentLine ? "current-code-line" : ""}`}>
                {settings.showLineNumbers && <span className="line-number">{lineIndex + 1}</span>}
                <pre className="m-0 min-h-[1.65em] whitespace-pre font-mono text-text">{line.split("").map((char, index) => {
                  const characterIndex = lineStart + index;
                  let feedbackClass = "";
                  if (characterIndex < typedCode.length) {
                    feedbackClass = typedCode[characterIndex] === char ? "typed-correct" : "typed-incorrect";
                  } else if (settings.showCurrentSourceCharacter && characterIndex === currentIndex) {
                    feedbackClass = "expected-char";
                  }
                  return <span key={index} className={feedbackClass}>{char}</span>;
                })}{settings.showCurrentSourceCharacter && lineIndex === currentLine && cursorColumn === line.length && <span className="expected-char"> </span>}</pre>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}));
