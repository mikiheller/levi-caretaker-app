import { ActivityCard } from "@/components/ActivityCard";
import { SectionHero } from "@/components/SectionHero";
import { ACTIVITIES, CATEGORIES } from "@/lib/activities";

export default function ActivitiesPage() {
  return (
    <div className="space-y-5 pb-2">
      <SectionHero
        emoji="✨"
        title="What should we do?"
        subtitle="Pick a card. Each one has a quick lesson plan, a timer, and a 10-second check-in when you're done."
        accentVar="--accent-activities"
      />

      {CATEGORIES.map((category) => {
        const items = ACTIVITIES.filter((a) => a.category === category.id);
        if (items.length === 0) return null;
        return (
          <section key={category.id}>
            <div className="flex items-center gap-2 mb-3 px-1">
              <span
                className="flex items-center justify-center w-8 h-8 rounded-lg text-base"
                style={{
                  background: `color-mix(in srgb, var(${category.cssVar}) 35%, white)`,
                }}
              >
                {category.emoji}
              </span>
              <h2 className="font-semibold tracking-tight">
                {category.label}
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {items.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
