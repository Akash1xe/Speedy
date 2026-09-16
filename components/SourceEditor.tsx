import { forwardRef, memo } from "react";
import { createCharacterRuns } from "@/lib/characterRuns";
import type { TypingSettings } from "@/types/typing";

type Props = { code: string; typedCode: string; currentIndex: number; language: string; settings: TypingSettings; onScroll: (top: number) => void };

export const SourceEditor = memo(forwardRef<HTMLDivElement, Props>(function SourceEditor({ code, typedCode, currentIndex, language, settings, onScroll }, ref) {
  const lines = code.split("\n");
  const currentLine = code.slice(0, currentIndex).split("\n").length - 1;
  let offset = 0;
  return (
    <section className="flex min-h-0 min-w-0 flex-1 basis-0 flex-col border-b border-border lg:border-b-0 lg:border-r">
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
            const typedLength = Math.max(0, Math.min(line.length, typedCode.length - lineStart));
            const runs = createCharacterRuns(line.slice(0, typedLength), code, lineStart, typedCode.slice(lineStart, lineStart + typedLength));
            const hasExpectedCharacter = settings.showCurrentSourceCharacter && currentIndex === lineStart + typedLength && typedLength < line.length;
            return (
              <div key={lineIndex} className={`code-line ${lineIndex === currentLine ? "current-code-line" : ""}`}>
                {settings.showLineNumbers && <span className="line-number">{lineIndex + 1}</span>}
                <pre className="m-0 min-h-[1.65em] whitespace-pre font-mono text-text">
                  {runs.map((run, index) => <span key={index} className={run.correct ? "typed-correct" : "typed-incorrect"}>{run.text}</span>)}
                  {hasExpectedCharacter && <span className="expected-char">{line[typedLength]}</span>}
                  {line.slice(typedLength + (hasExpectedCharacter ? 1 : 0))}
                  {settings.showCurrentSourceCharacter && lineIndex === currentLine && cursorColumn === line.length && <span className="expected-char"> </span>}
                </pre>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}));
