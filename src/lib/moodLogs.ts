import { Mood, MOOD_OPTIONS } from "@/lib/activityLogs";

export type MoodReason =
  | "tired"
  | "sick"
  | "frustrated"
  | "overstimulated"
  | "hungry"
  | "transition"
  | "sensory"
  | "other";

export const MOOD_REASONS: {
  value: MoodReason;
  emoji: string;
  label: string;
}[] = [
  { value: "tired", emoji: "😴", label: "Tired" },
  { value: "sick", emoji: "🤒", label: "Not feeling well" },
  { value: "frustrated", emoji: "😤", label: "Frustrated" },
  { value: "overstimulated", emoji: "🔊", label: "Overstimulated" },
  { value: "sensory", emoji: "🤲", label: "Sensory needs" },
  { value: "hungry", emoji: "🍽️", label: "Hungry" },
  { value: "transition", emoji: "🚪", label: "Hard transition" },
  { value: "other", emoji: "❓", label: "Something else" },
];

export const NEGATIVE_MOODS: Mood[] = ["off", "tough"];

export function isNegativeMood(mood: Mood): boolean {
  return NEGATIVE_MOODS.includes(mood);
}

export function moodOption(mood: Mood) {
  return MOOD_OPTIONS.find((m) => m.value === mood) ?? MOOD_OPTIONS[2];
}

export type MoodLog = {
  id: string;
  caretakerId: string;
  mood: Mood;
  reasons: MoodReason[];
  note?: string;
  loggedAt: string;
};

export const MOOD_LOGS_KEY = "levi.moodLogs.v1";

const isBrowser = () => typeof window !== "undefined";

export function loadMoodLogs(): MoodLog[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(MOOD_LOGS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as MoodLog[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function saveMoodLogs(logs: MoodLog[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(MOOD_LOGS_KEY, JSON.stringify(logs));
}

export function newMoodLogId(): string {
  if (isBrowser() && typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `mood_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function isToday(iso: string): boolean {
  const d = new Date(iso);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}
