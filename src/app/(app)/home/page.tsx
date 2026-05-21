"use client";

import Link from "next/link";
import { useState } from "react";
import { Sparkles, Plus } from "lucide-react";
import { useActivityLogs } from "@/components/ActivityLogsProvider";
import { useCaretakers } from "@/components/CaretakersProvider";
import { useMoodLogs } from "@/components/MoodLogsProvider";
import { MoodSheet } from "@/components/MoodSheet";
import { SectionHero } from "@/components/SectionHero";
import { getActivityById } from "@/lib/activities";
import { MOOD_OPTIONS, formatDurationLong, formatRelative } from "@/lib/activityLogs";
import { MOOD_REASONS, isToday, moodOption } from "@/lib/moodLogs";

export default function HomePage() {
  const { activeCaretaker, caretakers } = useCaretakers();
  const { logs: activityLogs } = useActivityLogs();
  const { logs: moodLogs } = useMoodLogs();
  const [moodSheetOpen, setMoodSheetOpen] = useState(false);

  const firstName = activeCaretaker?.name.split(" ")[0] ?? "friend";

  const todaysMoods = moodLogs.filter((m) => isToday(m.loggedAt));
  const latestTodaysMood = todaysMoods[0] ?? null;
  const recentActivities = activityLogs.slice(0, 5);

  return (
    <div className="space-y-5">
      <SectionHero
        emoji="🌻"
        title={`Hi, ${firstName}!`}
        subtitle="Glad you're here. Pick something to do, or log a moment with Levi."
        accentVar="--accent-home"
      />

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3 px-1">
          Today
        </h2>
        {latestTodaysMood ? (
          <button
            onClick={() => setMoodSheetOpen(true)}
            className="w-full flex items-center gap-3 rounded-2xl bg-surface border border-border p-4 active:scale-[0.99] transition text-left"
          >
            <span className="text-4xl leading-none">
              {moodOption(latestTodaysMood.mood).emoji}
            </span>
            <div className="flex-1 min-w-0">
              <div className="font-medium">
                {moodOption(latestTodaysMood.mood).label}
                {todaysMoods.length > 1 && (
                  <span className="text-xs text-muted font-normal ml-2">
                    + {todaysMoods.length - 1} more today
                  </span>
                )}
              </div>
              <div className="text-xs text-muted">
                {caretakers.find((c) => c.id === latestTodaysMood.caretakerId)
                  ?.name ?? "Someone"}{" "}
                · {formatRelative(latestTodaysMood.loggedAt)}
              </div>
              {latestTodaysMood.reasons.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {latestTodaysMood.reasons.map((r) => {
                    const m = MOOD_REASONS.find((mr) => mr.value === r);
                    if (!m) return null;
                    return (
                      <span
                        key={r}
                        className="text-[11px] px-2 py-0.5 rounded-full bg-background border border-border text-foreground/70"
                      >
                        {m.label}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
            <Plus size={16} className="text-muted shrink-0" />
          </button>
        ) : (
          <button
            onClick={() => setMoodSheetOpen(true)}
            className="w-full flex items-center gap-3 rounded-2xl border-2 border-dashed border-border bg-surface/50 p-4 active:scale-[0.99] transition text-left"
          >
            <span className="text-3xl">😊</span>
            <div className="flex-1">
              <div className="font-semibold tracking-tight">
                How is Levi today?
              </div>
              <div className="text-xs text-muted mt-0.5">
                Tap to log mood (5 seconds)
              </div>
            </div>
          </button>
        )}
      </section>

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
        {recentActivities.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-surface/50 p-5 text-center">
            <p className="text-sm text-muted">
              No activities logged yet. Pick a card and try one with Levi!
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            {recentActivities.map((log) => {
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
                      {caretaker?.name ?? "Someone"} ·{" "}
                      {formatRelative(log.endedAt)}
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

      {moodSheetOpen && (
        <MoodSheet
          onClose={() => setMoodSheetOpen(false)}
          onSaved={() => setMoodSheetOpen(false)}
        />
      )}
    </div>
  );
}
