"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useActivityLogs } from "@/components/ActivityLogsProvider";
import { useCaretakers } from "@/components/CaretakersProvider";
import { SectionHero } from "@/components/SectionHero";
import { getActivityById } from "@/lib/activities";
import { MOOD_OPTIONS, formatDurationLong, formatRelative } from "@/lib/activityLogs";

export default function HomePage() {
  const { activeCaretaker, caretakers } = useCaretakers();
  const { logs } = useActivityLogs();
  const firstName = activeCaretaker?.name.split(" ")[0] ?? "friend";

  const recent = logs.slice(0, 5);

  return (
    <div className="space-y-5">
      <SectionHero
        emoji="🌻"
        title={`Hi, ${firstName}!`}
        subtitle="Glad you're here. Pick something to do, or log a moment with Levi."
        accentVar="--accent-home"
      />

      <Link
        href="/activities"
        className="flex items-center gap-3 rounded-2xl bg-primary text-white p-4 active:scale-[0.98] transition shadow-md"
      >
        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20">
          <Sparkles size={18} />
        </span>
        <div className="flex-1">
          <div className="font-semibold">Pick an activity</div>
          <div className="text-xs text-white/85">
            Cards, lesson plans, and a timer
          </div>
        </div>
      </Link>

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3 px-1">
          Recent activities
        </h2>
        {recent.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-surface/50 p-5 text-center">
            <p className="text-sm text-muted">
              No activities logged yet. Pick a card and try one with Levi!
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            {recent.map((log) => {
              const activity = getActivityById(log.activityId);
              const caretaker = caretakers.find(
                (c) => c.id === log.caretakerId,
              );
              const mood = MOOD_OPTIONS.find((m) => m.value === log.mood);
              return (
                <li
                  key={log.id}
                  className="flex items-center gap-3 rounded-2xl bg-surface border border-border p-3"
                >
                  <span className="text-2xl">{activity?.emoji ?? "✨"}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">
                      {activity?.title ?? "Activity"}
                    </div>
                    <div className="text-xs text-muted">
                      {formatDurationLong(log.durationSeconds)} ·{" "}
                      {caretaker?.name ?? "Someone"} · {formatRelative(log.endedAt)}
                    </div>
                  </div>
                  {mood && (
                    <span className="text-2xl" title={mood.label}>
                      {mood.emoji}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
