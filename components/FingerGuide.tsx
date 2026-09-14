import { Keyboard } from "lucide-react";
import { VirtualKeyboard } from "@/components/VirtualKeyboard";
import type { KeyGuide } from "@/types/keyboard";
import type { TypingSettings } from "@/types/typing";

type Props = { guide: KeyGuide | null; settings: TypingSettings };

export function FingerGuide({ guide, settings }: Props) {
  const modifier = guide?.requiresShift
    ? settings.showShiftHand
      ? `${guide.shiftHand === "left" ? "Left" : "Right"} Shift`
      : "Shift"
    : "None";

  return (
    <aside className={`finger-guide ${settings.trainingMode === "finger" ? "finger-guide-prominent" : ""}`} aria-live="polite">
      {settings.showFingerGuide && (
        <div className="finger-guide-summary">
          <div className="finger-guide-title"><Keyboard size={14} /><span>NEXT KEY</span></div>
          <GuideValue label="Key" value={guide?.displayKey ?? "—"} accent />
          <GuideValue label="Finger" value={guide?.finger ?? "No standard mapping"} />
          <GuideValue label="Modifier" value={modifier} muted={!guide?.requiresShift} />
        </div>
      )}
      {settings.showVirtualKeyboard && <VirtualKeyboard guide={guide} />}
    </aside>
  );
}

function GuideValue({ label, value, accent = false, muted = false }: { label: string; value: string; accent?: boolean; muted?: boolean }) {
  return (
    <div className="guide-value">
      <span>{label}</span>
      <strong className={accent ? "guide-key-value" : muted ? "text-muted" : "text-text"}>{value}</strong>
    </div>
  );
}
