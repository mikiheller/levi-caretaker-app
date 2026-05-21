import { NextResponse } from "next/server";
import { checkHouseholdSecret, dbErrorResponse } from "@/lib/api-auth";
import { db, isDbConfigured } from "@/lib/db";
import { SCHEMA_STATEMENTS } from "@/lib/schema";

export const runtime = "edge";

export async function POST(request: Request) {
  const denied = checkHouseholdSecret(request);
  if (denied) return denied;

  if (!isDbConfigured()) {
    return NextResponse.json(
      { error: "DATABASE_URL is not set on the server." },
      { status: 500 },
    );
  }

  try {
    const sql = db();
    const applied: string[] = [];
    for (const stmt of SCHEMA_STATEMENTS) {
      const preview = stmt.replace(/\s+/g, " ").trim().slice(0, 80);
      await sql.query(stmt);
      applied.push(preview);
    }
    return NextResponse.json({
      ok: true,
      applied,
      message: `Ran ${applied.length} statements successfully.`,
    });
  } catch (err) {
    return dbErrorResponse(err);
  }
}
