"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { calculateAccuracy, calculateWpm } from "@/lib/calculateStats";

type CompletionSnapshot = { elapsedTime: number; wpm: number; accuracy: number; errors: number };

export function useTypingTest(sourceCode: string, onFinish?: (snapshot: CompletionSnapshot) => void) {
  const [typedCode, setTypedCode] = useState("");
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [errors, setErrors] = useState(0);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [finishedAt, setFinishedAt] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const typedRef = useRef(typedCode);

  useEffect(() => { typedRef.current = typedCode; }, [typedCode]);

  useEffect(() => {
    if (startedAt === null || finishedAt !== null) return;
    const tick = () => setElapsedTime(Math.floor((Date.now() - startedAt) / 1000));
    tick();
    const timer = window.setInterval(tick, 250);
    return () => window.clearInterval(timer);
  }, [startedAt, finishedAt]);

  const appendText = useCallback((text: string) => {
    if (!text || finishedAt !== null) return;
    const current = typedRef.current;
    const accepted = text.slice(0, Math.max(0, sourceCode.length - current.length));
    if (!accepted) return;
    const now = Date.now();
    if (startedAt === null) setStartedAt(now);
    let wrong = 0;
    for (let offset = 0; offset < accepted.length; offset += 1) {
      if (accepted[offset] !== sourceCode[current.length + offset]) wrong += 1;
    }
    const next = current + accepted;
    setTotalKeystrokes((value) => value + accepted.length);
    setErrors((value) => value + wrong);
    setTypedCode(next);
    if (next === sourceCode) {
      const finalElapsed = startedAt === null ? 0 : Math.max(1, Math.floor((now - startedAt) / 1000));
      const finalErrors = errors + wrong;
      const finalKeystrokes = totalKeystrokes + accepted.length;
      setFinishedAt(now);
      setElapsedTime(finalElapsed);
      onFinish?.({
        elapsedTime: finalElapsed,
        wpm: calculateWpm(sourceCode.length, finalElapsed),
        accuracy: calculateAccuracy(finalKeystrokes - finalErrors, finalKeystrokes),
        errors: finalErrors,
      });
    }
  }, [errors, finishedAt, onFinish, sourceCode, startedAt, totalKeystrokes]);

  const handleBackspace = useCallback(() => {
    if (finishedAt === null) setTypedCode((value) => value.slice(0, -1));
  }, [finishedAt]);
  const reset = useCallback(() => {
    setTypedCode(""); setTotalKeystrokes(0); setErrors(0); setStartedAt(null); setFinishedAt(null); setElapsedTime(0);
  }, []);

  const stats = useMemo(() => {
    let correctCharacters = 0;
    for (let i = 0; i < typedCode.length; i += 1) if (typedCode[i] === sourceCode[i]) correctCharacters += 1;
    const lines = typedCode.split("\n");
    return {
      currentIndex: typedCode.length, currentLine: lines.length, currentColumn: (lines.at(-1)?.length ?? 0) + 1,
      correctCharacters, incorrectCharacters: typedCode.length - correctCharacters,
      accuracy: calculateAccuracy(totalKeystrokes - errors, totalKeystrokes),
      wpm: calculateWpm(correctCharacters, elapsedTime),
      progress: sourceCode.length ? Math.min(100, (typedCode.length / sourceCode.length) * 100) : 0,
    };
  }, [elapsedTime, errors, sourceCode, totalKeystrokes, typedCode]);

  return {
    sourceCode, typedCode, totalKeystrokes, errors, elapsedTime, isStarted: startedAt !== null,
    isFinished: finishedAt !== null, appendText, handleBackspace,
    handleTab: (size: 2 | 4) => appendText(" ".repeat(size)), handleEnter: () => appendText("\n"), reset, ...stats,
  };
}
