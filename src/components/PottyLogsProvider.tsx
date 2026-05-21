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
  POTTY_LOGS_KEY,
  PottyLog,
  loadPottyLogs,
  newPottyLogId,
  savePottyLogs,
} from "@/lib/pottyLogs";
import { api } from "@/lib/apiClient";
import { useHousehold } from "@/components/HouseholdProvider";

type Value = {
  ready: boolean;
  logs: PottyLog[];
  logPotty: (
    input: Omit<PottyLog, "id" | "loggedAt"> & { loggedAt?: string },
  ) => PottyLog;
};

const PottyContext = createContext<Value | null>(null);

const IDLE_POLL_MS = 30000;

export function PottyLogsProvider({ children }: { children: React.ReactNode }) {
  const { status } = useHousehold();
  const [ready, setReady] = useState(false);
  const [logs, setLogs] = useState<PottyLog[]>([]);
  const migratedRef = useRef(false);

  useEffect(() => {
    setLogs(loadPottyLogs());
    setReady(true);
  }, []);

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === POTTY_LOGS_KEY) setLogs(loadPottyLogs());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const persistLogs = useCallback((next: PottyLog[]) => {
    setLogs(next);
    savePottyLogs(next);
  }, []);

  useEffect(() => {
    if (status !== "connected") return;
    let cancelled = false;

    async function refresh() {
      try {
        const { logs: remote } = await api.listPottyLogs(100);
        if (cancelled) return;
        if (!migratedRef.current) {
          migratedRef.current = true;
          const local = loadPottyLogs();
          const known = new Set(remote.map((l) => l.id));
          const orphans = local.filter((l) => !known.has(l.id));
          for (const o of orphans) {
            try {
              await api.createPottyLog(o);
            } catch {}
          }
          if (orphans.length > 0) {
            const { logs: latest } = await api.listPottyLogs(100);
            if (!cancelled) {
              setLogs(latest);
              savePottyLogs(latest);
            }
            return;
          }
        }
        setLogs(remote);
        savePottyLogs(remote);
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

  const logPotty = useCallback<Value["logPotty"]>(
    (input) => {
      const created: PottyLog = {
        id: newPottyLogId(),
        loggedAt: input.loggedAt ?? new Date().toISOString(),
        ...input,
      };
      persistLogs([created, ...logs]);
      api.createPottyLog(created).catch(() => {});
      return created;
    },
    [logs, persistLogs],
  );

  const value = useMemo<Value>(
    () => ({ ready, logs, logPotty }),
    [ready, logs, logPotty],
  );

  return <PottyContext.Provider value={value}>{children}</PottyContext.Provider>;
}

export function usePottyLogs() {
  const ctx = useContext(PottyContext);
  if (!ctx) throw new Error("usePottyLogs must be used inside PottyLogsProvider");
  return ctx;
}
