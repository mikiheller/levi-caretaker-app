"use client";

import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { CaretakerPicker } from "@/components/CaretakerPicker";
import { useCaretakers } from "@/components/CaretakersProvider";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { ready, activeCaretaker } = useCaretakers();

  if (!ready) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted text-sm">
        Loading…
      </div>
    );
  }

  if (!activeCaretaker) {
    return (
      <main className="flex-1 flex items-center justify-center min-h-[100dvh] py-12">
        <CaretakerPicker />
      </main>
    );
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <AppHeader />
      <main
        className="flex-1 max-w-2xl w-full mx-auto px-5 pt-4"
        style={{ paddingBottom: "calc(5rem + var(--safe-bottom))" }}
      >
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
