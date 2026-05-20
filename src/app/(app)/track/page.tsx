import { ComingSoon, SectionHero } from "@/components/SectionHero";

export default function TrackPage() {
  return (
    <div className="space-y-5">
      <SectionHero
        emoji="📝"
        title="Track"
        subtitle="A single place for quick logs. Designed to take a few taps, not minutes."
        accentVar="--accent-track"
      />
      <ComingSoon
        bullets={[
          "Mood — a quick face picker for how Levi seemed today, with optional detail on negative moods",
          "Potty — toilet trips (who initiated, did he pee, did he poop) and accidents",
          "New behavior — saw Levi do something new? type it, talk it, or attach a photo or video",
        ]}
      />
    </div>
  );
}
