export type Finger =
  | "Left Pinky"
  | "Left Ring"
  | "Left Middle"
  | "Left Index"
  | "Right Index"
  | "Right Middle"
  | "Right Ring"
  | "Right Pinky"
  | "Thumb";

export type Hand = "left" | "right" | "both";

export type KeyGuide = {
  character: string;
  displayKey: string;
  baseKey: string;
  finger: Finger;
  hand: Hand;
  requiresShift: boolean;
  shiftHand?: "left" | "right";
  label: string;
};

export type KeyboardKey = {
  key: string;
  label: string;
  finger: Finger;
  width?: "wide" | "space";
};
