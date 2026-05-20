"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import clsx from "clsx";
import { useActivityLogs } from "@/components/ActivityLogsProvider";
import { Activity } from "@/lib/activities";
import {
  ENGAGEMENT_LABELS,
  Engagement,
  MOOD_OPTIONS,
  Mood,
  formatDurationLong,
} from "@/lib/activityLogs";

export function PostActivitySurvey({
  activity,
  elapsedSeconds,
  onClose,
  onSaved,
}: {
  activity: Activity;
  elapsedSeconds: number;
  onClose: () => void;
  onSaved: () => void;
}) {
  const { finishSession } = useActivityLogs();
  const [mood, setMood] = useState<Mood | null>(null);
  const [engagement, setEngagement] = useState<Engagement | null>(null);
  const [note, setNote] = useState("");
  const [showNote, setShowNote] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  function save() {
    if (!mood || !engagement) return;
    const log = finishSession({
      mood,
      engagement,
      note: note.trim() || undefined,
    });
    if (log) onSaved();
  }

  const ready = Boolean(mood && engagement);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm">
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 w-full h-full cursor-default"
      />
      <div className="relative w-full max-w-2xl bg-background rounded-t-3xl shadow-2xl px-5 pt-6 pb-8 space-y-5 safe-bottom max-h-[90dvh] overflow-y-auto">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1.5 rounded-full bg-foreground/15" />

        <header className="text-center pt-2">
          <h2 className="text-lg font-semibold tracking-tight">
            How did {activity.emoji} {activity.title} go?
          </h2>
          <p className="text-xs text-muted mt-1">
            {formatDurationLong(elapsedSeconds)} · takes 10 seconds
          </p>
        </header>

        <section>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
            How was Levi&apos;s mood?
          </h3>
          <div className="flex justify-between gap-1.5">
            {MOOD_OPTIONS.map((opt) => {
              const isActive = mood === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setMood(opt.value)}
                  className={clsx(
                    "flex-1 flex flex-col items-center gap-1.5 rounded-2xl py-3 transition border-2",
                    isActive
                      ? "border-primary bg-primary-soft scale-105"
                      : "border-transparent bg-surface",
                  )}
                  aria-pressed={isActive}
                >
                  <span className="text-3xl leading-none">{opt.emoji}</span>
                  <span className="text-[10px] font-medium leading-none text-foreground/75">
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
            How engaged was he?
          </h3>
          <div className="flex justify-between gap-1.5">
            {([1, 2, 3, 4, 5] as Engagement[]).map((n) => {
              const isActive = engagement === n;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => setEngagement(n)}
                  className={clsx(
                    "flex-1 flex flex-col items-center gap-1.5 rounded-2xl py-3 transition border-2",
                    isActive
                      ? "border-primary bg-primary-soft scale-105"
                      : "border-transparent bg-surface",
                  )}
                  aria-pressed={isActive}
                >
                  <span className="text-2xl leading-none font-bold">{n}</span>
                  <span className="text-[10px] font-medium leading-none text-foreground/65 px-1 text-center">
                    {ENGAGEMENT_LABELS[n]}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section>
          {!showNote ? (
            <button
              type="button"
              onClick={() => setShowNote(true)}
              className="text-sm text-muted underline underline-offset-2"
            >
              Add a quick note (optional)
            </button>
          ) : (
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Anything notable? (optional)"
              rows={3}
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus:outline-none focus:border-primary"
              autoFocus
            />
          )}
        </section>

        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={save}
            disabled={!ready}
            className={clsx(
              "w-full flex items-center justify-center gap-2 rounded-2xl font-semibold py-4 transition shadow-lg active:scale-[0.98]",
              ready
                ? "bg-primary text-white"
                : "bg-primary/40 text-white cursor-not-allowed",
            )}
          >
            <Check size={18} />
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full text-sm text-muted py-2"
          >
            Not yet
          </button>
        </div>
      </div>
    </div>
  );
}
