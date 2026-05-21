import { NextResponse } from "next/server";
import { checkHouseholdSecret, dbErrorResponse } from "@/lib/api-auth";
import { db } from "@/lib/db";
import { MoodLog, MoodReason } from "@/lib/moodLogs";
import { Mood } from "@/lib/activityLogs";

export const runtime = "edge";

type Row = {
  id: string;
  caretaker_id: string | null;
  mood: string;
  reasons: string[] | null;
  note: string | null;
  logged_at: string;
};

function rowToLog(r: Row): MoodLog {
  return {
    id: r.id,
    caretakerId: r.caretaker_id ?? "",
    mood: r.mood as Mood,
    reasons: (r.reasons ?? []) as MoodReason[],
    note: r.note ?? undefined,
    loggedAt: new Date(r.logged_at).toISOString(),
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
      SELECT id, caretaker_id, mood, reasons, note, logged_at
      FROM mood_logs
      ORDER BY logged_at DESC
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
  const body = (await request.json()) as Partial<MoodLog>;
  if (!body.id || !body.mood || !body.loggedAt) {
    return NextResponse.json(
      { error: "Missing required fields: id, mood, loggedAt" },
      { status: 400 },
    );
  }
  try {
    const sql = db();
    const rows = (await sql`
      INSERT INTO mood_logs
        (id, caretaker_id, mood, reasons, note, logged_at)
      VALUES
        (${body.id}, ${body.caretakerId ?? null}, ${body.mood},
         ${body.reasons ?? []}, ${body.note ?? null}, ${body.loggedAt})
      ON CONFLICT (id) DO NOTHING
      RETURNING id, caretaker_id, mood, reasons, note, logged_at
    `) as Row[];
    if (rows.length === 0) {
      return NextResponse.json({ ok: true, deduped: true });
    }
    return NextResponse.json({ log: rowToLog(rows[0]) });
  } catch (err) {
    return dbErrorResponse(err);
  }
}
