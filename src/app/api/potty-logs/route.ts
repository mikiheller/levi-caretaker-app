import { NextResponse } from "next/server";
import { checkHouseholdSecret, dbErrorResponse } from "@/lib/api-auth";
import { db } from "@/lib/db";
import {
  AccidentType,
  PottyEventType,
  PottyLog,
  ToiletInitiator,
} from "@/lib/pottyLogs";

export const runtime = "edge";

type Row = {
  id: string;
  caretaker_id: string | null;
  type: string;
  initiator: string | null;
  pee: boolean | null;
  poop: boolean | null;
  accident_type: string | null;
  what_was_doing: string | null;
  note: string | null;
  logged_at: string;
};

function rowToLog(r: Row): PottyLog {
  return {
    id: r.id,
    caretakerId: r.caretaker_id ?? "",
    type: r.type as PottyEventType,
    initiator: (r.initiator as ToiletInitiator | null) ?? undefined,
    pee: r.pee ?? undefined,
    poop: r.poop ?? undefined,
    accidentType: (r.accident_type as AccidentType | null) ?? undefined,
    whatWasDoing: r.what_was_doing ?? undefined,
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
      SELECT id, caretaker_id, type, initiator, pee, poop,
             accident_type, what_was_doing, note, logged_at
      FROM potty_logs
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
  const body = (await request.json()) as Partial<PottyLog>;
  if (!body.id || !body.type || !body.loggedAt) {
    return NextResponse.json(
      { error: "Missing required fields: id, type, loggedAt" },
      { status: 400 },
    );
  }
  try {
    const sql = db();
    const rows = (await sql`
      INSERT INTO potty_logs
        (id, caretaker_id, type, initiator, pee, poop,
         accident_type, what_was_doing, note, logged_at)
      VALUES
        (${body.id}, ${body.caretakerId ?? null}, ${body.type},
         ${body.initiator ?? null}, ${body.pee ?? null}, ${body.poop ?? null},
         ${body.accidentType ?? null}, ${body.whatWasDoing ?? null},
         ${body.note ?? null}, ${body.loggedAt})
      ON CONFLICT (id) DO NOTHING
      RETURNING id, caretaker_id, type, initiator, pee, poop,
                accident_type, what_was_doing, note, logged_at
    `) as Row[];
    if (rows.length === 0) {
      return NextResponse.json({ ok: true, deduped: true });
    }
    return NextResponse.json({ log: rowToLog(rows[0]) });
  } catch (err) {
    return dbErrorResponse(err);
  }
}
