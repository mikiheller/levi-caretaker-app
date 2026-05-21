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
  MOOD_LOGS_KEY,
  MoodLog,
  MoodReason,
  loadMoodLogs,
  newMoodLogId,
  saveMoodLogs,
} from "@/lib/moodLogs";
import { Mood } from "@/lib/activityLogs";
import { api } from "@/lib/apiClient";
import { useHousehold } from "@/components/HouseholdProvider";

type MoodLogsContextValue = {
  ready: boolean;
  logs: MoodLog[];
  logMood: (input: {
    caretakerId: string;
    mood: Mood;
    reasons?: MoodReason[];
    note?: string;
  }) => MoodLog;
};

const MoodLogsContext = createContext<MoodLogsContextValue | null>(null);

const IDLE_POLL_MS = 30000;

export function MoodLogsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useHousehold();
  const [ready, setReady] = useState(false);
  const [logs, setLogs] = useState<MoodLog[]>([]);
  const migratedRef = useRef(false);

  useEffect(() => {
    setLogs(loadMoodLogs());
    setReady(true);
  }, []);

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === MOOD_LOGS_KEY) setLogs(loadMoodLogs());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const persistLogs = useCallback((next: MoodLog[]) => {
    setLogs(next);
    saveMoodLogs(next);
  }, []);

  useEffect(() => {
    if (status !== "connected") return;
    let cancelled = false;

    async function refresh() {
      try {
        const { logs: remoteLogs } = await api.listMoodLogs(100);
        if (cancelled) return;

        if (!migratedRef.current) {
          migratedRef.current = true;
          const localLogs = loadMoodLogs();
          const known = new Set(remoteLogs.map((l) => l.id));
          const orphans = localLogs.filter((l) => !known.has(l.id));
          for (const o of orphans) {
            try {
              await api.createMoodLog(o);
            } catch {
              // best effort
            }
          }
          if (orphans.length > 0) {
            const { logs: latest } = await api.listMoodLogs(100);
            if (!cancelled) {
              setLogs(latest);
              saveMoodLogs(latest);
            }
            return;
          }
        }
        setLogs(remoteLogs);
        saveMoodLogs(remoteLogs);
      } catch {
        // keep cached
      }
    }

    refresh();
    const id = setInterval(refresh, IDLE_POLL_MS);
    function onVisible() {
      if (document.visibilityState === "visible") refresh();
    }
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      cancelled = true;
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [status]);

  const logMood = useCallback<MoodLogsContextValue["logMood"]>(
    ({ caretakerId, mood, reasons, note }) => {
      const created: MoodLog = {
        id: newMoodLogId(),
        caretakerId,
        mood,
        reasons: reasons ?? [],
        note: note?.trim() ? note.trim() : undefined,
        loggedAt: new Date().toISOString(),
      };
      persistLogs([created, ...logs]);
      api.createMoodLog(created).catch(() => {});
      return created;
    },
    [logs, persistLogs],
  );

  const value = useMemo<MoodLogsContextValue>(
    () => ({ ready, logs, logMood }),
    [ready, logs, logMood],
  );

  return (
    <MoodLogsContext.Provider value={value}>
      {children}
    </MoodLogsContext.Provider>
  );
}

export function useMoodLogs() {
  const ctx = useContext(MoodLogsContext);
  if (!ctx) {
    throw new Error("useMoodLogs must be used inside <MoodLogsProvider />");
  }
  return ctx;
}
