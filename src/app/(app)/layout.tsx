"use client";

import { usePathname } from "next/navigation";
import { ActiveSessionBanner } from "@/components/ActiveSessionBanner";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { CaretakerPicker } from "@/components/CaretakerPicker";
import { useCaretakers } from "@/components/CaretakersProvider";

const TOP_LEVEL_ROUTES = ["/home", "/activities", "/track", "/progress", "/settings"];

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { ready, activeCaretaker } = useCaretakers();
  const pathname = usePathname();

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

  const showNav = TOP_LEVEL_ROUTES.includes(pathname);

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <AppHeader />
      <main
        className="flex-1 max-w-2xl w-full mx-auto px-5 pt-4 space-y-4"
        style={{
          paddingBottom: showNav
            ? "calc(5rem + var(--safe-bottom))"
            : "calc(1rem + var(--safe-bottom))",
        }}
      >
        <ActiveSessionBanner />
        {children}
      </main>
      {showNav && <BottomNav />}
    </div>
  );
}
