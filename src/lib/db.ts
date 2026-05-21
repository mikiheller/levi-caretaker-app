import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let cached: NeonQueryFunction<false, false> | null = null;

export function db(): NeonQueryFunction<false, false> {
  if (!cached) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error(
        "DATABASE_URL is not set. Add a Neon Postgres integration in the Vercel dashboard (Storage → Create Database → Neon) and redeploy.",
      );
    }
    cached = neon(url);
  }
  return cached;
}

export function isDbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}
