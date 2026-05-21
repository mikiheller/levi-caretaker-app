import { NextResponse } from "next/server";

export const HOUSEHOLD_SECRET_HEADER = "x-household-secret";

function getExpectedSecret(): string | null {
  const v = process.env.HOUSEHOLD_SECRET;
  return v && v.length > 0 ? v : null;
}

export function checkHouseholdSecret(request: Request): NextResponse | null {
  const expected = getExpectedSecret();
  if (!expected) {
    return NextResponse.json(
      {
        error:
          "HOUSEHOLD_SECRET is not set on the server. Set it in the Vercel project's Environment Variables.",
      },
      { status: 500 },
    );
  }
  const provided = request.headers.get(HOUSEHOLD_SECRET_HEADER);
  if (!provided) {
    return NextResponse.json({ error: "Missing household secret." }, { status: 401 });
  }
  if (!timingSafeEqual(provided, expected)) {
    return NextResponse.json({ error: "Invalid household secret." }, { status: 401 });
  }
  return null;
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export function dbErrorResponse(err: unknown): NextResponse {
  const message = err instanceof Error ? err.message : "Unknown database error";
  return NextResponse.json(
    { error: `Database error: ${message}` },
    { status: 503 },
  );
}
