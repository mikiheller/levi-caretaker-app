import { NextResponse } from "next/server";
import { checkHouseholdSecret, dbErrorResponse } from "@/lib/api-auth";
import { db } from "@/lib/db";
import { Caretaker, CaretakerRole } from "@/lib/caretakers";

export const runtime = "edge";

type Row = {
  id: string;
  name: string;
  role: string;
  emoji: string;
  created_at: string;
};

function rowToCaretaker(r: Row): Caretaker {
  return {
    id: r.id,
    name: r.name,
    role: r.role as CaretakerRole,
    emoji: r.emoji,
    createdAt: new Date(r.created_at).toISOString(),
  };
}

export async function GET(request: Request) {
  const denied = checkHouseholdSecret(request);
  if (denied) return denied;
  try {
    const sql = db();
    const rows = (await sql`
      SELECT id, name, role, emoji, created_at
      FROM caretakers
      ORDER BY created_at ASC
    `) as Row[];
    return NextResponse.json({ caretakers: rows.map(rowToCaretaker) });
  } catch (err) {
    return dbErrorResponse(err);
  }
}

export async function POST(request: Request) {
  const denied = checkHouseholdSecret(request);
  if (denied) return denied;
  const body = (await request.json()) as Partial<Caretaker>;
  if (!body.id || !body.name || !body.role || !body.emoji) {
    return NextResponse.json(
      { error: "Missing required fields: id, name, role, emoji" },
      { status: 400 },
    );
  }
  try {
    const sql = db();
    const rows = (await sql`
      INSERT INTO caretakers (id, name, role, emoji, created_at)
      VALUES (${body.id}, ${body.name.trim()}, ${body.role}, ${body.emoji},
              ${body.createdAt ?? new Date().toISOString()})
      ON CONFLICT (id) DO UPDATE
        SET name = EXCLUDED.name,
            role = EXCLUDED.role,
            emoji = EXCLUDED.emoji
      RETURNING id, name, role, emoji, created_at
    `) as Row[];
    return NextResponse.json({ caretaker: rowToCaretaker(rows[0]) });
  } catch (err) {
    return dbErrorResponse(err);
  }
}
