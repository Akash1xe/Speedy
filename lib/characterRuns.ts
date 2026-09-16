export type CharacterRun = { text: string; correct: boolean };

export function createCharacterRuns(displayText: string, sourceCode: string, globalStart = 0, comparisonText = displayText): CharacterRun[] {
  const runs: CharacterRun[] = [];
  for (let index = 0; index < displayText.length; index += 1) {
    const correct = comparisonText[index] === sourceCode[globalStart + index];
    const previous = runs.at(-1);
    if (previous?.correct === correct) previous.text += displayText[index];
    else runs.push({ text: displayText[index], correct });
  }
  return runs;
}
