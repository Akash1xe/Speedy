import Link from "next/link";
import { Braces } from "lucide-react";

export function Navbar() {
  return (
    <header className="border-b border-border bg-panel/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight text-text">
          <span className="grid h-8 w-8 place-items-center rounded-md border border-accent/30 bg-accent/10 text-accent"><Braces size={17} /></span>
          CodeType
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-1 text-sm text-muted">
          <Link className="nav-link" href="/">Practice</Link>
          <Link className="nav-link" href="/stats">Stats</Link>
          <Link className="nav-link" href="/settings">Settings</Link>
        </nav>
      </div>
    </header>
  );
}
