import { NextResponse } from "next/server";
import { checkHouseholdSecret, dbErrorResponse } from "@/lib/api-auth";
import { db } from "@/lib/db";

export const runtime = "edge";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const denied = checkHouseholdSecret(request);
  if (denied) return denied;
  const { id } = await context.params;
  try {
    const sql = db();
    await sql`DELETE FROM caretakers WHERE id = ${id}`;
    return NextResponse.json({ ok: true });
  } catch (err) {
    return dbErrorResponse(err);
  }
}
