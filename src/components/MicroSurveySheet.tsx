"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import clsx from "clsx";
import {
  AbasRating,
  RATING_OPTIONS,
  getDomain,
  getItem,
} from "@/lib/abas";
import { useCaretakers } from "@/components/CaretakersProvider";
import { useSkillAssessments } from "@/components/SkillAssessmentsProvider";
import { sampleMicroSurveyItems } from "@/lib/skillAssessments";

export function MicroSurveySheet({
  onClose,
  onSaved,
}: {
  onClose: () => void;
  onSaved: () => void;
}) {
  const { activeCaretaker } = useCaretakers();
  const { itemStates, recordAssessmentsBatch } = useSkillAssessments();
  const sampledItems = useMemo(
    () => sampleMicroSurveyItems(itemStates, 4),
    [itemStates],
  );
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AbasRating | "skip">>(
    {},
  );

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  if (sampledItems.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm">
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute inset-0 w-full h-full cursor-default"
        />
        <div className="relative w-full max-w-2xl bg-background rounded-t-3xl shadow-2xl px-5 pt-6 pb-8 space-y-3 safe-bottom">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1.5 rounded-full bg-foreground/15" />
          <header className="text-center pt-2">
            <h2 className="text-lg font-semibold tracking-tight">
              Nothing to check on right now
            </h2>
            <p className="text-sm text-muted mt-1.5 leading-relaxed">
              Either we haven&apos;t set up Levi&apos;s baseline yet, or every
              growth-zone item was checked recently. Come back in a bit.
            </p>
          </header>
          <button
            onClick={onClose}
            className="w-full rounded-2xl border border-border py-3 text-sm font-medium"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const currentItemId = sampledItems[step];
  const currentItem = getItem(currentItemId);
  const currentDomain = currentItem ? getDomain(currentItem.domain) : null;
  const isLast = step === sampledItems.length - 1;

  function answer(rating: AbasRating | "skip") {
    const next = { ...answers, [currentItemId]: rating };
    setAnswers(next);
    if (isLast) {
      finish(next);
    } else {
      setStep(step + 1);
    }
  }

  function finish(allAnswers: Record<string, AbasRating | "skip">) {
    if (!activeCaretaker) return;
    const toRecord = Object.entries(allAnswers)
      .filter(([, r]) => r !== "skip")
      .map(([itemId, rating]) => ({
        itemId,
        rating: rating as AbasRating,
      }));
    if (toRecord.length > 0) {
      recordAssessmentsBatch(toRecord, activeCaretaker.id);
    }
    onSaved();
  }

  if (!currentItem || !currentDomain) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm">
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 w-full h-full cursor-default"
      />
      <div className="relative w-full max-w-2xl bg-background rounded-t-3xl shadow-2xl px-5 pt-6 pb-8 space-y-4 safe-bottom max-h-[92dvh] overflow-y-auto">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1.5 rounded-full bg-foreground/15" />

        <header className="pt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              Skill check · {step + 1} of {sampledItems.length}
            </span>
            <button
              type="button"
              onClick={() => answer("skip")}
              className="text-xs text-muted underline underline-offset-2"
            >
              Skip
            </button>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl" aria-hidden>
              {currentDomain.emoji}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-foreground/65">
              {currentDomain.label}
            </span>
          </div>
          <p className="text-base leading-relaxed">
            Have you seen Levi do this lately?
          </p>
          <p className="text-base font-medium mt-2 leading-relaxed">
            {currentItem.text}
          </p>
        </header>

        <div className="space-y-2 pt-2">
          {RATING_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => answer(opt.value)}
              className={clsx(
                "w-full flex items-center gap-3 rounded-2xl border-2 border-border bg-surface p-3.5 text-left active:scale-[0.99] hover:border-primary transition",
              )}
            >
              <span className="text-2xl">{opt.emoji}</span>
              <span className="flex-1 font-medium text-sm">{opt.label}</span>
              <ChevronRight size={16} className="text-muted" />
            </button>
          ))}
        </div>

        <p className="text-xs text-muted text-center pt-2 leading-relaxed">
          Honest answers move the picture forward. &quot;Not yet&quot; is just
          as valuable as &quot;always.&quot;
        </p>

        {isLast && Object.keys(answers).length === sampledItems.length - 1 && (
          <button
            type="button"
            onClick={() => answer("skip")}
            className="w-full mt-2 flex items-center justify-center gap-2 rounded-2xl bg-primary text-white font-semibold py-3"
          >
            <Check size={16} />
            Done
          </button>
        )}
      </div>
    </div>
  );
}
