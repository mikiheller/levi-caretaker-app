import { NextResponse } from "next/server";
import { checkHouseholdSecret, dbErrorResponse } from "@/lib/api-auth";
import { db } from "@/lib/db";
import { SkillAssessment } from "@/lib/skillAssessments";
import { AbasRating } from "@/lib/abas";

export const runtime = "edge";

type Row = {
  id: string;
  item_id: string;
  caretaker_id: string | null;
  rating: number;
  note: string | null;
  assessed_at: string;
};

function rowToAssessment(r: Row): SkillAssessment {
  return {
    id: r.id,
    itemId: r.item_id,
    caretakerId: r.caretaker_id ?? "",
    rating: r.rating as AbasRating,
    note: r.note ?? undefined,
    assessedAt: new Date(r.assessed_at).toISOString(),
  };
}

export async function GET(request: Request) {
  const denied = checkHouseholdSecret(request);
  if (denied) return denied;
  const url = new URL(request.url);
  const limit = Math.min(5000, Number(url.searchParams.get("limit") ?? "2000"));
  try {
    const sql = db();
    const rows = (await sql`
      SELECT id, item_id, caretaker_id, rating, note, assessed_at
      FROM skill_assessments
      ORDER BY assessed_at DESC
      LIMIT ${limit}
    `) as Row[];
    return NextResponse.json({ assessments: rows.map(rowToAssessment) });
  } catch (err) {
    return dbErrorResponse(err);
  }
}

export async function POST(request: Request) {
  const denied = checkHouseholdSecret(request);
  if (denied) return denied;
  const body = (await request.json()) as Partial<SkillAssessment>;
  if (
    !body.id ||
    !body.itemId ||
    body.rating === undefined ||
    body.rating === null ||
    !body.assessedAt
  ) {
    return NextResponse.json(
      { error: "Missing required fields: id, itemId, rating, assessedAt" },
      { status: 400 },
    );
  }
  if (body.rating < 0 || body.rating > 3) {
    return NextResponse.json(
      { error: "rating must be 0, 1, 2, or 3" },
      { status: 400 },
    );
  }
  try {
    const sql = db();
    const rows = (await sql`
      INSERT INTO skill_assessments
        (id, item_id, caretaker_id, rating, note, assessed_at)
      VALUES
        (${body.id}, ${body.itemId}, ${body.caretakerId ?? null},
         ${body.rating}, ${body.note ?? null}, ${body.assessedAt})
      ON CONFLICT (id) DO NOTHING
      RETURNING id, item_id, caretaker_id, rating, note, assessed_at
    `) as Row[];
    if (rows.length === 0) {
      return NextResponse.json({ ok: true, deduped: true });
    }
    return NextResponse.json({ assessment: rowToAssessment(rows[0]) });
  } catch (err) {
    return dbErrorResponse(err);
  }
}
