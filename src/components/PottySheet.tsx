"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import clsx from "clsx";
import { useCaretakers } from "@/components/CaretakersProvider";
import { usePottyLogs } from "@/components/PottyLogsProvider";
import {
  AccidentType,
  PottyEventType,
  ToiletInitiator,
} from "@/lib/pottyLogs";

export function PottySheet({
  onClose,
  onSaved,
}: {
  onClose: () => void;
  onSaved: () => void;
}) {
  const { activeCaretaker } = useCaretakers();
  const { logPotty } = usePottyLogs();
  const [type, setType] = useState<PottyEventType | null>(null);

  // toilet
  const [initiator, setInitiator] = useState<ToiletInitiator | null>(null);
  const [pee, setPee] = useState<boolean | null>(null);
  const [poop, setPoop] = useState<boolean | null>(null);
  // accident
  const [accidentType, setAccidentType] = useState<AccidentType | null>(null);
  const [whatWasDoing, setWhatWasDoing] = useState("");

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const canSave =
    activeCaretaker &&
    type &&
    ((type === "toilet" && initiator && pee !== null && poop !== null) ||
      (type === "accident" && accidentType));

  function save() {
    if (!canSave || !activeCaretaker) return;
    if (type === "toilet") {
      logPotty({
        caretakerId: activeCaretaker.id,
        type: "toilet",
        initiator: initiator!,
        pee: pee!,
        poop: poop!,
      });
    } else {
      logPotty({
        caretakerId: activeCaretaker.id,
        type: "accident",
        accidentType: accidentType!,
        whatWasDoing: whatWasDoing.trim() || undefined,
      });
    }
    onSaved();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm">
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 w-full h-full cursor-default"
      />
      <div className="relative w-full max-w-2xl bg-background rounded-t-3xl shadow-2xl px-5 pt-6 pb-8 space-y-5 safe-bottom max-h-[92dvh] overflow-y-auto">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1.5 rounded-full bg-foreground/15" />

        <header className="text-center pt-2">
          <h2 className="text-lg font-semibold tracking-tight">
            Log a potty event
          </h2>
        </header>

        {/* Step 1: Event type */}
        <section>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
            What happened?
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <BigChoice
              emoji="🚽"
              label="Went to toilet"
              active={type === "toilet"}
              onClick={() => setType("toilet")}
            />
            <BigChoice
              emoji="💧"
              label="Had an accident"
              active={type === "accident"}
              onClick={() => setType("accident")}
            />
          </div>
        </section>

        {/* Step 2A: Toilet details */}
        {type === "toilet" && (
          <>
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
                Who initiated?
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <SmallChoice
                  label="Levi initiated"
                  active={initiator === "levi"}
                  onClick={() => setInitiator("levi")}
                />
                <SmallChoice
                  label="I took him"
                  active={initiator === "caretaker"}
                  onClick={() => setInitiator("caretaker")}
                />
              </div>
            </section>
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
                Did he pee?
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <SmallChoice label="Yes" active={pee === true} onClick={() => setPee(true)} />
                <SmallChoice label="No" active={pee === false} onClick={() => setPee(false)} />
              </div>
            </section>
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
                Did he poop?
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <SmallChoice
                  label="Yes"
                  active={poop === true}
                  onClick={() => setPoop(true)}
                />
                <SmallChoice
                  label="No"
                  active={poop === false}
                  onClick={() => setPoop(false)}
                />
              </div>
            </section>
          </>
        )}

        {/* Step 2B: Accident details */}
        {type === "accident" && (
          <>
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
                What kind?
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <SmallChoice
                  label="Pee"
                  active={accidentType === "pee"}
                  onClick={() => setAccidentType("pee")}
                />
                <SmallChoice
                  label="Poop"
                  active={accidentType === "poop"}
                  onClick={() => setAccidentType("poop")}
                />
                <SmallChoice
                  label="Both"
                  active={accidentType === "both"}
                  onClick={() => setAccidentType("both")}
                />
              </div>
            </section>
            <section>
              <label
                htmlFor="potty-what-was-doing"
                className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2"
              >
                What was he doing? (optional)
              </label>
              <input
                id="potty-what-was-doing"
                value={whatWasDoing}
                onChange={(e) => setWhatWasDoing(e.target.value)}
                placeholder="e.g. open field, transitioning, sleeping…"
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus:outline-none focus:border-primary"
              />
            </section>
          </>
        )}

        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={save}
            disabled={!canSave}
            className={clsx(
              "w-full flex items-center justify-center gap-2 rounded-2xl font-semibold py-4 transition shadow-lg active:scale-[0.98]",
              canSave
                ? "bg-primary text-white"
                : "bg-primary/40 text-white cursor-not-allowed",
            )}
          >
            <Check size={18} />
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full text-sm text-muted py-2"
          >
            Not yet
          </button>
        </div>
      </div>
    </div>
  );
}

function BigChoice({
  emoji,
  label,
  active,
  onClick,
}: {
  emoji: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "flex flex-col items-center justify-center gap-2 rounded-2xl py-5 transition border-2",
        active
          ? "border-primary bg-primary-soft scale-105"
          : "border-transparent bg-surface",
      )}
    >
      <span className="text-3xl leading-none">{emoji}</span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

function SmallChoice({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "rounded-xl py-3 text-sm font-medium transition border-2",
        active
          ? "border-primary bg-primary-soft"
          : "border-border bg-surface text-foreground/80",
      )}
    >
      {label}
    </button>
  );
}
