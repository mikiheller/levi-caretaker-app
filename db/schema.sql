-- Levi Caretaker App schema
-- Run this once against your Neon Postgres database.
-- Subsequent changes will be additive (CREATE TABLE IF NOT EXISTS / ALTER TABLE).

CREATE TABLE IF NOT EXISTS caretakers (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  role        TEXT NOT NULL,
  emoji       TEXT NOT NULL DEFAULT '🌻',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS activity_logs (
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
);

CREATE INDEX IF NOT EXISTS activity_logs_started_at_idx
  ON activity_logs (started_at DESC);

CREATE INDEX IF NOT EXISTS activity_logs_caretaker_idx
  ON activity_logs (caretaker_id);

-- Only ever one active session at a time (id is always 'singleton').
CREATE TABLE IF NOT EXISTS active_session (
  id            TEXT PRIMARY KEY CHECK (id = 'singleton'),
  activity_id   TEXT NOT NULL,
  caretaker_id  TEXT REFERENCES caretakers(id) ON DELETE CASCADE,
  started_at    TIMESTAMPTZ NOT NULL,
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS mood_logs (
  id            TEXT PRIMARY KEY,
  caretaker_id  TEXT REFERENCES caretakers(id) ON DELETE SET NULL,
  mood          TEXT NOT NULL,
  reasons       TEXT[] NOT NULL DEFAULT '{}',
  note          TEXT,
  logged_at     TIMESTAMPTZ NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS mood_logs_logged_at_idx
  ON mood_logs (logged_at DESC);
