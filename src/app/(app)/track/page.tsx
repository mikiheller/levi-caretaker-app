"use client";

import { useState } from "react";
import { Smile, Toilet, Lightbulb, ChevronRight } from "lucide-react";
import { SectionHero } from "@/components/SectionHero";
import { MoodSheet } from "@/components/MoodSheet";
import { useMoodLogs } from "@/components/MoodLogsProvider";
import { useCaretakers } from "@/components/CaretakersProvider";
import { MOOD_REASONS, moodOption } from "@/lib/moodLogs";
import { formatRelative } from "@/lib/activityLogs";

type Action = "mood" | "potty" | "behavior";

export default function TrackPage() {
  const [openSheet, setOpenSheet] = useState<Action | null>(null);
  const { logs } = useMoodLogs();
  const { caretakers } = useCaretakers();

  const recentMoods = logs.slice(0, 6);

  return (
    <div className="space-y-5">
      <SectionHero
        emoji="📝"
        title="Track"
        subtitle="Quick logs for mood, potty trips, and anything new you noticed."
        accentVar="--accent-track"
      />

      <section className="space-y-3">
        <QuickAction
          emoji="😊"
          icon={Smile}
          title="Log mood"
          subtitle="How is Levi today?"
          color="var(--cat-comm)"
          onClick={() => setOpenSheet("mood")}
        />
        <QuickAction
          emoji="🚽"
          icon={Toilet}
          title="Log potty"
          subtitle="Trips, accidents, opportunities"
          color="var(--cat-sensory)"
          onClick={() => setOpenSheet("potty")}
          disabled
          comingSoon
        />
        <QuickAction
          emoji="💡"
          icon={Lightbulb}
          title="Log new behavior"
          subtitle="Saw something new? Type, talk, or upload"
          color="var(--cat-special)"
          onClick={() => setOpenSheet("behavior")}
          disabled
          comingSoon
        />
      </section>

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3 px-1">
          Recent moods
        </h2>
        {recentMoods.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-surface/50 p-5 text-center">
            <p className="text-sm text-muted">
              No moods logged yet. Tap “Log mood” above to log how Levi is doing.
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            {recentMoods.map((log) => {
              const opt = moodOption(log.mood);
              const caretaker = caretakers.find(
                (c) => c.id === log.caretakerId,
              );
              const reasonLabels = log.reasons
                .map((r) => MOOD_REASONS.find((mr) => mr.value === r)?.label)
                .filter(Boolean) as string[];
              return (
                <li
                  key={log.id}
                  className="flex items-start gap-3 rounded-2xl bg-surface border border-border p-3"
                >
                  <span className="text-2xl leading-none">{opt.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{opt.label}</div>
                    <div className="text-xs text-muted">
                      {caretaker?.name ?? "Someone"} ·{" "}
                      {formatRelative(log.loggedAt)}
                    </div>
                    {reasonLabels.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {reasonLabels.map((rl) => (
                          <span
                            key={rl}
                            className="text-[11px] px-2 py-0.5 rounded-full bg-background border border-border text-foreground/70"
                          >
                            {rl}
                          </span>
                        ))}
                      </div>
                    )}
                    {log.note && (
                      <p className="text-xs text-foreground/75 mt-1.5 leading-relaxed">
                        “{log.note}”
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {openSheet === "mood" && (
        <MoodSheet
          onClose={() => setOpenSheet(null)}
          onSaved={() => setOpenSheet(null)}
        />
      )}
    </div>
  );
}

function QuickAction({
  emoji,
  title,
  subtitle,
  color,
  onClick,
  disabled,
  comingSoon,
}: {
  emoji: string;
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  subtitle: string;
  color: string;
  onClick: () => void;
  disabled?: boolean;
  comingSoon?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full flex items-center gap-4 rounded-2xl bg-surface border border-border p-4 active:scale-[0.99] transition shadow-sm text-left disabled:opacity-60 disabled:cursor-not-allowed"
    >
      <span
        className="flex items-center justify-center w-12 h-12 rounded-xl text-2xl shrink-0"
        style={{
          background: `color-mix(in srgb, ${color} 30%, white)`,
        }}
      >
        {emoji}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block font-semibold tracking-tight">{title}</span>
        <span className="block text-xs text-muted mt-0.5">{subtitle}</span>
      </span>
      {comingSoon ? (
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted shrink-0">
          Soon
        </span>
      ) : (
        <ChevronRight size={18} className="text-muted shrink-0" />
      )}
    </button>
  );
}
