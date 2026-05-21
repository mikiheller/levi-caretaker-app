export type PottyEventType = "toilet" | "accident";
export type ToiletInitiator = "levi" | "caretaker";
export type AccidentType = "pee" | "poop" | "both";

export type PottyLog = {
  id: string;
  caretakerId: string;
  type: PottyEventType;
  // toilet trips
  initiator?: ToiletInitiator;
  pee?: boolean;
  poop?: boolean;
  // accidents
  accidentType?: AccidentType;
  whatWasDoing?: string;
  note?: string;
  loggedAt: string;
};

export const POTTY_LOGS_KEY = "levi.pottyLogs.v1";

const isBrowser = () => typeof window !== "undefined";

export function loadPottyLogs(): PottyLog[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(POTTY_LOGS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as PottyLog[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function savePottyLogs(logs: PottyLog[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(POTTY_LOGS_KEY, JSON.stringify(logs));
}

export function newPottyLogId(): string {
  if (isBrowser() && typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `potty_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function summarizePotty(log: PottyLog): string {
  if (log.type === "toilet") {
    const parts: string[] = [];
    if (log.pee) parts.push("pee");
    if (log.poop) parts.push("poop");
    const what = parts.length > 0 ? parts.join(" + ") : "no go";
    const who = log.initiator === "levi" ? "Levi-initiated" : "Caretaker-initiated";
    return `${who} · ${what}`;
  }
  const type =
    log.accidentType === "both"
      ? "pee + poop"
      : log.accidentType === "pee"
        ? "pee"
        : log.accidentType === "poop"
          ? "poop"
          : "accident";
  return `Accident · ${type}${log.whatWasDoing ? ` during ${log.whatWasDoing}` : ""}`;
}
