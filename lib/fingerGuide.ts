import { BASE_KEY_FINGERS, SHIFTED_KEYS } from "@/lib/keyboardMap";
import type { Hand, KeyGuide } from "@/types/keyboard";

const leftFingers = new Set(["Left Pinky", "Left Ring", "Left Middle", "Left Index"]);

export function getKeyGuide(character: string): KeyGuide | null {
  if (!character) return null;

  const isUppercaseLetter = /^[A-Z]$/.test(character);
  const isShiftedSymbol = character in SHIFTED_KEYS;
  const requiresShift = isUppercaseLetter || isShiftedSymbol;
  const baseKey = isUppercaseLetter ? character.toLowerCase() : (SHIFTED_KEYS[character] ?? character);
  const finger = BASE_KEY_FINGERS[baseKey];
  if (!finger) return null;

  const keyHand: Hand = finger === "Thumb" ? "both" : leftFingers.has(finger) ? "left" : "right";
  const shiftHand = requiresShift ? (keyHand === "left" ? "right" : "left") : undefined;
  const displayKey = character === " " ? "Space" : character === "\n" ? "Enter" : character === "\t" ? "Tab" : character;
  const label = requiresShift ? `${finger} + ${shiftHand === "left" ? "Left" : "Right"} Shift` : finger;

  return {
    character,
    displayKey,
    baseKey: character === "\n" ? "Enter" : character === "\t" ? "Tab" : character === " " ? "Space" : baseKey,
    finger,
    hand: requiresShift ? "both" : keyHand,
    requiresShift,
    shiftHand,
    label,
  };
}
