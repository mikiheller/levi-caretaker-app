export type Mood = "great" | "good" | "ok" | "off" | "tough";
export type Engagement = 1 | 2 | 3 | 4 | 5;

export const MOOD_OPTIONS: { value: Mood; emoji: string; label: string }[] = [
  { value: "great", emoji: "😄", label: "Great" },
  { value: "good", emoji: "🙂", label: "Good" },
  { value: "ok", emoji: "😐", label: "Just ok" },
  { value: "off", emoji: "😕", label: "A bit off" },
  { value: "tough", emoji: "😢", label: "Tough" },
];

export const ENGAGEMENT_LABELS: Record<Engagement, string> = {
  1: "Not really",
  2: "A little",
  3: "Mostly",
  4: "Really into it",
  5: "Fully locked in",
};

export type ActivityLog = {
  id: string;
  activityId: string;
  caretakerId: string;
  startedAt: string;
  endedAt: string;
  durationSeconds: number;
  mood: Mood;
  engagement: Engagement;
  note?: string;
};

export type ActiveSession = {
  activityId: string;
  caretakerId: string;
  startedAt: string;
};

export const ACTIVITY_LOGS_KEY = "levi.activityLogs.v1";
export const ACTIVE_SESSION_KEY = "levi.activeSession.v1";

const isBrowser = () => typeof window !== "undefined";

export function loadActivityLogs(): ActivityLog[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(ACTIVITY_LOGS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ActivityLog[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function saveActivityLogs(logs: ActivityLog[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(ACTIVITY_LOGS_KEY, JSON.stringify(logs));
}

export function loadActiveSession(): ActiveSession | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(ACTIVE_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ActiveSession;
    if (!parsed.activityId || !parsed.startedAt) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveActiveSession(session: ActiveSession | null) {
  if (!isBrowser()) return;
  if (session) {
    window.localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(session));
  } else {
    window.localStorage.removeItem(ACTIVE_SESSION_KEY);
  }
}

export function newLogId(): string {
  if (isBrowser() && typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `log_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function formatDuration(seconds: number): string {
  const mm = Math.floor(seconds / 60);
  const ss = seconds % 60;
  return `${mm}:${ss.toString().padStart(2, "0")}`;
}

export function formatDurationLong(seconds: number): string {
  const mm = Math.floor(seconds / 60);
  const ss = seconds % 60;
  if (mm === 0) return `${ss} sec`;
  if (ss === 0) return `${mm} min`;
  return `${mm} min ${ss} sec`;
}

export function formatRelative(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const seconds = Math.floor((now - then) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}
