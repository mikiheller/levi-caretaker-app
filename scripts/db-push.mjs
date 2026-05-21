#!/usr/bin/env node
// Apply db/schema.sql to the database in DATABASE_URL.
// Usage: node scripts/db-push.mjs

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { neon } from "@neondatabase/serverless";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL is not set.");
    console.error(
      "Either set it inline (DATABASE_URL=... npm run db:push) or run `vercel env pull .env.local` first.",
    );
    process.exit(1);
  }
  const sqlPath = join(__dirname, "..", "db", "schema.sql");
  const schema = readFileSync(sqlPath, "utf8");
  const statements = schema
    .split(/;\s*\n/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !s.startsWith("--"));

  const sql = neon(url);

  console.log(`Applying ${statements.length} statements to the database…`);
  for (const stmt of statements) {
    const preview = stmt.split("\n")[0].slice(0, 70);
    process.stdout.write(`  · ${preview}…`);
    await sql.query(stmt);
    process.stdout.write(" ok\n");
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error("Failed:", err.message ?? err);
  process.exit(1);
});
