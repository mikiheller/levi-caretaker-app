import Link from "next/link";
import { Clock } from "lucide-react";
import { Activity, getCategory } from "@/lib/activities";

export function ActivityCard({ activity }: { activity: Activity }) {
  const category = getCategory(activity.category);
  const [low, high] = activity.estimatedMinutes;

  return (
    <Link
      href={`/activities/${activity.slug}`}
      className="group block rounded-2xl bg-surface border border-border p-4 active:scale-[0.98] transition shadow-sm hover:border-foreground/15"
    >
      <div
        className="flex items-center justify-center w-12 h-12 rounded-xl text-2xl mb-3"
        style={{
          background: `color-mix(in srgb, var(${category.cssVar}) 30%, white)`,
        }}
      >
        {activity.emoji}
      </div>
      <h3 className="font-semibold leading-tight tracking-tight">
        {activity.title}
      </h3>
      <p className="text-xs text-muted mt-1.5 line-clamp-2 leading-relaxed">
        {activity.summary}
      </p>
      <div className="flex items-center gap-1 text-xs text-muted mt-3">
        <Clock size={12} />
        <span>
          {low === high ? `${low} min` : `${low}–${high} min`}
        </span>
        {activity.lesson && (
          <span className="ml-auto text-[10px] font-semibold uppercase tracking-wider text-primary">
            Full guide
          </span>
        )}
      </div>
    </Link>
  );
}
