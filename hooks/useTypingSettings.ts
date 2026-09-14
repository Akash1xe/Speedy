"use client";

import { useCallback, useEffect, useState } from "react";
import type { TypingSettings } from "@/types/typing";

export const DEFAULT_SETTINGS: TypingSettings = { tabSize: 4, fontSize: 16, showLineNumbers: true, showCurrentSourceCharacter: true, autoScroll: true };
const SETTINGS_KEY = "codetype-settings";

export function useTypingSettings() {
  const [settings, setSettingsState] = useState<TypingSettings>(DEFAULT_SETTINGS);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const saved = localStorage.getItem(SETTINGS_KEY);
        if (saved) setSettingsState({ ...DEFAULT_SETTINGS, ...JSON.parse(saved) });
      } catch { /* Keep safe defaults when storage is unavailable. */ }
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  const setSettings = useCallback((next: TypingSettings) => {
    setSettingsState(next);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
  }, []);
  return { settings, setSettings };
}
