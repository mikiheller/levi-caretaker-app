"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { ApiError } from "@/lib/apiClient";
import { useHousehold } from "@/components/HouseholdProvider";

export function HouseholdGate() {
  const { connect, errorMessage } = useHousehold();
  const [secret, setSecret] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!secret.trim() || submitting) return;
    setSubmitting(true);
    setLocalError(null);
    try {
      await connect(secret.trim());
    } catch (e) {
      if (e instanceof ApiError) {
        setLocalError(e.message);
      } else {
        setLocalError("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  const shownError = localError ?? errorMessage;

  return (
    <main className="flex-1 flex items-center justify-center min-h-[100dvh] py-12 px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-soft mb-4">
            <Lock size={22} className="text-primary" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Connect this device
          </h1>
          <p className="text-sm text-muted mt-2 leading-relaxed">
            Enter the household passphrase so this device can sync with the rest
            of Levi&apos;s team.
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label
              htmlFor="household-secret"
              className="block text-sm font-medium mb-1.5"
            >
              Household passphrase
            </label>
            <input
              id="household-secret"
              type="password"
              autoComplete="current-password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="•••••••"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-base focus:outline-none focus:border-primary"
              autoFocus
            />
          </div>

          {shownError && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2.5">
              {shownError}
            </p>
          )}

          <button
            type="submit"
            disabled={!secret.trim() || submitting}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary text-white font-semibold py-3.5 active:scale-[0.98] transition disabled:bg-primary/40 disabled:cursor-not-allowed"
          >
            {submitting ? "Connecting…" : "Connect"}
          </button>

          <p className="text-xs text-muted text-center leading-relaxed pt-2">
            Don&apos;t have the passphrase? Ask whoever set this app up.
          </p>
        </form>
      </div>
    </main>
  );
}

export function ServerMisconfiguredScreen({ message }: { message: string }) {
  return (
    <main className="flex-1 flex items-center justify-center min-h-[100dvh] py-12 px-6">
      <div className="w-full max-w-md text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-yellow-100 mb-4">
          <Lock size={22} className="text-yellow-700" />
        </div>
        <h1 className="text-xl font-semibold tracking-tight">Server not set up</h1>
        <p className="text-sm text-muted mt-2 leading-relaxed">{message}</p>
      </div>
    </main>
  );
}
