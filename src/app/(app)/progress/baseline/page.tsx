"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, ChevronLeft, ChevronRight, FastForward } from "lucide-react";
import clsx from "clsx";
import {
  AbasRating,
  DOMAINS,
  RATING_OPTIONS,
  itemsByDomain,
} from "@/lib/abas";
import { useCaretakers } from "@/components/CaretakersProvider";
import { useSkillAssessments } from "@/components/SkillAssessmentsProvider";

export default function BaselinePage() {
  const router = useRouter();
  const { activeCaretaker } = useCaretakers();
  const {
    itemStates,
    recordAssessmentsBatch,
    setBaselineDone,
  } = useSkillAssessments();
  const [domainIdx, setDomainIdx] = useState(0);
  const [pending, setPending] = useState<Record<string, AbasRating>>({});

  const domain = DOMAINS[domainIdx];
  const items = useMemo(() => itemsByDomain(domain.id), [domain.id]);

  function setRating(itemId: string, rating: AbasRating) {
    setPending((prev) => ({ ...prev, [itemId]: rating }));
  }

  function ratingFor(itemId: string): AbasRating | null {
    if (itemId in pending) return pending[itemId];
    return itemStates.get(itemId)?.latestRating ?? null;
  }

  function commitDomain() {
    if (!activeCaretaker) return;
    const batch = Object.entries(pending).map(([itemId, rating]) => ({
      itemId,
      rating,
    }));
    if (batch.length > 0) {
      recordAssessmentsBatch(batch, activeCaretaker.id);
    }
    setPending({});
  }

  function goNext() {
    commitDomain();
    if (domainIdx < DOMAINS.length - 1) {
      setDomainIdx(domainIdx + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setBaselineDone(true);
      router.push("/progress");
    }
  }

  function goPrev() {
    commitDomain();
    if (domainIdx > 0) {
      setDomainIdx(domainIdx - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function fillRestNotYet() {
    const next = { ...pending };
    for (const item of items) {
      if (ratingFor(item.id) === null) {
        next[item.id] = 0;
      }
    }
    setPending(next);
  }

  const rated = items.filter((i) => ratingFor(i.id) !== null).length;
  const total = items.length;

  return (
    <div className="space-y-5 pb-32">
      <Link
        href="/progress"
        className="inline-flex items-center gap-1 text-sm text-muted -mt-1"
      >
        <ChevronLeft size={16} />
        Back to Progress
      </Link>

      <header
        className="rounded-3xl p-6"
        style={{
          background: "color-mix(in srgb, var(--accent-progress) 18%, white)",
        }}
      >
        <div className="text-xs font-semibold uppercase tracking-wider text-foreground/60 mb-2">
          Baseline · {domainIdx + 1} of {DOMAINS.length}
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-3xl">{domain.emoji}</span>
          <h1 className="text-xl font-semibold tracking-tight">{domain.label}</h1>
        </div>
        <p className="text-sm text-foreground/75 leading-relaxed">
          {domain.blurb} For each item, pick where Levi is{" "}
          <em>today</em>. Items are ordered from easier to harder. Once a few
          in a row are &quot;not yet,&quot; tap &quot;Skip rest as not yet&quot;
          to fly through.
        </p>
        <div className="mt-3 text-xs text-foreground/60">
          {rated} of {total} rated
        </div>
      </header>

      <ul className="space-y-3">
        {items.map((item) => {
          const current = ratingFor(item.id);
          return (
            <li
              key={item.id}
              className="rounded-2xl bg-surface border border-border p-4"
            >
              <p className="text-sm leading-relaxed mb-3">{item.text}</p>
              <div className="grid grid-cols-4 gap-1.5">
                {RATING_OPTIONS.map((opt) => {
                  const active = current === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setRating(item.id, opt.value)}
                      className={clsx(
                        "flex flex-col items-center gap-1 rounded-xl py-2.5 transition border-2 text-[10px]",
                        active
                          ? "border-primary bg-primary-soft"
                          : "border-transparent bg-background",
                      )}
                      aria-pressed={active}
                    >
                      <span className="text-lg leading-none">{opt.emoji}</span>
                      <span className="font-medium">{opt.shortLabel}</span>
                    </button>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={fillRestNotYet}
        className="w-full flex items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-surface/50 py-3 text-sm font-medium text-muted"
      >
        <FastForward size={15} />
        Skip rest of this domain as &quot;not yet&quot;
      </button>

      <div
        className="fixed inset-x-0 bottom-0 z-30 bg-gradient-to-t from-background via-background to-background/0 pt-6 pb-3 px-5 safe-bottom"
        style={{ paddingBottom: "calc(1rem + var(--safe-bottom))" }}
      >
        <div className="max-w-2xl mx-auto flex gap-2">
          <button
            type="button"
            onClick={goPrev}
            disabled={domainIdx === 0}
            className="flex items-center justify-center gap-1 rounded-2xl border border-border bg-surface px-5 py-3.5 text-sm font-medium disabled:opacity-40"
          >
            <ChevronLeft size={16} />
            Back
          </button>
          <button
            type="button"
            onClick={goNext}
            className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-primary text-white font-semibold py-3.5 active:scale-[0.98] transition shadow-lg"
          >
            {domainIdx === DOMAINS.length - 1 ? (
              <>
                <Check size={16} />
                Finish baseline
              </>
            ) : (
              <>
                Next domain
                <ChevronRight size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
