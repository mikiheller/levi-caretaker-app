"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import clsx from "clsx";
import { MOOD_OPTIONS, Mood } from "@/lib/activityLogs";
import { MOOD_REASONS, MoodReason, isNegativeMood } from "@/lib/moodLogs";
import { useCaretakers } from "@/components/CaretakersProvider";
import { useMoodLogs } from "@/components/MoodLogsProvider";

export function MoodSheet({
  onClose,
  onSaved,
}: {
  onClose: () => void;
  onSaved: () => void;
}) {
  const { activeCaretaker } = useCaretakers();
  const { logMood } = useMoodLogs();
  const [mood, setMood] = useState<Mood | null>(null);
  const [reasons, setReasons] = useState<Set<MoodReason>>(new Set());
  const [note, setNote] = useState("");
  const [showNote, setShowNote] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  function toggleReason(r: MoodReason) {
    const next = new Set(reasons);
    if (next.has(r)) next.delete(r);
    else next.add(r);
    setReasons(next);
  }

  function save() {
    if (!mood || !activeCaretaker) return;
    logMood({
      caretakerId: activeCaretaker.id,
      mood,
      reasons: Array.from(reasons),
      note: note.trim() || undefined,
    });
    onSaved();
  }

  const showReasons = mood !== null && isNegativeMood(mood);
  const canSave = Boolean(mood);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm">
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 w-full h-full cursor-default"
      />
      <div className="relative w-full max-w-2xl bg-background rounded-t-3xl shadow-2xl px-5 pt-6 pb-8 space-y-5 safe-bottom max-h-[92dvh] overflow-y-auto">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1.5 rounded-full bg-foreground/15" />

        <header className="text-center pt-2">
          <h2 className="text-lg font-semibold tracking-tight">
            How is Levi today?
          </h2>
          <p className="text-xs text-muted mt-1">
            Tap a face. Done in 5 seconds.
          </p>
        </header>

        <section>
          <div className="flex justify-between gap-1.5">
            {MOOD_OPTIONS.map((opt) => {
              const isActive = mood === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    setMood(opt.value);
                    if (!isNegativeMood(opt.value)) {
                      setReasons(new Set());
                    }
                  }}
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

        {showReasons && (
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
              What might be going on? (optional)
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {MOOD_REASONS.map((r) => {
                const isActive = reasons.has(r.value);
                return (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => toggleReason(r.value)}
                    className={clsx(
                      "inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium border-2 transition",
                      isActive
                        ? "border-primary bg-primary-soft"
                        : "border-border bg-surface text-foreground/80",
                    )}
                    aria-pressed={isActive}
                  >
                    <span aria-hidden>{r.emoji}</span>
                    {r.label}
                  </button>
                );
              })}
            </div>
          </section>
        )}

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
              placeholder="What did you notice? (optional)"
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
            disabled={!canSave}
            className={clsx(
              "w-full flex items-center justify-center gap-2 rounded-2xl font-semibold py-4 transition shadow-lg active:scale-[0.98]",
              canSave
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
