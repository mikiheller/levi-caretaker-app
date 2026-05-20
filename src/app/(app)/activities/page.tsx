import { ComingSoon, SectionHero } from "@/components/SectionHero";

export default function ActivitiesPage() {
  return (
    <div className="space-y-5">
      <SectionHero
        emoji="✨"
        title="Activities"
        subtitle="Not sure what to do with Levi? Pick a card. Each one comes with a simple lesson plan, a timer, and a quick check-in afterward."
        accentVar="--accent-activities"
      />
      <ComingSoon
        bullets={[
          "Card menu organized by Lisa's categories (pretend play, gross motor, sensory, etc.)",
          "Detail page with a step-by-step guide in your BCBA's voice",
          "Start / stop timer while you play so we know how long it lasted",
          "Tiny end-of-activity survey: how was Levi's mood and engagement?",
        ]}
      />
    </div>
  );
}
