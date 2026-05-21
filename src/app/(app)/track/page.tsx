"use client";

import { Fragment, useState } from "react";
import { Smile, Toilet, Lightbulb, ChevronRight } from "lucide-react";
import { SectionHero } from "@/components/SectionHero";
import { MoodSheet } from "@/components/MoodSheet";
import { PottySheet } from "@/components/PottySheet";
import { BehaviorSheet } from "@/components/BehaviorSheet";
import { useMoodLogs } from "@/components/MoodLogsProvider";
import { usePottyLogs } from "@/components/PottyLogsProvider";
import { useBehaviorLogs } from "@/components/BehaviorLogsProvider";
import { useCaretakers } from "@/components/CaretakersProvider";
import { MOOD_REASONS, moodOption } from "@/lib/moodLogs";
import { formatRelative } from "@/lib/activityLogs";
import { summarizePotty } from "@/lib/pottyLogs";

type Sheet = "mood" | "potty" | "behavior" | null;

type FeedItem =
  | { kind: "mood"; key: string; ts: string; node: React.ReactNode }
  | { kind: "potty"; key: string; ts: string; node: React.ReactNode }
  | { kind: "behavior"; key: string; ts: string; node: React.ReactNode };

export default function TrackPage() {
  const [openSheet, setOpenSheet] = useState<Sheet>(null);
  const { logs: moodLogs } = useMoodLogs();
  const { logs: pottyLogs } = usePottyLogs();
  const { logs: behaviorLogs } = useBehaviorLogs();
  const { caretakers } = useCaretakers();

  function nameOf(id: string): string {
    return caretakers.find((c) => c.id === id)?.name ?? "Someone";
  }

  const feed: FeedItem[] = [
    ...moodLogs.map<FeedItem>((log) => {
      const opt = moodOption(log.mood);
      const reasonLabels = log.reasons
        .map((r) => MOOD_REASONS.find((mr) => mr.value === r)?.label)
        .filter(Boolean) as string[];
      return {
        kind: "mood",
        key: log.id,
        ts: log.loggedAt,
        node: (
          <li className="flex items-start gap-3 rounded-2xl bg-surface border border-border p-3">
            <span className="text-2xl leading-none">{opt.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm">Mood · {opt.label}</div>
              <div className="text-xs text-muted">
                {nameOf(log.caretakerId)} · {formatRelative(log.loggedAt)}
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
                  &ldquo;{log.note}&rdquo;
                </p>
              )}
            </div>
          </li>
        ),
      };
    }),
    ...pottyLogs.map<FeedItem>((log) => ({
      kind: "potty",
      key: log.id,
      ts: log.loggedAt,
      node: (
        <li className="flex items-start gap-3 rounded-2xl bg-surface border border-border p-3">
          <span className="text-2xl leading-none">
            {log.type === "toilet" ? "🚽" : "💧"}
          </span>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm">{summarizePotty(log)}</div>
            <div className="text-xs text-muted">
              {nameOf(log.caretakerId)} · {formatRelative(log.loggedAt)}
            </div>
          </div>
        </li>
      ),
    })),
    ...behaviorLogs.map<FeedItem>((log) => ({
      kind: "behavior",
      key: log.id,
      ts: log.loggedAt,
      node: (
        <li className="flex items-start gap-3 rounded-2xl bg-surface border border-border p-3">
          <span className="text-2xl leading-none">💡</span>
          <div className="flex-1 min-w-0">
            <div className="text-sm leading-relaxed">{log.text}</div>
            <div className="text-xs text-muted mt-1">
              {nameOf(log.caretakerId)} · {formatRelative(log.loggedAt)}
            </div>
            {log.media.length > 0 && (
              <div className="flex gap-1.5 mt-2">
                {log.media.slice(0, 4).map((m, idx) => (
                  <div
                    key={`${m.url}-${idx}`}
                    className="w-14 h-14 rounded-lg overflow-hidden bg-foreground/5"
                  >
                    {m.type === "photo" ? (
                      <img
                        src={m.url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video src={m.url} className="w-full h-full object-cover" muted />
                    )}
                  </div>
                ))}
                {log.media.length > 4 && (
                  <div className="w-14 h-14 rounded-lg bg-foreground/5 flex items-center justify-center text-xs text-muted">
                    +{log.media.length - 4}
                  </div>
                )}
              </div>
            )}
          </div>
        </li>
      ),
    })),
  ]
    .sort((a, b) => (a.ts < b.ts ? 1 : -1))
    .slice(0, 12);

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
        />
        <QuickAction
          emoji="💡"
          icon={Lightbulb}
          title="Log new behavior"
          subtitle="Saw something new? Type, talk, or upload"
          color="var(--cat-special)"
          onClick={() => setOpenSheet("behavior")}
        />
      </section>

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3 px-1">
          Recent
        </h2>
        {feed.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-surface/50 p-5 text-center">
            <p className="text-sm text-muted">
              Nothing logged yet. Tap one of the buttons above to start.
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            {feed.map((item) => (
              <Fragment key={item.key}>{item.node}</Fragment>
            ))}
          </ul>
        )}
      </section>

      {openSheet === "mood" && (
        <MoodSheet
          onClose={() => setOpenSheet(null)}
          onSaved={() => setOpenSheet(null)}
        />
      )}
      {openSheet === "potty" && (
        <PottySheet
          onClose={() => setOpenSheet(null)}
          onSaved={() => setOpenSheet(null)}
        />
      )}
      {openSheet === "behavior" && (
        <BehaviorSheet
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
}: {
  emoji: string;
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  subtitle: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 rounded-2xl bg-surface border border-border p-4 active:scale-[0.99] transition shadow-sm text-left"
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
      <ChevronRight size={18} className="text-muted shrink-0" />
    </button>
  );
}
