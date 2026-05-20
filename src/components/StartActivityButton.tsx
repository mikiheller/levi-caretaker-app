"use client";

import { useRouter } from "next/navigation";
import { Play } from "lucide-react";
import { useState } from "react";
import { useActivityLogs } from "@/components/ActivityLogsProvider";
import { useCaretakers } from "@/components/CaretakersProvider";
import { Activity, getActivityById } from "@/lib/activities";

export function StartActivityButton({ activity }: { activity: Activity }) {
  const router = useRouter();
  const { activeSession, startSession, cancelSession } = useActivityLogs();
  const { activeCaretaker } = useCaretakers();
  const [confirming, setConfirming] = useState(false);

  function start() {
    if (!activeCaretaker) return;
    startSession({
      activityId: activity.id,
      caretakerId: activeCaretaker.id,
    });
    router.push(`/activities/${activity.slug}/play`);
  }

  if (activeSession && activeSession.activityId !== activity.id) {
    const other = getActivityById(activeSession.activityId);
    if (confirming) {
      return (
        <div className="rounded-2xl bg-surface border border-border p-4 shadow-lg">
          <p className="text-sm font-medium mb-3">
            Cancel the {other?.title ?? "current"} session and start{" "}
            {activity.title}?
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setConfirming(false)}
              className="flex-1 rounded-xl border border-border py-3 text-sm font-medium"
            >
              Keep going
            </button>
            <button
              onClick={() => {
                cancelSession();
                start();
              }}
              className="flex-1 rounded-xl bg-primary text-white py-3 text-sm font-semibold"
            >
              Switch
            </button>
          </div>
        </div>
      );
    }
    return (
      <button
        onClick={() => setConfirming(true)}
        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-foreground/85 text-white font-semibold py-4 active:scale-[0.98] transition shadow-lg"
      >
        Switch to this activity
      </button>
    );
  }

  if (activeSession && activeSession.activityId === activity.id) {
    return (
      <button
        onClick={() => router.push(`/activities/${activity.slug}/play`)}
        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-primary text-white font-semibold py-4 active:scale-[0.98] transition shadow-lg"
      >
        <Play size={18} fill="white" />
        Resume
      </button>
    );
  }

  return (
    <button
      onClick={start}
      className="w-full flex items-center justify-center gap-2 rounded-2xl bg-primary text-white font-semibold py-4 active:scale-[0.98] transition shadow-lg"
    >
      <Play size={18} fill="white" />
      Start activity
    </button>
  );
}
