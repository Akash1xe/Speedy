import type { Finger, KeyboardKey } from "@/types/keyboard";

export const BASE_KEY_FINGERS: Record<string, Finger> = {
  "`": "Left Pinky", "1": "Left Pinky", q: "Left Pinky", a: "Left Pinky", z: "Left Pinky",
  "2": "Left Ring", w: "Left Ring", s: "Left Ring", x: "Left Ring",
  "3": "Left Middle", e: "Left Middle", d: "Left Middle", c: "Left Middle",
  "4": "Left Index", "5": "Left Index", r: "Left Index", t: "Left Index", f: "Left Index", g: "Left Index", v: "Left Index", b: "Left Index",
  "6": "Right Index", "7": "Right Index", y: "Right Index", u: "Right Index", h: "Right Index", j: "Right Index", n: "Right Index", m: "Right Index",
  "8": "Right Middle", i: "Right Middle", k: "Right Middle", ",": "Right Middle",
  "9": "Right Ring", o: "Right Ring", l: "Right Ring", ".": "Right Ring",
  "0": "Right Pinky", "-": "Right Pinky", "=": "Right Pinky", p: "Right Pinky", "[": "Right Pinky", "]": "Right Pinky", "\\": "Right Pinky", ";": "Right Pinky", "'": "Right Pinky", "/": "Right Pinky",
  " ": "Thumb", "\n": "Right Pinky", "\t": "Left Pinky",
};

export const SHIFTED_KEYS: Record<string, string> = {
  "~": "`", "!": "1", "@": "2", "#": "3", "$": "4", "%": "5", "^": "6", "&": "7", "*": "8", "(": "9", ")": "0",
  _: "-", "+": "=", "{": "[", "}": "]", "|": "\\", ":": ";", '"': "'", "<": ",", ">": ".", "?": "/",
};

const row = (keys: string[], labels: Record<string, string> = {}): KeyboardKey[] => keys.map((key) => ({
  key,
  label: labels[key] ?? key.toUpperCase(),
  finger: BASE_KEY_FINGERS[key],
}));

export const KEYBOARD_ROWS: KeyboardKey[][] = [
  row(["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="], { "`": "`", "-": "-", "=": "=" }),
  row(["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"], { "[": "[", "]": "]", "\\": "\\" }),
  row(["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"], { ";": ";", "'": "'" }),
  row(["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"], { ",": ",", ".": ".", "/": "/" }),
];

export const FINGER_CLASS: Record<Finger, string> = {
  "Left Pinky": "finger-lp", "Left Ring": "finger-lr", "Left Middle": "finger-lm", "Left Index": "finger-li",
  "Right Index": "finger-ri", "Right Middle": "finger-rm", "Right Ring": "finger-rr", "Right Pinky": "finger-rp", Thumb: "finger-thumb",
};
