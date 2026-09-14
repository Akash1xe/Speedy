export function ProgressBar({ progress }: { progress: number }) {
  return <div className="h-1 w-full overflow-hidden bg-border/60"><div className="h-full bg-accent transition-[width] duration-150" style={{ width: `${progress}%` }} /></div>;
}
