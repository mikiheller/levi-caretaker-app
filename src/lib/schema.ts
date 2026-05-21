// Schema as a TypeScript constant so it can be applied from the edge runtime
// /api/admin/migrate endpoint. Keep this in sync with db/schema.sql.

export const SCHEMA_STATEMENTS: string[] = [
  `CREATE TABLE IF NOT EXISTS caretakers (
     id          TEXT PRIMARY KEY,
     name        TEXT NOT NULL,
     role        TEXT NOT NULL,
     emoji       TEXT NOT NULL DEFAULT '🌻',
     created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
   )`,
  `CREATE TABLE IF NOT EXISTS activity_logs (
     id                TEXT PRIMARY KEY,
     activity_id       TEXT NOT NULL,
     caretaker_id      TEXT REFERENCES caretakers(id) ON DELETE SET NULL,
     started_at        TIMESTAMPTZ NOT NULL,
     ended_at          TIMESTAMPTZ NOT NULL,
     duration_seconds  INTEGER NOT NULL CHECK (duration_seconds >= 0),
     mood              TEXT NOT NULL,
     engagement        SMALLINT NOT NULL CHECK (engagement BETWEEN 1 AND 5),
     note              TEXT,
     created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
   )`,
  `CREATE INDEX IF NOT EXISTS activity_logs_started_at_idx
     ON activity_logs (started_at DESC)`,
  `CREATE INDEX IF NOT EXISTS activity_logs_caretaker_idx
     ON activity_logs (caretaker_id)`,
  `CREATE TABLE IF NOT EXISTS active_session (
     id            TEXT PRIMARY KEY CHECK (id = 'singleton'),
     activity_id   TEXT NOT NULL,
     caretaker_id  TEXT REFERENCES caretakers(id) ON DELETE CASCADE,
     started_at    TIMESTAMPTZ NOT NULL,
     updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
   )`,
  `CREATE TABLE IF NOT EXISTS mood_logs (
     id            TEXT PRIMARY KEY,
     caretaker_id  TEXT REFERENCES caretakers(id) ON DELETE SET NULL,
     mood          TEXT NOT NULL,
     reasons       TEXT[] NOT NULL DEFAULT '{}',
     note          TEXT,
     logged_at     TIMESTAMPTZ NOT NULL,
     created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
   )`,
  `CREATE INDEX IF NOT EXISTS mood_logs_logged_at_idx
     ON mood_logs (logged_at DESC)`,
  `CREATE TABLE IF NOT EXISTS potty_logs (
     id              TEXT PRIMARY KEY,
     caretaker_id    TEXT REFERENCES caretakers(id) ON DELETE SET NULL,
     type            TEXT NOT NULL CHECK (type IN ('toilet', 'accident')),
     initiator       TEXT,
     pee             BOOLEAN,
     poop            BOOLEAN,
     accident_type   TEXT,
     what_was_doing  TEXT,
     note            TEXT,
     logged_at       TIMESTAMPTZ NOT NULL,
     created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
   )`,
  `CREATE INDEX IF NOT EXISTS potty_logs_logged_at_idx
     ON potty_logs (logged_at DESC)`,
  `CREATE TABLE IF NOT EXISTS behavior_logs (
     id            TEXT PRIMARY KEY,
     caretaker_id  TEXT REFERENCES caretakers(id) ON DELETE SET NULL,
     text          TEXT NOT NULL,
     media         JSONB NOT NULL DEFAULT '[]'::jsonb,
     logged_at     TIMESTAMPTZ NOT NULL,
     created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
   )`,
  `CREATE INDEX IF NOT EXISTS behavior_logs_logged_at_idx
     ON behavior_logs (logged_at DESC)`,
  `CREATE TABLE IF NOT EXISTS skill_assessments (
     id            TEXT PRIMARY KEY,
     item_id       TEXT NOT NULL,
     caretaker_id  TEXT REFERENCES caretakers(id) ON DELETE SET NULL,
     rating        SMALLINT NOT NULL CHECK (rating BETWEEN 0 AND 3),
     note          TEXT,
     assessed_at   TIMESTAMPTZ NOT NULL,
     created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
   )`,
  `CREATE INDEX IF NOT EXISTS skill_assessments_item_idx
     ON skill_assessments (item_id)`,
  `CREATE INDEX IF NOT EXISTS skill_assessments_assessed_at_idx
     ON skill_assessments (assessed_at DESC)`,
];
