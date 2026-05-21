import {
  ABAS_ITEMS,
  AbasDomain,
  AbasRating,
  itemsByDomain,
} from "@/lib/abas";

export type SkillAssessment = {
  id: string;
  itemId: string;
  caretakerId: string;
  rating: AbasRating;
  note?: string;
  assessedAt: string;
};

export const ASSESSMENTS_KEY = "levi.skillAssessments.v1";
export const BASELINE_DONE_KEY = "levi.baselineDone.v1";

const isBrowser = () => typeof window !== "undefined";

export function loadAssessments(): SkillAssessment[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(ASSESSMENTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SkillAssessment[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveAssessments(assessments: SkillAssessment[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(ASSESSMENTS_KEY, JSON.stringify(assessments));
}

export function loadBaselineDone(): boolean {
  if (!isBrowser()) return false;
  return window.localStorage.getItem(BASELINE_DONE_KEY) === "1";
}

export function saveBaselineDone(done: boolean) {
  if (!isBrowser()) return;
  if (done) {
    window.localStorage.setItem(BASELINE_DONE_KEY, "1");
  } else {
    window.localStorage.removeItem(BASELINE_DONE_KEY);
  }
}

export function newAssessmentId(): string {
  if (isBrowser() && typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `assess_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

// Get the most recent rating per item across all assessments.
export type ItemState = {
  itemId: string;
  domain: AbasDomain;
  latestRating: AbasRating | null;
  latestAssessedAt: string | null;
  latestCaretakerId: string | null;
  assessmentCount: number;
};

export function computeItemStates(
  assessments: SkillAssessment[],
): Map<string, ItemState> {
  const latest = new Map<string, SkillAssessment>();
  const counts = new Map<string, number>();
  for (const a of assessments) {
    counts.set(a.itemId, (counts.get(a.itemId) ?? 0) + 1);
    const prev = latest.get(a.itemId);
    if (!prev || new Date(a.assessedAt) > new Date(prev.assessedAt)) {
      latest.set(a.itemId, a);
    }
  }
  const states = new Map<string, ItemState>();
  for (const item of ABAS_ITEMS) {
    const a = latest.get(item.id);
    states.set(item.id, {
      itemId: item.id,
      domain: item.domain,
      latestRating: a?.rating ?? null,
      latestAssessedAt: a?.assessedAt ?? null,
      latestCaretakerId: a?.caretakerId ?? null,
      assessmentCount: counts.get(item.id) ?? 0,
    });
  }
  return states;
}

// "Frontier" = index of the highest item where Levi has been rated >= 2.
// If nothing rated >= 2 in this domain, frontier is -1 (still working from start).
function findFrontierIndex(
  domain: AbasDomain,
  states: Map<string, ItemState>,
): number {
  const items = itemsByDomain(domain);
  let frontier = -1;
  for (let i = 0; i < items.length; i++) {
    const s = states.get(items[i].id);
    if (s && s.latestRating !== null && s.latestRating >= 2) {
      frontier = i;
    }
  }
  return frontier;
}

// Active growth zone for a domain: items just above the frontier, where Levi
// might be emerging. We include up to LOOKAHEAD items past the frontier and
// any "Sometimes" rated items that aren't yet "Always" — they're the work in
// progress. Items rated 3 are mastered. Items rated 0/1 well below the
// frontier are skipped.
const LOOKAHEAD = 3;

export type GrowthZoneItem = {
  itemId: string;
  status: "emerging" | "next" | "mastered" | "not-yet";
};

export function growthZoneForDomain(
  domain: AbasDomain,
  states: Map<string, ItemState>,
): GrowthZoneItem[] {
  const items = itemsByDomain(domain);
  const frontier = findFrontierIndex(domain, states);
  const result: GrowthZoneItem[] = [];
  for (let i = 0; i < items.length; i++) {
    const s = states.get(items[i].id);
    const rating = s?.latestRating ?? null;
    if (i <= frontier) {
      // Items at or below the frontier are either mastered (3),
      // emerging (2), or earlier baseline ratings we keep an eye on.
      if (rating === 2) {
        result.push({ itemId: items[i].id, status: "emerging" });
      } else if (rating === 3) {
        // Mastered: spot-check occasionally, but not in the active zone.
        // Skip from growth zone.
      }
      // Items rated 0/1 below the frontier are usually "still not yet" —
      // we won't ask about them every session.
    } else if (i <= frontier + LOOKAHEAD) {
      result.push({ itemId: items[i].id, status: "next" });
    }
  }
  return result;
}

export function activeGrowthZone(
  states: Map<string, ItemState>,
): { domain: AbasDomain; items: GrowthZoneItem[] }[] {
  return (
    ["communication", "self-care", "social", "leisure", "motor", "self-direction", "home-living", "functional-pre-academics", "community-use", "health-safety"] as AbasDomain[]
  ).map((domain) => ({
    domain,
    items: growthZoneForDomain(domain, states),
  }));
}

export type DomainProgress = {
  domain: AbasDomain;
  mastered: number;
  emerging: number;
  notYet: number;
  unassessed: number;
  frontierIndex: number;
  totalItems: number;
};

export function domainProgress(
  domain: AbasDomain,
  states: Map<string, ItemState>,
): DomainProgress {
  const items = itemsByDomain(domain);
  let mastered = 0;
  let emerging = 0;
  let notYet = 0;
  let unassessed = 0;
  for (const item of items) {
    const r = states.get(item.id)?.latestRating ?? null;
    if (r === 3) mastered++;
    else if (r === 2) emerging++;
    else if (r === 0 || r === 1) notYet++;
    else unassessed++;
  }
  return {
    domain,
    mastered,
    emerging,
    notYet,
    unassessed,
    frontierIndex: findFrontierIndex(domain, states),
    totalItems: items.length,
  };
}

// Sample 3-4 items for a micro-survey. Picks from the active growth zone
// across multiple domains, preferring "next" (just above frontier) and
// "emerging" (sometimes-can) items. Filters out items we've assessed very
// recently (to avoid asking the same thing twice in one session).
export function sampleMicroSurveyItems(
  states: Map<string, ItemState>,
  count = 4,
  recentAssessmentMs = 30 * 60 * 1000, // 30 minutes
): string[] {
  const now = Date.now();
  const zone = activeGrowthZone(states).flatMap((z) =>
    z.items.map((i) => ({ ...i, domain: z.domain })),
  );
  const eligible = zone.filter((z) => {
    const s = states.get(z.itemId);
    if (!s?.latestAssessedAt) return true;
    return now - new Date(s.latestAssessedAt).getTime() > recentAssessmentMs;
  });
  // Shuffle deterministically by hashing item id with current minute,
  // weighted toward "next" (just past frontier) and "emerging" items.
  const weighted = eligible.map((z) => ({
    z,
    weight: z.status === "next" ? 2 : 1,
  }));
  // Reservoir-like sampling with weights.
  const picked: string[] = [];
  const used = new Set<string>();
  const pool = [...weighted];
  while (picked.length < count && pool.length > 0) {
    const totalWeight = pool.reduce((acc, w) => acc + w.weight, 0);
    if (totalWeight === 0) break;
    let r = Math.random() * totalWeight;
    let chosenIdx = 0;
    for (let i = 0; i < pool.length; i++) {
      r -= pool[i].weight;
      if (r <= 0) {
        chosenIdx = i;
        break;
      }
    }
    const choice = pool.splice(chosenIdx, 1)[0];
    if (!used.has(choice.z.itemId)) {
      used.add(choice.z.itemId);
      picked.push(choice.z.itemId);
    }
  }
  return picked;
}
