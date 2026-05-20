"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ACTIVE_SESSION_KEY,
  ACTIVITY_LOGS_KEY,
  ActiveSession,
  ActivityLog,
  Engagement,
  Mood,
  loadActiveSession,
  loadActivityLogs,
  newLogId,
  saveActiveSession,
  saveActivityLogs,
} from "@/lib/activityLogs";

type ActivityLogsContextValue = {
  ready: boolean;
  logs: ActivityLog[];
  activeSession: ActiveSession | null;
  startSession: (input: { activityId: string; caretakerId: string }) => void;
  cancelSession: () => void;
  finishSession: (input: {
    mood: Mood;
    engagement: Engagement;
    note?: string;
  }) => ActivityLog | null;
};

const ActivityLogsContext = createContext<ActivityLogsContextValue | null>(
  null,
);

export function ActivityLogsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [activeSession, setActiveSession] = useState<ActiveSession | null>(
    null,
  );

  useEffect(() => {
    setLogs(loadActivityLogs());
    setActiveSession(loadActiveSession());
    setReady(true);
  }, []);

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === ACTIVITY_LOGS_KEY) setLogs(loadActivityLogs());
      if (e.key === ACTIVE_SESSION_KEY) setActiveSession(loadActiveSession());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const persistLogs = useCallback((next: ActivityLog[]) => {
    setLogs(next);
    saveActivityLogs(next);
  }, []);

  const persistActiveSession = useCallback((next: ActiveSession | null) => {
    setActiveSession(next);
    saveActiveSession(next);
  }, []);

  const startSession = useCallback<ActivityLogsContextValue["startSession"]>(
    ({ activityId, caretakerId }) => {
      persistActiveSession({
        activityId,
        caretakerId,
        startedAt: new Date().toISOString(),
      });
    },
    [persistActiveSession],
  );

  const cancelSession = useCallback(() => {
    persistActiveSession(null);
  }, [persistActiveSession]);

  const finishSession = useCallback<ActivityLogsContextValue["finishSession"]>(
    ({ mood, engagement, note }) => {
      if (!activeSession) return null;
      const endedAt = new Date();
      const startedAt = new Date(activeSession.startedAt);
      const durationSeconds = Math.max(
        1,
        Math.round((endedAt.getTime() - startedAt.getTime()) / 1000),
      );
      const log: ActivityLog = {
        id: newLogId(),
        activityId: activeSession.activityId,
        caretakerId: activeSession.caretakerId,
        startedAt: activeSession.startedAt,
        endedAt: endedAt.toISOString(),
        durationSeconds,
        mood,
        engagement,
        note: note?.trim() ? note.trim() : undefined,
      };
      persistLogs([log, ...logs]);
      persistActiveSession(null);
      return log;
    },
    [activeSession, logs, persistActiveSession, persistLogs],
  );

  const value = useMemo<ActivityLogsContextValue>(
    () => ({
      ready,
      logs,
      activeSession,
      startSession,
      cancelSession,
      finishSession,
    }),
    [ready, logs, activeSession, startSession, cancelSession, finishSession],
  );

  return (
    <ActivityLogsContext.Provider value={value}>
      {children}
    </ActivityLogsContext.Provider>
  );
}

export function useActivityLogs() {
  const ctx = useContext(ActivityLogsContext);
  if (!ctx) {
    throw new Error(
      "useActivityLogs must be used inside <ActivityLogsProvider />",
    );
  }
  return ctx;
}
