import { NextResponse } from "next/server";
import { checkHouseholdSecret } from "@/lib/api-auth";
import { isDbConfigured } from "@/lib/db";

export const runtime = "edge";

export async function GET(request: Request) {
  const denied = checkHouseholdSecret(request);
  if (denied) return denied;
  return NextResponse.json({
    ok: true,
    dbConfigured: isDbConfigured(),
  });
}
