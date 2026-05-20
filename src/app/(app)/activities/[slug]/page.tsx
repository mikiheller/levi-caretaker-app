import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Clock } from "lucide-react";
import { ACTIVITIES, getActivity, getCategory } from "@/lib/activities";
import { LessonPlanView } from "@/components/LessonPlan";
import { StartActivityButton } from "@/components/StartActivityButton";

export function generateStaticParams() {
  return ACTIVITIES.map((a) => ({ slug: a.slug }));
}

export default async function ActivityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const activity = getActivity(slug);
  if (!activity) notFound();
  const category = getCategory(activity.category);
  const [low, high] = activity.estimatedMinutes;

  return (
    <div className="space-y-4 pb-24">
      <Link
        href="/activities"
        className="inline-flex items-center gap-1 text-sm text-muted -mt-1"
      >
        <ChevronLeft size={16} />
        All activities
      </Link>

      <header
        className="rounded-3xl p-6"
        style={{
          background: `color-mix(in srgb, var(${category.cssVar}) 22%, white)`,
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-5xl leading-none">{activity.emoji}</span>
          <span className="text-xs font-semibold uppercase tracking-wider text-foreground/55">
            {category.label}
          </span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">
          {activity.title}
        </h1>
        <p className="text-sm text-foreground/75 mt-2 leading-relaxed">
          {activity.summary}
        </p>
        <div className="flex items-center gap-1.5 text-xs text-foreground/65 mt-3">
          <Clock size={13} />
          <span>
            About {low === high ? `${low}` : `${low}–${high}`} min
          </span>
        </div>
      </header>

      {activity.materials && activity.materials.length > 0 && (
        <section className="rounded-2xl bg-surface border border-border p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
            What you&apos;ll need
          </h3>
          <ul className="space-y-1.5">
            {activity.materials.map((m) => (
              <li key={m} className="flex items-start gap-2 text-sm">
                <span className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-foreground/30 shrink-0" />
                {m}
              </li>
            ))}
          </ul>
        </section>
      )}

      {activity.learningGoals && activity.learningGoals.length > 0 && (
        <section className="rounded-2xl bg-surface border border-border p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
            What Levi will work on
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {activity.learningGoals.map((g) => (
              <span
                key={g}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary-soft text-foreground/80"
              >
                {g}
              </span>
            ))}
          </div>
        </section>
      )}

      {activity.lesson ? (
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3 px-1">
            How to play
          </h2>
          <LessonPlanView plan={activity.lesson} />
        </div>
      ) : (
        activity.miniSteps &&
        activity.miniSteps.length > 0 && (
          <section className="rounded-2xl bg-surface border border-border p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
              What this looks like
            </h3>
            <ul className="space-y-1.5">
              {activity.miniSteps.map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted italic mt-3">
              The full lesson plan for this one is coming soon.
            </p>
          </section>
        )
      )}

      <div
        className="fixed inset-x-0 bottom-0 z-30 bg-gradient-to-t from-background via-background to-background/0 pt-6 pb-3 px-5 safe-bottom"
        style={{ paddingBottom: "calc(1rem + var(--safe-bottom))" }}
      >
        <div className="max-w-2xl mx-auto">
          <StartActivityButton activity={activity} />
        </div>
      </div>
    </div>
  );
}
