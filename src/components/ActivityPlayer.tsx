"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Square, X } from "lucide-react";
import { useActivityLogs } from "@/components/ActivityLogsProvider";
import { PostActivitySurvey } from "@/components/PostActivitySurvey";
import { Activity, getCategory } from "@/lib/activities";
import { formatDuration } from "@/lib/activityLogs";

export function ActivityPlayer({ activity }: { activity: Activity }) {
  const router = useRouter();
  const { activeSession, cancelSession, ready } = useActivityLogs();
  const [now, setNow] = useState(() => Date.now());
  const [surveyOpen, setSurveyOpen] = useState(false);
  const category = getCategory(activity.category);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (!activeSession || activeSession.activityId !== activity.id) {
      router.replace(`/activities/${activity.slug}`);
    }
  }, [ready, activeSession, activity.id, activity.slug, router]);

  if (!ready || !activeSession || activeSession.activityId !== activity.id) {
    return null;
  }

  const elapsed = Math.max(
    0,
    Math.floor((now - new Date(activeSession.startedAt).getTime()) / 1000),
  );

  function handleCancel() {
    if (window.confirm("Cancel this activity without logging it?")) {
      cancelSession();
      router.replace(`/activities/${activity.slug}`);
    }
  }

  return (
    <div
      className="rounded-3xl min-h-[70dvh] flex flex-col items-center justify-between p-6"
      style={{
        background: `color-mix(in srgb, var(${category.cssVar}) 18%, white)`,
      }}
    >
      <button
        onClick={handleCancel}
        className="self-end -mt-1 -mr-1 p-2 rounded-full text-foreground/60 active:scale-95 transition"
        aria-label="Cancel session"
      >
        <X size={20} />
      </button>

      <div className="flex flex-col items-center text-center mt-6">
        <span className="text-7xl mb-3 leading-none">{activity.emoji}</span>
        <h1 className="text-2xl font-semibold tracking-tight">
          {activity.title}
        </h1>
        <p className="text-xs text-foreground/55 mt-1.5 uppercase tracking-wider font-semibold">
          {category.label}
        </p>
      </div>

      <div
        className="font-mono text-7xl font-semibold tabular-nums tracking-tight"
        aria-live="polite"
        suppressHydrationWarning
      >
        {formatDuration(elapsed)}
      </div>

      <div className="w-full max-w-sm space-y-3">
        <button
          onClick={() => setSurveyOpen(true)}
          className="w-full flex items-center justify-center gap-2 rounded-2xl bg-primary text-white font-semibold py-4 active:scale-[0.98] transition shadow-lg"
        >
          <Square size={16} fill="white" />
          Done — log it
        </button>
        <p className="text-center text-xs text-foreground/55 leading-relaxed">
          The timer keeps running if you close the app. Come back any time.
        </p>
      </div>

      {surveyOpen && (
        <PostActivitySurvey
          activity={activity}
          elapsedSeconds={elapsed}
          onClose={() => setSurveyOpen(false)}
          onSaved={() => {
            router.replace("/activities?logged=1");
          }}
        />
      )}
    </div>
  );
}
