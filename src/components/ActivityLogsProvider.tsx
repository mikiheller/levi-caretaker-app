"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
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
import { api } from "@/lib/apiClient";
import { useHousehold } from "@/components/HouseholdProvider";

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

const ACTIVE_POLL_MS = 4000;
const IDLE_POLL_MS = 20000;

export function ActivityLogsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useHousehold();
  const [ready, setReady] = useState(false);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [activeSession, setActiveSession] = useState<ActiveSession | null>(
    null,
  );
  const migratedRef = useRef(false);

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

  useEffect(() => {
    if (status !== "connected") return;
    let cancelled = false;

    async function refresh() {
      try {
        const [{ logs: remoteLogs }, { session }] = await Promise.all([
          api.listActivityLogs(100),
          api.getActiveSession(),
        ]);
        if (cancelled) return;

        if (!migratedRef.current) {
          migratedRef.current = true;
          const localLogs = loadActivityLogs();
          const known = new Set(remoteLogs.map((l) => l.id));
          const orphans = localLogs.filter((l) => !known.has(l.id));
          for (const o of orphans) {
            try {
              await api.createActivityLog(o);
            } catch {
              // best effort
            }
          }
          if (orphans.length > 0) {
            const { logs: latest } = await api.listActivityLogs(100);
            if (!cancelled) {
              setLogs(latest);
              saveActivityLogs(latest);
            }
          } else {
            setLogs(remoteLogs);
            saveActivityLogs(remoteLogs);
          }
        } else {
          setLogs(remoteLogs);
          saveActivityLogs(remoteLogs);
        }

        setActiveSession(session);
        saveActiveSession(session);
      } catch {
        // keep cached data
      }
    }

    refresh();
    const id = setInterval(
      refresh,
      activeSession ? ACTIVE_POLL_MS : IDLE_POLL_MS,
    );

    function onVisible() {
      if (document.visibilityState === "visible") refresh();
    }
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [status, activeSession]);

  const startSession = useCallback<ActivityLogsContextValue["startSession"]>(
    ({ activityId, caretakerId }) => {
      const next: ActiveSession = {
        activityId,
        caretakerId,
        startedAt: new Date().toISOString(),
      };
      persistActiveSession(next);
      api.setActiveSession(next).catch(() => {});
    },
    [persistActiveSession],
  );

  const cancelSession = useCallback(() => {
    persistActiveSession(null);
    api.clearActiveSession().catch(() => {});
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
      api.createActivityLog(log).catch(() => {});
      api.clearActiveSession().catch(() => {});
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
