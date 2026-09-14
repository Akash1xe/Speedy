"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowLeft, Braces, Send } from "lucide-react";
import { ProgressBar } from "@/components/ProgressBar";
import { FingerGuide } from "@/components/FingerGuide";
import { ResultsModal } from "@/components/ResultsModal";
import { SourceEditor } from "@/components/SourceEditor";
import { TypingEditor } from "@/components/TypingEditor";
import { TypingStats } from "@/components/TypingStats";
import { useTypingTest } from "@/hooks/useTypingTest";
import { saveSession } from "@/lib/sessionHistory";
import { getKeyGuide } from "@/lib/fingerGuide";
import type { PracticeSource, TypingSettings } from "@/types/typing";

type Props = { source: PracticeSource; settings: TypingSettings; onNewCode: () => void };

export function PracticeScreen({ source, settings, onNewCode }: Props) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const sourceViewportRef = useRef<HTMLDivElement>(null);
  const typingViewportRef = useRef<HTMLDivElement>(null);
  const syncingRef = useRef(false);
  const savedRef = useRef(false);
  const [focused, setFocused] = useState(false);

  const persistResult = useCallback((result: { elapsedTime: number; wpm: number; accuracy: number; errors: number }) => {
    if (savedRef.current) return;
    savedRef.current = true;
    saveSession({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, date: new Date().toISOString(), language: source.language,
      filename: source.filename, wpm: result.wpm, accuracy: result.accuracy, errors: result.errors,
      duration: result.elapsedTime, characterCount: source.code.length,
    });
  }, [source.code.length, source.filename, source.language]);
  const typing = useTypingTest(source.code, persistResult);
  const finishSession = typing.finishSession;
  const keyGuide = getKeyGuide(source.code[typing.currentIndex] ?? "");
  const timeLimitSeconds = (source.timeLimitMinutes ?? 0) * 60;
  const remainingTime = timeLimitSeconds ? Math.max(0, timeLimitSeconds - typing.elapsedTime) : undefined;

  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    if (!settings.autoScroll || !sourceViewportRef.current || !typingViewportRef.current) return;
    const lineHeight = settings.fontSize * 1.65;
    const target = Math.max(0, (typing.currentLine - 4) * lineHeight);
    sourceViewportRef.current.scrollTop = target;
    typingViewportRef.current.scrollTop = target;
  }, [settings.autoScroll, settings.fontSize, typing.currentLine]);

  useEffect(() => {
    if (timeLimitSeconds > 0 && typing.isStarted && !typing.isFinished && typing.elapsedTime >= timeLimitSeconds) {
      finishSession("time", timeLimitSeconds);
    }
  }, [finishSession, timeLimitSeconds, typing.elapsedTime, typing.isFinished, typing.isStarted]);

  const syncScroll = useCallback((from: "source" | "typing", top: number) => {
    if (syncingRef.current) return;
    syncingRef.current = true;
    const target = from === "source" ? typingViewportRef.current : sourceViewportRef.current;
    if (target) target.scrollTop = top;
    requestAnimationFrame(() => { syncingRef.current = false; });
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (typing.isFinished) return;
    if (event.key === "Backspace") { event.preventDefault(); typing.handleBackspace(); return; }
    if (event.key === "Tab") { event.preventDefault(); typing.handleTab(settings.tabSize); return; }
    if (event.key === "Enter") { event.preventDefault(); typing.handleEnter(); return; }
    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault(); typing.appendText(event.key);
    }
  };

  const retry = () => {
    savedRef.current = false;
    typing.reset();
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  return (
    <main className="flex h-screen min-h-[700px] flex-col overflow-hidden bg-background">
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-panel px-5 lg:px-7">
        <div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-md border border-accent/30 bg-accent/10 text-accent"><Braces size={17} /></span><span className="font-semibold text-text">CodeType</span></div>
        <div className="flex items-center gap-2">
          <button className="primary-button h-9 min-h-0 px-3 text-xs" onClick={() => finishSession("submitted")} disabled={typing.isFinished}><Send size={14} /> Submit</button>
          <button className="secondary-button h-9 px-3 text-xs" onClick={onNewCode}><ArrowLeft size={14} /> New code</button>
        </div>
      </header>
      <div className="shrink-0 border-b border-border bg-panel">
        <TypingStats elapsedTime={typing.elapsedTime} remainingTime={remainingTime} wpm={typing.wpm} accuracy={typing.accuracy} errors={typing.errors} progress={typing.progress} />
        <ProgressBar progress={typing.progress} />
      </div>
      <p id="typing-help" className="sr-only">Type the source code exactly. Tab inserts spaces and Backspace removes the most recent character.</p>
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <SourceEditor ref={sourceViewportRef} code={source.code} typedCode={typing.typedCode} currentIndex={typing.currentIndex} language={source.language} settings={settings} onScroll={(top) => syncScroll("source", top)} />
        <div className="flex min-h-0 flex-1 flex-col">
          {!typing.isFinished && (settings.showFingerGuide || settings.showVirtualKeyboard) && <FingerGuide guide={keyGuide} settings={settings} />}
          <TypingEditor ref={inputRef} viewportRef={typingViewportRef} typedCode={typing.typedCode} sourceCode={source.code} currentLine={typing.currentLine} currentColumn={typing.currentColumn} focused={focused} finished={typing.isFinished} settings={settings} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onKeyDown={handleKeyDown} onScroll={(top) => syncScroll("typing", top)} />
        </div>
      </div>
      {typing.isFinished && <ResultsModal reason={typing.finishReason ?? "submitted"} elapsedTime={typing.elapsedTime} wpm={typing.wpm} accuracy={typing.accuracy} errors={typing.errors} characters={source.code.length} typedCharacters={typing.typedCode.length} correctCharacters={typing.correctCharacters} onRetry={retry} onNewCode={onNewCode} />}
    </main>
  );
}
