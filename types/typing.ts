export type Language = "C++" | "C" | "JavaScript" | "TypeScript" | "Python" | "Java" | "Go" | "Rust" | "C#" | "Other";

export type TypingSettings = {
  tabSize: 2 | 4;
  fontSize: 14 | 16 | 18 | 20 | 22;
  showLineNumbers: boolean;
  showCurrentSourceCharacter: boolean;
  autoScroll: boolean;
  showFingerGuide: boolean;
  showVirtualKeyboard: boolean;
  showShiftHand: boolean;
  trainingMode: "normal" | "finger";
};

export type PracticeSource = { code: string; language: Language; filename?: string; timeLimitMinutes?: number };

export type FinishReason = "completed" | "submitted" | "time";

export type SessionResult = {
  id: string; date: string; language: Language; filename?: string; wpm: number;
  accuracy: number; errors: number; duration: number; characterCount: number;
};
