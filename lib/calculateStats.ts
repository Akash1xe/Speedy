export function formatDuration(totalSeconds: number) {
  return `${String(Math.floor(totalSeconds / 60)).padStart(2, "0")}:${String(totalSeconds % 60).padStart(2, "0")}`;
}
export function calculateWpm(correctCharacters: number, elapsedSeconds: number) {
  return elapsedSeconds <= 0 ? 0 : Math.round((correctCharacters / 5) / (elapsedSeconds / 60));
}
export function calculateAccuracy(correctKeystrokes: number, totalKeystrokes: number) {
  return totalKeystrokes === 0 ? 100 : (correctKeystrokes / totalKeystrokes) * 100;
}
