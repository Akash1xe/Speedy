import { FINGER_CLASS, KEYBOARD_ROWS } from "@/lib/keyboardMap";
import type { KeyGuide, KeyboardKey } from "@/types/keyboard";

type Props = { guide: KeyGuide | null };

export function VirtualKeyboard({ guide }: Props) {
  const activeBaseKey = guide?.baseKey.toLowerCase();
  const isActive = (key: string) => activeBaseKey === key.toLowerCase();
  const renderKey = (item: KeyboardKey) => (
    <span
      key={item.key}
      title={item.finger}
      className={`keyboard-key ${FINGER_CLASS[item.finger]} ${isActive(item.key) ? "keyboard-key-active" : ""}`}
    >
      {item.label}
    </span>
  );

  return (
    <div className="virtual-keyboard" aria-label="Virtual keyboard guide">
      <div className="keyboard-row">{KEYBOARD_ROWS[0].map(renderKey)}</div>
      <div className="keyboard-row"><span className={`keyboard-key keyboard-key-wide finger-lp ${isActive("Tab") ? "keyboard-key-active" : ""}`}>Tab</span>{KEYBOARD_ROWS[1].map(renderKey)}</div>
      <div className="keyboard-row keyboard-row-indented">{KEYBOARD_ROWS[2].map(renderKey)}<span className={`keyboard-key keyboard-key-wide finger-rp ${isActive("Enter") ? "keyboard-key-active" : ""}`}>Enter</span></div>
      <div className="keyboard-row">
        <span className={`keyboard-key keyboard-key-shift finger-lp ${guide?.requiresShift && guide.shiftHand === "left" ? "keyboard-key-active" : ""}`}>L Shift</span>
        {KEYBOARD_ROWS[3].map(renderKey)}
        <span className={`keyboard-key keyboard-key-shift finger-rp ${guide?.requiresShift && guide.shiftHand === "right" ? "keyboard-key-active" : ""}`}>R Shift</span>
      </div>
      <div className="keyboard-row keyboard-row-space"><span className={`keyboard-key keyboard-key-space finger-thumb ${isActive("Space") ? "keyboard-key-active" : ""}`}>Space</span></div>
    </div>
  );
}
