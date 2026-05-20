"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Sparkles, ClipboardList, LineChart, Cog } from "lucide-react";
import clsx from "clsx";

type Tab = {
  href: string;
  label: string;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  color: string;
};

const TABS: Tab[] = [
  { href: "/home", label: "Home", Icon: Home, color: "var(--accent-home)" },
  {
    href: "/activities",
    label: "Activities",
    Icon: Sparkles,
    color: "var(--accent-activities)",
  },
  {
    href: "/track",
    label: "Track",
    Icon: ClipboardList,
    color: "var(--accent-track)",
  },
  {
    href: "/progress",
    label: "Progress",
    Icon: LineChart,
    color: "var(--accent-progress)",
  },
  {
    href: "/settings",
    label: "Settings",
    Icon: Cog,
    color: "var(--accent-settings)",
  },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-0 inset-x-0 z-40 bg-surface border-t border-border safe-bottom"
      style={{ boxShadow: "0 -4px 12px rgba(45, 55, 72, 0.04)" }}
    >
      <ul className="flex items-stretch justify-around">
        {TABS.map((tab) => {
          const active = pathname.startsWith(tab.href);
          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                className="flex flex-col items-center justify-center gap-1 py-2.5 active:scale-95 transition"
                aria-current={active ? "page" : undefined}
              >
                <span
                  className={clsx(
                    "flex items-center justify-center w-10 h-10 rounded-full transition",
                    active ? "scale-110" : "opacity-70",
                  )}
                  style={{
                    color: active ? tab.color : "var(--muted)",
                    backgroundColor: active
                      ? "color-mix(in srgb, var(--accent-color) 18%, transparent)"
                      : "transparent",
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    ["--accent-color" as any]: tab.color,
                  }}
                >
                  <tab.Icon
                    size={22}
                    strokeWidth={active ? 2.4 : 2}
                  />
                </span>
                <span
                  className={clsx(
                    "text-[11px] font-medium leading-none",
                    active ? "text-foreground" : "text-muted",
                  )}
                >
                  {tab.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
