import type { Finger, KeyGuide } from "@/types/keyboard";

type Props = { guide: KeyGuide | null; showShiftHand: boolean };
type HandSide = "left" | "right";

const fingers: Array<{ part: string; suffix: "Pinky" | "Ring" | "Middle" | "Index" | "Thumb" }> = [
  { part: "pinky", suffix: "Pinky" },
  { part: "ring", suffix: "Ring" },
  { part: "middle", suffix: "Middle" },
  { part: "index", suffix: "Index" },
  { part: "thumb", suffix: "Thumb" },
];

export function HandGuide({ guide, showShiftHand }: Props) {
  const instruction = guide
    ? `Press ${guide.displayKey} with ${guide.finger}${guide.requiresShift ? ` + ${showShiftHand ? `${guide.shiftHand === "left" ? "Left" : "Right"} Shift` : "Shift"}` : ""}`
    : "Ready for the next key";

  return (
    <div className="hands-guide" aria-label={instruction}>
      <Hand side="left" guide={guide} />
      <div className="hands-instruction">
        <span>NEXT MOVE</span>
        <strong>{instruction}</strong>
      </div>
      <Hand side="right" guide={guide} />
    </div>
  );
}

function Hand({ side, guide }: { side: HandSide; guide: KeyGuide | null }) {
  const titleSide = side === "left" ? "Left" : "Right";
  return (
    <div className={`touch-hand touch-hand-${side}`} aria-hidden="true">
      <div className="hand-palm"><span>{titleSide}</span></div>
      {fingers.map(({ part, suffix }) => {
        const finger = (suffix === "Thumb" ? "Thumb" : `${titleSide} ${suffix}`) as Finger;
        const isPrimary = guide?.finger === finger && (finger !== "Thumb" || guide.hand === "both");
        const isShift = suffix === "Pinky" && guide?.requiresShift && guide.shiftHand === side;
        return (
          <span
            key={part}
            data-finger={finger === "Thumb" ? `${titleSide} Thumb` : finger}
            className={`hand-finger hand-${part} ${isPrimary ? "hand-finger-active" : ""} ${isShift ? "hand-finger-shift" : ""}`}
          >
            <i />
          </span>
        );
      })}
    </div>
  );
}
