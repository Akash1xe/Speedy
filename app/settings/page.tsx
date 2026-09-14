import { Navbar } from "@/components/Navbar";
import { SettingsPanel } from "@/components/SettingsPanel";

export default function SettingsPage() {
  return <main className="min-h-screen bg-background"><Navbar /><section className="mx-auto max-w-4xl px-6 py-14"><p className="font-mono text-sm text-accent">{"// preferences"}</p><h1 className="mt-3 text-4xl font-semibold tracking-tight text-text">Typing settings</h1><p className="mb-9 mt-3 text-muted">Saved automatically in this browser.</p><SettingsPanel /></section></main>;
}
