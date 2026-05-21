export type BehaviorMediaType = "photo" | "video" | "audio";

export type BehaviorMedia = {
  url: string;
  type: BehaviorMediaType;
  contentType: string;
  filename?: string;
};

export type BehaviorLog = {
  id: string;
  caretakerId: string;
  text: string;
  media: BehaviorMedia[];
  loggedAt: string;
};

export const BEHAVIOR_LOGS_KEY = "levi.behaviorLogs.v1";

const isBrowser = () => typeof window !== "undefined";

export function loadBehaviorLogs(): BehaviorLog[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(BEHAVIOR_LOGS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as BehaviorLog[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveBehaviorLogs(logs: BehaviorLog[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(BEHAVIOR_LOGS_KEY, JSON.stringify(logs));
}

export function newBehaviorLogId(): string {
  if (isBrowser() && typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `beh_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function mediaKindFromContentType(
  contentType: string,
): BehaviorMediaType {
  if (contentType.startsWith("image/")) return "photo";
  if (contentType.startsWith("video/")) return "video";
  return "audio";
}
