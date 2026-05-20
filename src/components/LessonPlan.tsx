import { LessonPlan as LessonPlanType } from "@/lib/activities";

type Section = {
  title: string;
  icon: string;
  body?: string;
};

export function LessonPlanView({ plan }: { plan: LessonPlanType }) {
  const sections: Section[] = [
    { title: "Set up", icon: "🧰", body: plan.setup },
    { title: "During play", icon: "🎬", body: plan.duringPlay },
    {
      title: "If he's losing interest",
      icon: "🔄",
      body: plan.ifLosingInterest,
    },
    { title: "Wrapping up", icon: "🌿", body: plan.wrappingUp },
  ].filter((s): s is Section & { body: string } => Boolean(s.body));

  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <section
          key={section.title}
          className="rounded-2xl bg-surface border border-border p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg" aria-hidden>
              {section.icon}
            </span>
            <h3 className="font-semibold text-sm tracking-tight">
              {section.title}
            </h3>
          </div>
          <p className="text-sm leading-relaxed whitespace-pre-line text-foreground/85">
            {section.body}
          </p>
        </section>
      ))}
      {plan.closingNote && (
        <div className="rounded-2xl bg-primary-soft border border-primary/20 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-primary mb-1.5">
            A reminder
          </p>
          <p className="text-sm leading-relaxed text-foreground/85">
            {plan.closingNote}
          </p>
        </div>
      )}
    </div>
  );
}
