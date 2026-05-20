"use client";

import Link from "next/link";
import { useCaretakers } from "@/components/CaretakersProvider";

export function AppHeader() {
  const { activeCaretaker } = useCaretakers();

  return (
    <header className="sticky top-0 z-30 bg-background/85 backdrop-blur-md border-b border-border safe-top">
      <div className="flex items-center justify-between px-5 h-14 max-w-2xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden>
            🌻
          </span>
          <span className="font-semibold tracking-tight">Levi&apos;s App</span>
        </div>
        {activeCaretaker && (
          <Link
            href="/settings"
            className="flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1.5 active:scale-95 transition"
          >
            <span aria-hidden>{activeCaretaker.emoji}</span>
            <span className="text-sm font-medium">
              {activeCaretaker.name}
            </span>
          </Link>
        )}
      </div>
    </header>
  );
}
