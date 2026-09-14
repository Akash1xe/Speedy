"use client";

import { RotateCcw } from "lucide-react";
import { DEFAULT_SETTINGS, useTypingSettings } from "@/hooks/useTypingSettings";
import type { TypingSettings } from "@/types/typing";

const Toggle = ({ checked, onChange, label }: { checked: boolean; onChange: (value: boolean) => void; label: string }) => (
  <button type="button" role="switch" aria-checked={checked} aria-label={label} onClick={() => onChange(!checked)} className={`toggle ${checked ? "toggle-on" : ""}`}><span /></button>
);

export function SettingsPanel() {
  const { settings, setSettings } = useTypingSettings();
  const update = <K extends keyof TypingSettings>(key: K, value: TypingSettings[K]) => setSettings({ ...settings, [key]: value });
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-panel">
      <SettingRow title="Tab size" description="Tabs are converted to this many spaces.">
        <div className="segmented">{([2, 4] as const).map((size) => <button key={size} className={settings.tabSize === size ? "selected" : ""} onClick={() => update("tabSize", size)}>{size} spaces</button>)}</div>
      </SettingRow>
      <SettingRow title="Font size" description="Code editor text size.">
        <div className="segmented">{([14, 16, 18, 20, 22] as const).map((size) => <button key={size} className={settings.fontSize === size ? "selected" : ""} onClick={() => update("fontSize", size)}>{size}</button>)}</div>
      </SettingRow>
      <SettingRow title="Line numbers" description="Show visual line numbers in both editors."><Toggle label="Show line numbers" checked={settings.showLineNumbers} onChange={(value) => update("showLineNumbers", value)} /></SettingRow>
      <SettingRow title="Current source character" description="Highlight the next expected character."><Toggle label="Show current source character" checked={settings.showCurrentSourceCharacter} onChange={(value) => update("showCurrentSourceCharacter", value)} /></SettingRow>
      <SettingRow title="Auto scroll" description="Keep the current source line in view."><Toggle label="Enable auto scroll" checked={settings.autoScroll} onChange={(value) => update("autoScroll", value)} /></SettingRow>
      <div className="flex justify-end border-t border-border p-5"><button className="secondary-button" onClick={() => setSettings(DEFAULT_SETTINGS)}><RotateCcw size={15} /> Restore defaults</button></div>
    </div>
  );
}

function SettingRow({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return <div className="flex flex-col justify-between gap-4 border-b border-border p-5 last:border-0 sm:flex-row sm:items-center"><div><h2 className="font-medium text-text">{title}</h2><p className="mt-1 text-sm text-muted">{description}</p></div>{children}</div>;
}
