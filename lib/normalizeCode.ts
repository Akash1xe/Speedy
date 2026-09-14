export function normalizeLineEndings(code: string) {
  return code.replace(/\r\n?/g, "\n");
}

export function normalizeCode(code: string, tabSize: 2 | 4) {
  return normalizeLineEndings(code).replace(/\t/g, " ".repeat(tabSize));
}
