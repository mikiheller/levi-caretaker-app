import { NextResponse } from "next/server";
import { checkHouseholdSecret, dbErrorResponse } from "@/lib/api-auth";
import { db } from "@/lib/db";
import { ActiveSession } from "@/lib/activityLogs";

export const runtime = "edge";

type Row = {
  activity_id: string;
  caretaker_id: string | null;
  started_at: string;
};

function rowToSession(r: Row): ActiveSession {
  return {
    activityId: r.activity_id,
    caretakerId: r.caretaker_id ?? "",
    startedAt: new Date(r.started_at).toISOString(),
  };
}

export async function GET(request: Request) {
  const denied = checkHouseholdSecret(request);
  if (denied) return denied;
  try {
    const sql = db();
    const rows = (await sql`
      SELECT activity_id, caretaker_id, started_at
      FROM active_session
      WHERE id = 'singleton'
      LIMIT 1
    `) as Row[];
    if (rows.length === 0) {
      return NextResponse.json({ session: null });
    }
    return NextResponse.json({ session: rowToSession(rows[0]) });
  } catch (err) {
    return dbErrorResponse(err);
  }
}

export async function POST(request: Request) {
  const denied = checkHouseholdSecret(request);
  if (denied) return denied;
  const body = (await request.json()) as Partial<ActiveSession>;
  if (!body.activityId || !body.caretakerId || !body.startedAt) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }
  try {
    const sql = db();
    const rows = (await sql`
      INSERT INTO active_session
        (id, activity_id, caretaker_id, started_at, updated_at)
      VALUES
        ('singleton', ${body.activityId}, ${body.caretakerId},
         ${body.startedAt}, NOW())
      ON CONFLICT (id) DO UPDATE SET
        activity_id = EXCLUDED.activity_id,
        caretaker_id = EXCLUDED.caretaker_id,
        started_at = EXCLUDED.started_at,
        updated_at = NOW()
      RETURNING activity_id, caretaker_id, started_at
    `) as Row[];
    return NextResponse.json({ session: rowToSession(rows[0]) });
  } catch (err) {
    return dbErrorResponse(err);
  }
}

export async function DELETE(request: Request) {
  const denied = checkHouseholdSecret(request);
  if (denied) return denied;
  try {
    const sql = db();
    await sql`DELETE FROM active_session WHERE id = 'singleton'`;
    return NextResponse.json({ ok: true });
  } catch (err) {
    return dbErrorResponse(err);
  }
}
