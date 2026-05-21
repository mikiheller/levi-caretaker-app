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
  BEHAVIOR_LOGS_KEY,
  BehaviorLog,
  BehaviorMedia,
  loadBehaviorLogs,
  newBehaviorLogId,
  saveBehaviorLogs,
} from "@/lib/behaviorLogs";
import { api } from "@/lib/apiClient";
import { useHousehold } from "@/components/HouseholdProvider";

type Value = {
  ready: boolean;
  logs: BehaviorLog[];
  logBehavior: (input: {
    caretakerId: string;
    text: string;
    media?: BehaviorMedia[];
  }) => BehaviorLog;
};

const Ctx = createContext<Value | null>(null);

const IDLE_POLL_MS = 30000;

export function BehaviorLogsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useHousehold();
  const [ready, setReady] = useState(false);
  const [logs, setLogs] = useState<BehaviorLog[]>([]);
  const migratedRef = useRef(false);

  useEffect(() => {
    setLogs(loadBehaviorLogs());
    setReady(true);
  }, []);

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === BEHAVIOR_LOGS_KEY) setLogs(loadBehaviorLogs());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const persistLogs = useCallback((next: BehaviorLog[]) => {
    setLogs(next);
    saveBehaviorLogs(next);
  }, []);

  useEffect(() => {
    if (status !== "connected") return;
    let cancelled = false;

    async function refresh() {
      try {
        const { logs: remote } = await api.listBehaviorLogs(100);
        if (cancelled) return;
        if (!migratedRef.current) {
          migratedRef.current = true;
          const local = loadBehaviorLogs();
          const known = new Set(remote.map((l) => l.id));
          const orphans = local.filter((l) => !known.has(l.id));
          for (const o of orphans) {
            try {
              await api.createBehaviorLog(o);
            } catch {}
          }
          if (orphans.length > 0) {
            const { logs: latest } = await api.listBehaviorLogs(100);
            if (!cancelled) {
              setLogs(latest);
              saveBehaviorLogs(latest);
            }
            return;
          }
        }
        setLogs(remote);
        saveBehaviorLogs(remote);
      } catch {}
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

  const logBehavior = useCallback<Value["logBehavior"]>(
    ({ caretakerId, text, media }) => {
      const created: BehaviorLog = {
        id: newBehaviorLogId(),
        caretakerId,
        text: text.trim(),
        media: media ?? [],
        loggedAt: new Date().toISOString(),
      };
      persistLogs([created, ...logs]);
      api.createBehaviorLog(created).catch(() => {});
      return created;
    },
    [logs, persistLogs],
  );

  const value = useMemo<Value>(
    () => ({ ready, logs, logBehavior }),
    [ready, logs, logBehavior],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useBehaviorLogs() {
  const ctx = useContext(Ctx);
  if (!ctx)
    throw new Error("useBehaviorLogs must be used inside BehaviorLogsProvider");
  return ctx;
}
