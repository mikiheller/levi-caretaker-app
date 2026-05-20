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
  Caretaker,
  CaretakerRole,
  loadActiveCaretakerId,
  loadCaretakers,
  newCaretakerId,
  pickFreshEmoji,
  saveActiveCaretakerId,
  saveCaretakers,
} from "@/lib/caretakers";

type CaretakersContextValue = {
  ready: boolean;
  caretakers: Caretaker[];
  activeCaretaker: Caretaker | null;
  addCaretaker: (input: {
    name: string;
    role: CaretakerRole;
    emoji?: string;
  }) => Caretaker;
  updateCaretaker: (id: string, patch: Partial<Caretaker>) => void;
  removeCaretaker: (id: string) => void;
  setActiveCaretaker: (id: string | null) => void;
};

const CaretakersContext = createContext<CaretakersContextValue | null>(null);

export function CaretakersProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);
  const [caretakers, setCaretakers] = useState<Caretaker[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    setCaretakers(loadCaretakers());
    setActiveId(loadActiveCaretakerId());
    setReady(true);
  }, []);

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
      return created;
    },
    [caretakers, persistCaretakers],
  );

  const updateCaretaker: CaretakersContextValue["updateCaretaker"] = useCallback(
    (id, patch) => {
      persistCaretakers(
        caretakers.map((c) => (c.id === id ? { ...c, ...patch, id: c.id } : c)),
      );
    },
    [caretakers, persistCaretakers],
  );

  const removeCaretaker: CaretakersContextValue["removeCaretaker"] = useCallback(
    (id) => {
      persistCaretakers(caretakers.filter((c) => c.id !== id));
      if (activeId === id) {
        persistActiveId(null);
      }
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
      updateCaretaker,
      removeCaretaker,
      setActiveCaretaker: persistActiveId,
    }),
    [
      ready,
      caretakers,
      activeCaretaker,
      addCaretaker,
      updateCaretaker,
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
