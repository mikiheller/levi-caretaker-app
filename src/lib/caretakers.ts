export type CaretakerRole =
  | "Parent"
  | "BCBA"
  | "Paraeducator"
  | "Speech Therapist"
  | "Occupational Therapist"
  | "Music Therapist"
  | "Nanny"
  | "Teacher"
  | "Other";

export const CARETAKER_ROLES: CaretakerRole[] = [
  "Parent",
  "BCBA",
  "Paraeducator",
  "Speech Therapist",
  "Occupational Therapist",
  "Music Therapist",
  "Nanny",
  "Teacher",
  "Other",
];

export type Caretaker = {
  id: string;
  name: string;
  role: CaretakerRole;
  emoji: string;
  createdAt: string;
};

export const CARETAKERS_KEY = "levi.caretakers.v1";
export const ACTIVE_CARETAKER_KEY = "levi.activeCaretakerId.v1";

const isBrowser = () => typeof window !== "undefined";

export function loadCaretakers(): Caretaker[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(CARETAKERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Caretaker[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function saveCaretakers(caretakers: Caretaker[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(CARETAKERS_KEY, JSON.stringify(caretakers));
}

export function loadActiveCaretakerId(): string | null {
  if (!isBrowser()) return null;
  return window.localStorage.getItem(ACTIVE_CARETAKER_KEY);
}

export function saveActiveCaretakerId(id: string | null) {
  if (!isBrowser()) return;
  if (id) {
    window.localStorage.setItem(ACTIVE_CARETAKER_KEY, id);
  } else {
    window.localStorage.removeItem(ACTIVE_CARETAKER_KEY);
  }
}

export function newCaretakerId(): string {
  if (isBrowser() && typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `c_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

const EMOJI_POOL = [
  "🌻",
  "🐳",
  "🌈",
  "🦊",
  "🐝",
  "🌺",
  "🐧",
  "🦋",
  "🌟",
  "🍀",
  "🐢",
  "🦉",
  "🍓",
  "🌼",
  "🐙",
  "🦁",
  "🐼",
  "🦄",
  "🐶",
  "🐱",
];

export function pickFreshEmoji(existing: Caretaker[]): string {
  const taken = new Set(existing.map((c) => c.emoji));
  const free = EMOJI_POOL.find((e) => !taken.has(e));
  if (free) return free;
  return EMOJI_POOL[Math.floor(Math.random() * EMOJI_POOL.length)];
}
