import type { Language } from "@/types/typing";

export const languages: Language[] = ["C++", "C", "JavaScript", "TypeScript", "Python", "Java", "Go", "Rust", "C#", "Other"];
const extensionLanguage: Record<string, Language> = {
  cpp: "C++", h: "C++", hpp: "C++", c: "C", js: "JavaScript", jsx: "JavaScript",
  ts: "TypeScript", tsx: "TypeScript", py: "Python", java: "Java", go: "Go", rs: "Rust", cs: "C#", txt: "Other",
};
export const supportedExtensions = Object.keys(extensionLanguage);
export const getExtension = (filename: string) => filename.split(".").pop()?.toLowerCase() ?? "";
export const detectLanguage = (filename: string): Language => extensionLanguage[getExtension(filename)] ?? "Other";
export const isSupportedFile = (filename: string) => supportedExtensions.includes(getExtension(filename));
