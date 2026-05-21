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
  ApiError,
  api,
  loadHouseholdSecret,
  saveHouseholdSecret,
} from "@/lib/apiClient";

type Status = "checking" | "needs-secret" | "connected" | "server-misconfigured";

type Value = {
  status: Status;
  errorMessage: string | null;
  connect: (secret: string) => Promise<void>;
  disconnect: () => void;
  recheck: () => void;
};

const HouseholdContext = createContext<Value | null>(null);

export function HouseholdProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [status, setStatus] = useState<Status>("checking");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const verify = useCallback(async (secret: string | null) => {
    if (!secret) {
      setStatus("needs-secret");
      setErrorMessage(null);
      return;
    }
    try {
      await api.health(secret);
      setStatus("connected");
      setErrorMessage(null);
    } catch (e) {
      if (e instanceof ApiError) {
        if (e.status === 500) {
          setStatus("server-misconfigured");
          setErrorMessage(e.message);
        } else {
          // 401/403: invalid secret. Clear it so the gate can prompt again.
          saveHouseholdSecret(null);
          setStatus("needs-secret");
          setErrorMessage(e.message);
        }
      } else {
        // Likely offline. Trust the cached secret and let the app work from
        // localStorage; periodic refreshes will recover sync once back online.
        setStatus("connected");
        setErrorMessage(null);
      }
    }
  }, []);

  useEffect(() => {
    const existing = loadHouseholdSecret();
    verify(existing);
  }, [verify]);

  const connect = useCallback(
    async (secret: string) => {
      try {
        await api.health(secret);
        saveHouseholdSecret(secret);
        setStatus("connected");
        setErrorMessage(null);
      } catch (e) {
        if (e instanceof ApiError) {
          throw e;
        }
        throw new ApiError(0, "Couldn't reach the server. Check your connection.");
      }
    },
    [],
  );

  const disconnect = useCallback(() => {
    saveHouseholdSecret(null);
    setStatus("needs-secret");
    setErrorMessage(null);
  }, []);

  const recheck = useCallback(() => {
    verify(loadHouseholdSecret());
  }, [verify]);

  const value = useMemo<Value>(
    () => ({ status, errorMessage, connect, disconnect, recheck }),
    [status, errorMessage, connect, disconnect, recheck],
  );

  return (
    <HouseholdContext.Provider value={value}>
      {children}
    </HouseholdContext.Provider>
  );
}

export function useHousehold() {
  const ctx = useContext(HouseholdContext);
  if (!ctx) {
    throw new Error("useHousehold must be used inside <HouseholdProvider />");
  }
  return ctx;
}
