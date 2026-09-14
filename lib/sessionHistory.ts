import type { SessionResult } from "@/types/typing";

export const HISTORY_KEY = "codetype-session-history";
export function getSessionHistory(): SessionResult[] {
  if (typeof window === "undefined") return [];
  try {
    const value = JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]");
    return Array.isArray(value) ? value : [];
  } catch { return []; }
}
export function saveSession(result: SessionResult) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify([result, ...getSessionHistory()].slice(0, 25)));
}
