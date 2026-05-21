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
  Caretaker,
  CaretakerRole,
  loadActiveCaretakerId,
  loadCaretakers,
  newCaretakerId,
  pickFreshEmoji,
  saveActiveCaretakerId,
  saveCaretakers,
} from "@/lib/caretakers";
import { api } from "@/lib/apiClient";
import { useHousehold } from "@/components/HouseholdProvider";

type CaretakersContextValue = {
  ready: boolean;
  caretakers: Caretaker[];
  activeCaretaker: Caretaker | null;
  addCaretaker: (input: {
    name: string;
    role: CaretakerRole;
    emoji?: string;
  }) => Caretaker;
  removeCaretaker: (id: string) => void;
  setActiveCaretaker: (id: string | null) => void;
};

const CaretakersContext = createContext<CaretakersContextValue | null>(null);

export function CaretakersProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useHousehold();
  const [ready, setReady] = useState(false);
  const [caretakers, setCaretakers] = useState<Caretaker[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const migratedRef = useRef(false);

  useEffect(() => {
    setCaretakers(loadCaretakers());
    setActiveId(loadActiveCaretakerId());
    setReady(true);
  }, []);

  useEffect(() => {
    if (status !== "connected") return;
    let cancelled = false;

    (async () => {
      try {
        const { caretakers: remote } = await api.listCaretakers();

        if (!migratedRef.current) {
          migratedRef.current = true;
          const local = loadCaretakers();
          const known = new Set(remote.map((c) => c.id));
          const orphans = local.filter((c) => !known.has(c.id));
          for (const o of orphans) {
            try {
              await api.upsertCaretaker(o);
            } catch {
              // best effort
            }
          }
        }

        const { caretakers: latest } = await api.listCaretakers();
        if (cancelled) return;
        setCaretakers(latest);
        saveCaretakers(latest);
      } catch {
        // keep using local cache
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [status]);

  const persistCaretakers = useCallback((next: Caretaker[]) => {
    setCaretakers(next);
    saveCaretakers(next);
  }, []);

  const persistActiveId = useCallback((next: string | null) => {
    setActiveId(next);
    saveActiveCaretakerId(next);
  }, []);

  const addCaretaker: CaretakersContextValue["addCaretaker"] = useCallback(
    (input) => {
      const trimmed = input.name.trim();
      const created: Caretaker = {
        id: newCaretakerId(),
        name: trimmed,
        role: input.role,
        emoji: input.emoji?.trim() || pickFreshEmoji(caretakers),
        createdAt: new Date().toISOString(),
      };
      persistCaretakers([...caretakers, created]);
      api.upsertCaretaker(created).catch(() => {
        // keep local; we'll sync next chance
      });
      return created;
    },
    [caretakers, persistCaretakers],
  );

  const removeCaretaker: CaretakersContextValue["removeCaretaker"] = useCallback(
    (id) => {
      persistCaretakers(caretakers.filter((c) => c.id !== id));
      if (activeId === id) {
        persistActiveId(null);
      }
      api.deleteCaretaker(id).catch(() => {});
    },
    [activeId, caretakers, persistActiveId, persistCaretakers],
  );

  const activeCaretaker = useMemo(() => {
    if (!activeId) return null;
    return caretakers.find((c) => c.id === activeId) ?? null;
  }, [activeId, caretakers]);

  const value = useMemo<CaretakersContextValue>(
    () => ({
      ready,
      caretakers,
      activeCaretaker,
      addCaretaker,
      removeCaretaker,
      setActiveCaretaker: persistActiveId,
    }),
    [
      ready,
      caretakers,
      activeCaretaker,
      addCaretaker,
      removeCaretaker,
      persistActiveId,
    ],
  );

  return (
    <CaretakersContext.Provider value={value}>
      {children}
    </CaretakersContext.Provider>
  );
}

export function useCaretakers() {
  const ctx = useContext(CaretakersContext);
  if (!ctx) {
    throw new Error("useCaretakers must be used inside <CaretakersProvider />");
  }
  return ctx;
}
