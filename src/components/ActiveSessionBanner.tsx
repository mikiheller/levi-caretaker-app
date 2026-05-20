"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Play } from "lucide-react";
import { useActivityLogs } from "@/components/ActivityLogsProvider";
import { getActivityById } from "@/lib/activities";
import { formatDuration } from "@/lib/activityLogs";

export function ActiveSessionBanner() {
  const { activeSession } = useActivityLogs();
  const pathname = usePathname();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!activeSession) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [activeSession]);

  if (!activeSession) return null;
  const activity = getActivityById(activeSession.activityId);
  if (!activity) return null;

  const onPlayPage = pathname === `/activities/${activity.slug}/play`;
  if (onPlayPage) return null;

  const elapsed = Math.max(
    0,
    Math.floor((now - new Date(activeSession.startedAt).getTime()) / 1000),
  );

  return (
    <Link
      href={`/activities/${activity.slug}/play`}
      className="block bg-primary text-white rounded-2xl px-4 py-3 flex items-center gap-3 active:scale-[0.99] transition shadow-sm"
    >
      <span
        className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20"
        aria-hidden
      >
        <Play size={16} fill="white" />
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-xs font-semibold uppercase tracking-wider text-white/85">
          Activity in progress
        </span>
        <span className="block font-semibold truncate">
          {activity.emoji} {activity.title}
        </span>
      </span>
      <span
        className="font-mono text-lg font-semibold tabular-nums"
        suppressHydrationWarning
      >
        {formatDuration(elapsed)}
      </span>
    </Link>
  );
}
