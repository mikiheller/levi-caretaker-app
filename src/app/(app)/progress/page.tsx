"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, ListChecks, Sparkles } from "lucide-react";
import { SectionHero } from "@/components/SectionHero";
import { MicroSurveySheet } from "@/components/MicroSurveySheet";
import { useSkillAssessments } from "@/components/SkillAssessmentsProvider";
import { DOMAINS, getItem, getDomain } from "@/lib/abas";
import { domainProgress } from "@/lib/skillAssessments";

export default function ProgressPage() {
  const { itemStates, baselineDone, assessments } = useSkillAssessments();
  const [surveyOpen, setSurveyOpen] = useState(false);

  const totalAssessed = useMemo(
    () => Array.from(itemStates.values()).filter((s) => s.latestRating !== null).length,
    [itemStates],
  );

  const domainStats = useMemo(
    () => DOMAINS.map((d) => domainProgress(d.id, itemStates)),
    [itemStates],
  );

  const recentAssessments = useMemo(
    () => assessments.slice(0, 6),
    [assessments],
  );

  return (
    <div className="space-y-5">
      <SectionHero
        emoji="📈"
        title="Progress"
        subtitle={
          baselineDone
            ? "Where Levi is today, what's just starting to emerge, and what's coming next."
            : "Set Levi's baseline once, then everyone can chip in 30 seconds at a time."
        }
        accentVar="--accent-progress"
      />

      {!baselineDone && (
        <Link
          href="/progress/baseline"
          className="flex items-center gap-3 rounded-2xl bg-primary text-white p-4 active:scale-[0.98] transition shadow-md"
        >
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20">
            <ListChecks size={18} />
          </span>
          <div className="flex-1">
            <div className="font-semibold">Set up Levi&apos;s baseline</div>
            <div className="text-xs text-white/85">
              About 15-20 minutes. Done once by a parent. ABAS-3 based.
            </div>
          </div>
          <ChevronRight size={16} className="text-white/85" />
        </Link>
      )}

      {baselineDone && (
        <button
          onClick={() => setSurveyOpen(true)}
          className="w-full flex items-center gap-3 rounded-2xl bg-primary text-white p-4 active:scale-[0.98] transition shadow-md"
        >
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20">
            <Sparkles size={18} />
          </span>
          <div className="flex-1 text-left">
            <div className="font-semibold">Quick skill check</div>
            <div className="text-xs text-white/85">
              4 questions from Levi&apos;s growth zone. Takes 30 seconds.
            </div>
          </div>
          <ChevronRight size={16} className="text-white/85" />
        </button>
      )}

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3 px-1">
          By domain
        </h2>
        {totalAssessed === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-surface/50 p-5 text-center">
            <p className="text-sm text-muted">
              Once the baseline is set, this is where you&apos;ll see where
              Levi is in each developmental domain.
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            {domainStats.map((stat) => {
              const d = getDomain(stat.domain);
              return (
                <li
                  key={stat.domain}
                  className="rounded-2xl bg-surface border border-border p-4"
                >
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-xl">{d.emoji}</span>
                    <span className="font-medium">{d.label}</span>
                    <span className="ml-auto text-xs text-muted">
                      {stat.mastered + stat.emerging + stat.notYet}/{stat.totalItems}
                    </span>
                  </div>
                  <DomainBar stat={stat} />
                  <div className="flex flex-wrap gap-2 mt-2.5 text-[11px] text-foreground/70">
                    <span className="inline-flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      {stat.mastered} mastered
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-yellow-500" />
                      {stat.emerging} emerging
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-foreground/25" />
                      {stat.notYet} not yet
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {baselineDone && recentAssessments.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3 px-1">
            Recent skill checks
          </h2>
          <ul className="space-y-2">
            {recentAssessments.map((a) => {
              const item = getItem(a.itemId);
              const domain = item ? getDomain(item.domain) : null;
              const ratingLabel =
                a.rating === 0
                  ? "Not yet"
                  : a.rating === 1
                    ? "Never"
                    : a.rating === 2
                      ? "Sometimes"
                      : "Always";
              const ratingColor =
                a.rating === 3
                  ? "bg-green-100 text-green-800 border-green-200"
                  : a.rating === 2
                    ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                    : "bg-foreground/10 text-foreground/65 border-foreground/15";
              return (
                <li
                  key={a.id}
                  className="rounded-2xl bg-surface border border-border p-3"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    {domain && <span className="text-base">{domain.emoji}</span>}
                    <span className="text-xs text-muted">
                      {domain?.label ?? "Skill"}
                    </span>
                    <span
                      className={`ml-auto text-[10px] font-medium px-2 py-0.5 rounded-full border ${ratingColor}`}
                    >
                      {ratingLabel}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">{item?.text}</p>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {surveyOpen && (
        <MicroSurveySheet
          onClose={() => setSurveyOpen(false)}
          onSaved={() => setSurveyOpen(false)}
        />
      )}
    </div>
  );
}

function DomainBar({
  stat,
}: {
  stat: ReturnType<typeof domainProgress>;
}) {
  const total = stat.totalItems;
  const m = (stat.mastered / total) * 100;
  const e = (stat.emerging / total) * 100;
  const n = (stat.notYet / total) * 100;
  return (
    <div className="flex h-2 w-full rounded-full overflow-hidden bg-foreground/5">
      <div className="bg-green-500" style={{ width: `${m}%` }} />
      <div className="bg-yellow-500" style={{ width: `${e}%` }} />
      <div className="bg-foreground/25" style={{ width: `${n}%` }} />
    </div>
  );
}
