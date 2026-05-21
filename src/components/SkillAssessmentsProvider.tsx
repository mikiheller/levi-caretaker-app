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
  ASSESSMENTS_KEY,
  BASELINE_DONE_KEY,
  SkillAssessment,
  computeItemStates,
  ItemState,
  loadAssessments,
  loadBaselineDone,
  newAssessmentId,
  saveAssessments,
  saveBaselineDone,
} from "@/lib/skillAssessments";
import { AbasRating } from "@/lib/abas";
import { api } from "@/lib/apiClient";
import { useHousehold } from "@/components/HouseholdProvider";

type Value = {
  ready: boolean;
  assessments: SkillAssessment[];
  itemStates: Map<string, ItemState>;
  baselineDone: boolean;
  setBaselineDone: (done: boolean) => void;
  recordAssessment: (input: {
    itemId: string;
    caretakerId: string;
    rating: AbasRating;
    note?: string;
  }) => SkillAssessment;
  recordAssessmentsBatch: (
    items: { itemId: string; rating: AbasRating }[],
    caretakerId: string,
  ) => void;
};

const Ctx = createContext<Value | null>(null);

const IDLE_POLL_MS = 60000;

export function SkillAssessmentsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useHousehold();
  const [ready, setReady] = useState(false);
  const [assessments, setAssessments] = useState<SkillAssessment[]>([]);
  const [baselineDone, setBaselineDoneState] = useState(false);
  const migratedRef = useRef(false);

  useEffect(() => {
    setAssessments(loadAssessments());
    setBaselineDoneState(loadBaselineDone());
    setReady(true);
  }, []);

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === ASSESSMENTS_KEY) setAssessments(loadAssessments());
      if (e.key === BASELINE_DONE_KEY) setBaselineDoneState(loadBaselineDone());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const persistAssessments = useCallback((next: SkillAssessment[]) => {
    setAssessments(next);
    saveAssessments(next);
  }, []);

  const setBaselineDone = useCallback((done: boolean) => {
    setBaselineDoneState(done);
    saveBaselineDone(done);
  }, []);

  useEffect(() => {
    if (status !== "connected") return;
    let cancelled = false;

    async function refresh() {
      try {
        const { assessments: remote } = await api.listSkillAssessments(2000);
        if (cancelled) return;
        if (!migratedRef.current) {
          migratedRef.current = true;
          const local = loadAssessments();
          const known = new Set(remote.map((a) => a.id));
          const orphans = local.filter((a) => !known.has(a.id));
          for (const o of orphans) {
            try {
              await api.createSkillAssessment(o);
            } catch {}
          }
          if (orphans.length > 0) {
            const { assessments: latest } = await api.listSkillAssessments(2000);
            if (!cancelled) {
              setAssessments(latest);
              saveAssessments(latest);
            }
            return;
          }
        }
        setAssessments(remote);
        saveAssessments(remote);
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

  const recordAssessment = useCallback<Value["recordAssessment"]>(
    ({ itemId, caretakerId, rating, note }) => {
      const a: SkillAssessment = {
        id: newAssessmentId(),
        itemId,
        caretakerId,
        rating,
        note: note?.trim() ? note.trim() : undefined,
        assessedAt: new Date().toISOString(),
      };
      persistAssessments([a, ...assessments]);
      api.createSkillAssessment(a).catch(() => {});
      return a;
    },
    [assessments, persistAssessments],
  );

  const recordAssessmentsBatch = useCallback<Value["recordAssessmentsBatch"]>(
    (items, caretakerId) => {
      const now = new Date().toISOString();
      const newOnes: SkillAssessment[] = items.map(({ itemId, rating }) => ({
        id: newAssessmentId(),
        itemId,
        caretakerId,
        rating,
        assessedAt: now,
      }));
      persistAssessments([...newOnes, ...assessments]);
      for (const a of newOnes) {
        api.createSkillAssessment(a).catch(() => {});
      }
    },
    [assessments, persistAssessments],
  );

  const itemStates = useMemo(
    () => computeItemStates(assessments),
    [assessments],
  );

  const value = useMemo<Value>(
    () => ({
      ready,
      assessments,
      itemStates,
      baselineDone,
      setBaselineDone,
      recordAssessment,
      recordAssessmentsBatch,
    }),
    [
      ready,
      assessments,
      itemStates,
      baselineDone,
      setBaselineDone,
      recordAssessment,
      recordAssessmentsBatch,
    ],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSkillAssessments() {
  const ctx = useContext(Ctx);
  if (!ctx)
    throw new Error(
      "useSkillAssessments must be used inside SkillAssessmentsProvider",
    );
  return ctx;
}
