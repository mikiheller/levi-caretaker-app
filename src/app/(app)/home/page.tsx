"use client";

import { useCaretakers } from "@/components/CaretakersProvider";
import { ComingSoon, SectionHero } from "@/components/SectionHero";

export default function HomePage() {
  const { activeCaretaker } = useCaretakers();
  const firstName = activeCaretaker?.name.split(" ")[0] ?? "friend";

  return (
    <div className="space-y-5">
      <SectionHero
        emoji="🌻"
        title={`Hi, ${firstName}!`}
        subtitle="Glad you're here. Pick an activity, log a moment, or just say hi to Levi. Every little thing counts."
        accentVar="--accent-home"
      />

      <ComingSoon
        bullets={[
          "Today's quick actions — start an activity or log a mood in one tap",
          "Recent activity feed so you can see what's been happening with Levi",
          "Nudges if something hasn't been logged in a while (e.g., no potty trips today)",
          "A tiny daily summary you can share with the next caretaker",
        ]}
      />
    </div>
  );
}
