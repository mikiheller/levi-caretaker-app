import { NextResponse } from "next/server";
import { checkHouseholdSecret, dbErrorResponse } from "@/lib/api-auth";
import { db } from "@/lib/db";
import { ActivityLog, Engagement, Mood } from "@/lib/activityLogs";

export const runtime = "edge";

type Row = {
  id: string;
  activity_id: string;
  caretaker_id: string | null;
  started_at: string;
  ended_at: string;
  duration_seconds: number;
  mood: string;
  engagement: number;
  note: string | null;
};

function rowToLog(r: Row): ActivityLog {
  return {
    id: r.id,
    activityId: r.activity_id,
    caretakerId: r.caretaker_id ?? "",
    startedAt: new Date(r.started_at).toISOString(),
    endedAt: new Date(r.ended_at).toISOString(),
    durationSeconds: r.duration_seconds,
    mood: r.mood as Mood,
    engagement: r.engagement as Engagement,
    note: r.note ?? undefined,
  };
}

export async function GET(request: Request) {
  const denied = checkHouseholdSecret(request);
  if (denied) return denied;
  const url = new URL(request.url);
  const limit = Math.min(500, Number(url.searchParams.get("limit") ?? "100"));
  try {
    const sql = db();
    const rows = (await sql`
      SELECT id, activity_id, caretaker_id, started_at, ended_at,
             duration_seconds, mood, engagement, note
      FROM activity_logs
      ORDER BY started_at DESC
      LIMIT ${limit}
    `) as Row[];
    return NextResponse.json({ logs: rows.map(rowToLog) });
  } catch (err) {
    return dbErrorResponse(err);
  }
}

export async function POST(request: Request) {
  const denied = checkHouseholdSecret(request);
  if (denied) return denied;
  const body = (await request.json()) as Partial<ActivityLog>;
  const required = [
    "id",
    "activityId",
    "caretakerId",
    "startedAt",
    "endedAt",
    "durationSeconds",
    "mood",
    "engagement",
  ] as const;
  for (const k of required) {
    if (body[k] === undefined || body[k] === null) {
      return NextResponse.json({ error: `Missing field: ${k}` }, { status: 400 });
    }
  }
  try {
    const sql = db();
    const rows = (await sql`
      INSERT INTO activity_logs
        (id, activity_id, caretaker_id, started_at, ended_at,
         duration_seconds, mood, engagement, note)
      VALUES
        (${body.id}, ${body.activityId}, ${body.caretakerId},
         ${body.startedAt}, ${body.endedAt},
         ${body.durationSeconds}, ${body.mood}, ${body.engagement},
         ${body.note ?? null})
      ON CONFLICT (id) DO NOTHING
      RETURNING id, activity_id, caretaker_id, started_at, ended_at,
                duration_seconds, mood, engagement, note
    `) as Row[];
    if (rows.length === 0) {
      return NextResponse.json({ ok: true, deduped: true });
    }
    return NextResponse.json({ log: rowToLog(rows[0]) });
  } catch (err) {
    return dbErrorResponse(err);
  }
}
