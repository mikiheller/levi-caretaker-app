import { Caretaker } from "@/lib/caretakers";
import { ActiveSession, ActivityLog } from "@/lib/activityLogs";
import { MoodLog } from "@/lib/moodLogs";
import { PottyLog } from "@/lib/pottyLogs";
import { BehaviorLog } from "@/lib/behaviorLogs";
import { SkillAssessment } from "@/lib/skillAssessments";

export const HOUSEHOLD_SECRET_KEY = "levi.householdSecret.v1";
export const HOUSEHOLD_SECRET_HEADER = "x-household-secret";

const isBrowser = () => typeof window !== "undefined";

export function loadHouseholdSecret(): string | null {
  if (!isBrowser()) return null;
  return window.localStorage.getItem(HOUSEHOLD_SECRET_KEY);
}

export function saveHouseholdSecret(secret: string | null) {
  if (!isBrowser()) return;
  if (secret) {
    window.localStorage.setItem(HOUSEHOLD_SECRET_KEY, secret);
  } else {
    window.localStorage.removeItem(HOUSEHOLD_SECRET_KEY);
  }
}

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function request<T>(
  path: string,
  init?: RequestInit & { secret?: string | null },
): Promise<T> {
  const secret = init?.secret ?? loadHouseholdSecret();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init?.headers as Record<string, string> | undefined),
  };
  if (secret) {
    headers[HOUSEHOLD_SECRET_HEADER] = secret;
  }
  const res = await fetch(path, { ...init, headers });
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {
      // ignore
    }
    throw new ApiError(res.status, message);
  }
  return (await res.json()) as T;
}

export const api = {
  health: (secret?: string) =>
    request<{ ok: true; dbConfigured: boolean }>("/api/health", { secret }),

  listCaretakers: () =>
    request<{ caretakers: Caretaker[] }>("/api/caretakers"),

  upsertCaretaker: (caretaker: Caretaker) =>
    request<{ caretaker: Caretaker }>("/api/caretakers", {
      method: "POST",
      body: JSON.stringify(caretaker),
    }),

  deleteCaretaker: (id: string) =>
    request<{ ok: true }>(`/api/caretakers/${encodeURIComponent(id)}`, {
      method: "DELETE",
    }),

  listActivityLogs: (limit = 100) =>
    request<{ logs: ActivityLog[] }>(`/api/activity-logs?limit=${limit}`),

  createActivityLog: (log: ActivityLog) =>
    request<{ log?: ActivityLog; deduped?: boolean }>("/api/activity-logs", {
      method: "POST",
      body: JSON.stringify(log),
    }),

  getActiveSession: () =>
    request<{ session: ActiveSession | null }>("/api/active-session"),

  setActiveSession: (session: ActiveSession) =>
    request<{ session: ActiveSession }>("/api/active-session", {
      method: "POST",
      body: JSON.stringify(session),
    }),

  clearActiveSession: () =>
    request<{ ok: true }>("/api/active-session", { method: "DELETE" }),

  listMoodLogs: (limit = 100) =>
    request<{ logs: MoodLog[] }>(`/api/mood-logs?limit=${limit}`),

  createMoodLog: (log: MoodLog) =>
    request<{ log?: MoodLog; deduped?: boolean }>("/api/mood-logs", {
      method: "POST",
      body: JSON.stringify(log),
    }),

  listPottyLogs: (limit = 100) =>
    request<{ logs: PottyLog[] }>(`/api/potty-logs?limit=${limit}`),

  createPottyLog: (log: PottyLog) =>
    request<{ log?: PottyLog; deduped?: boolean }>("/api/potty-logs", {
      method: "POST",
      body: JSON.stringify(log),
    }),

  listBehaviorLogs: (limit = 100) =>
    request<{ logs: BehaviorLog[] }>(`/api/behavior-logs?limit=${limit}`),

  createBehaviorLog: (log: BehaviorLog) =>
    request<{ log?: BehaviorLog; deduped?: boolean }>("/api/behavior-logs", {
      method: "POST",
      body: JSON.stringify(log),
    }),

  transcribeAudio: async (blob: Blob, filename = "audio.webm") => {
    const fd = new FormData();
    fd.append("file", blob, filename);
    fd.append("filename", filename);
    const secret = loadHouseholdSecret();
    const headers: Record<string, string> = {};
    if (secret) headers[HOUSEHOLD_SECRET_HEADER] = secret;
    const res = await fetch("/api/transcribe", {
      method: "POST",
      headers,
      body: fd,
    });
    if (!res.ok) {
      let msg = `Transcription failed (${res.status})`;
      try {
        const json = await res.json();
        if (json?.error) msg = json.error;
      } catch {}
      throw new ApiError(res.status, msg);
    }
    return (await res.json()) as { text: string };
  },

  listSkillAssessments: (limit = 2000) =>
    request<{ assessments: SkillAssessment[] }>(
      `/api/skill-assessments?limit=${limit}`,
    ),

  createSkillAssessment: (assessment: SkillAssessment) =>
    request<{ assessment?: SkillAssessment; deduped?: boolean }>(
      "/api/skill-assessments",
      {
        method: "POST",
        body: JSON.stringify(assessment),
      },
    ),

  runMigrations: () =>
    request<{ ok: true; applied: string[]; message: string }>(
      "/api/admin/migrate",
      { method: "POST" },
    ),
};
