import { ComingSoon, SectionHero } from "@/components/SectionHero";

export default function ProgressPage() {
  return (
    <div className="space-y-5">
      <SectionHero
        emoji="📈"
        title="Progress"
        subtitle="See Levi's developmental growth over time, domain by domain. The skills he's working on most are surfaced here."
        accentVar="--accent-progress"
      />
      <ComingSoon
        bullets={[
          "One-time baseline questionnaire (parents only, ABAS-3 based)",
          "An 'active growth zone' of 10-20 skills at Levi's edge — these are the only things caretakers are quizzed on",
          "Per-session micro-survey: 2–4 quick questions sampled from the growth zone",
          "Charts showing each domain (communication, motor, social, etc.) moving up over weeks",
        ]}
      />
    </div>
  );
}
