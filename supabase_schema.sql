-- ============================================================
-- Dumbbellx — Supabase Schema
-- Run this entire script in: Supabase Dashboard → SQL Editor
-- ============================================================

-- ─────────────────────────────────────────────────────────────
-- 1. PROFILES
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id                TEXT        PRIMARY KEY,          -- Clerk userId
  name              TEXT        NOT NULL DEFAULT 'Challenger',
  height            NUMERIC,
  weight            NUMERIC,
  level             TEXT        NOT NULL DEFAULT 'beginner',
  units             TEXT        NOT NULL DEFAULT 'metric',
  sound_enabled     BOOLEAN     NOT NULL DEFAULT true,
  streak            INTEGER     NOT NULL DEFAULT 0,
  last_workout_date DATE,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own profile"
  ON public.profiles
  FOR ALL
  USING  (id = requesting_user_id())
  WITH CHECK (id = requesting_user_id());


-- ─────────────────────────────────────────────────────────────
-- 2. WORKOUT LOGS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.workout_logs (
  id                TEXT        PRIMARY KEY,          -- client-generated UUID
  user_id           TEXT        NOT NULL,
  template_id       TEXT,
  workout_day_id    TEXT,
  name              TEXT        NOT NULL DEFAULT 'Workout',
  date              DATE        NOT NULL DEFAULT CURRENT_DATE,
  duration_seconds  INTEGER     NOT NULL DEFAULT 0,
  exercises         JSONB       NOT NULL DEFAULT '[]',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_workout_logs_user_id ON public.workout_logs (user_id);
CREATE INDEX IF NOT EXISTS idx_workout_logs_date    ON public.workout_logs (date);

ALTER TABLE public.workout_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own logs"
  ON public.workout_logs
  FOR ALL
  USING  (user_id = requesting_user_id())
  WITH CHECK (user_id = requesting_user_id());


-- ─────────────────────────────────────────────────────────────
-- 3. CUSTOM PLANS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.custom_plans (
  id                TEXT        PRIMARY KEY,          -- client-generated UUID
  user_id           TEXT        NOT NULL,
  name              TEXT        NOT NULL DEFAULT 'My Plan',
  split_type        TEXT,
  days_per_week     INTEGER     NOT NULL DEFAULT 3,
  experience_level  TEXT        NOT NULL DEFAULT 'intermediate',
  goal              JSONB       NOT NULL DEFAULT '["hypertrophy"]',
  description       TEXT,
  workout_days      JSONB       NOT NULL DEFAULT '[]',
  weekly_schedule   JSONB       NOT NULL DEFAULT '[]',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_custom_plans_user_id ON public.custom_plans (user_id);

ALTER TABLE public.custom_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own plans"
  ON public.custom_plans
  FOR ALL
  USING  (user_id = requesting_user_id())
  WITH CHECK (user_id = requesting_user_id());


-- ─────────────────────────────────────────────────────────────
-- 4. BODY WEIGHTS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.body_weights (
  id        BIGSERIAL   PRIMARY KEY,
  user_id   TEXT        NOT NULL,
  date      DATE        NOT NULL DEFAULT CURRENT_DATE,
  weight    NUMERIC     NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT body_weights_user_date_unique UNIQUE (user_id, date)
);

CREATE INDEX IF NOT EXISTS idx_body_weights_user_id ON public.body_weights (user_id);
CREATE INDEX IF NOT EXISTS idx_body_weights_date    ON public.body_weights (date);

ALTER TABLE public.body_weights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own bodyweights"
  ON public.body_weights
  FOR ALL
  USING  (user_id = requesting_user_id())
  WITH CHECK (user_id = requesting_user_id());


-- ─────────────────────────────────────────────────────────────
-- NOTE: RLS uses requesting_user_id() which requires a custom
-- Postgres function OR you can use auth.uid() if you are using
-- Supabase Auth (not Clerk). Since this app uses Clerk JWTs,
-- the simplest approach is to DISABLE RLS and rely on your
-- server-side API to enforce user_id checks (already done).
-- Run the block below instead if you prefer no RLS:
-- ─────────────────────────────────────────────────────────────

-- ALTER TABLE public.profiles      DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.workout_logs  DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.custom_plans  DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.body_weights  DISABLE ROW LEVEL SECURITY;
