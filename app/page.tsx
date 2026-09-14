"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { PracticeScreen } from "@/components/PracticeScreen";
import { SetupScreen } from "@/components/SetupScreen";
import { useTypingSettings } from "@/hooks/useTypingSettings";
import { normalizeCode } from "@/lib/normalizeCode";
import type { PracticeSource } from "@/types/typing";

export default function Home() {
  const [practice, setPractice] = useState<PracticeSource | null>(null);
  const { settings } = useTypingSettings();

  const startPractice = (source: PracticeSource) => {
    setPractice({ ...source, code: normalizeCode(source.code, settings.tabSize) });
  };

  if (practice) {
    return <PracticeScreen source={practice} settings={settings} onNewCode={() => setPractice(null)} />;
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <SetupScreen onStart={startPractice} settings={settings} />
    </main>
  );
}
