import { HandGuide } from "@/components/HandGuide";
import { VirtualKeyboard } from "@/components/VirtualKeyboard";
import type { KeyGuide } from "@/types/keyboard";
import type { TypingSettings } from "@/types/typing";

type Props = { guide: KeyGuide | null; settings: TypingSettings };

export function FingerGuide({ guide, settings }: Props) {
  return (
    <aside className={`finger-guide ${settings.trainingMode === "finger" ? "finger-guide-prominent" : ""}`} aria-live="polite">
      {settings.showVirtualKeyboard && <VirtualKeyboard guide={guide} />}
      {settings.showFingerGuide && <HandGuide guide={guide} showShiftHand={settings.showShiftHand} />}
    </aside>
  );
}
