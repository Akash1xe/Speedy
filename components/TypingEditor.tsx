import { forwardRef, memo, type KeyboardEvent, type RefObject } from "react";
import { createCharacterRuns } from "@/lib/characterRuns";
import type { TypingSettings } from "@/types/typing";

type Props = {
  typedCode: string; sourceCode: string; currentLine: number; currentColumn: number; focused: boolean; finished: boolean;
  settings: TypingSettings; viewportRef: RefObject<HTMLDivElement | null>; onFocus: () => void; onBlur: () => void; onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void; onScroll: (top: number) => void;
};

export const TypingEditor = memo(forwardRef<HTMLTextAreaElement, Props>(function TypingEditor(props, inputRef) {
  const { typedCode, sourceCode, currentLine, currentColumn, focused, finished, settings, viewportRef, onFocus, onBlur, onKeyDown, onScroll } = props;
  const lines = typedCode.split("\n");
  let globalIndex = 0;
  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col">
      <div className="editor-toolbar h-14 shrink-0">
        <strong className="text-text">YOUR TYPING</strong><span className="font-mono normal-case tracking-normal text-muted">Line {currentLine}, Column {currentColumn}</span>
      </div>
      <div className="relative min-h-0 flex-1">
        <div ref={viewportRef} onScroll={(e) => onScroll(e.currentTarget.scrollTop)} className="code-scroll absolute inset-0 cursor-text" style={{ fontSize: settings.fontSize, lineHeight: 1.65 }}>
          <div className="min-w-max py-4">
            {lines.map((line, lineIndex) => {
              const lineStart = globalIndex;
              globalIndex += line.length + (lineIndex < lines.length - 1 ? 1 : 0);
              const runs = createCharacterRuns(line, sourceCode, lineStart);
              return (
                <div key={lineIndex} className={`code-line ${lineIndex === lines.length - 1 ? "current-code-line" : ""}`}>
                  {settings.showLineNumbers && <span className="line-number">{lineIndex + 1}</span>}
                  <pre className="m-0 min-h-[1.65em] whitespace-pre font-mono">{runs.map((run, index) => <span key={index} className={run.correct ? "typed-correct" : "typed-incorrect"}>{run.text}</span>)}{lineIndex === lines.length - 1 && !finished && <span className="typing-caret" />}</pre>
                </div>
              );
            })}
          </div>
        </div>
        <textarea
          ref={inputRef}
          aria-label="Typing editor"
          aria-describedby="typing-help"
          value=""
          onChange={() => undefined}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
          onPaste={(e) => e.preventDefault()}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          className="absolute inset-0 z-10 h-full w-full cursor-text resize-none opacity-0"
          disabled={finished}
        />
        {!focused && !finished && <div className="pointer-events-none absolute inset-x-0 bottom-5 z-20 mx-auto w-fit rounded-md border border-border bg-panel px-3 py-2 text-xs text-muted shadow-lg">Click the typing area to continue</div>}
      </div>
    </section>
  );
}));
