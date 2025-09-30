BEGIN;

-- 세션(오늘 운동 1건)
CREATE TABLE IF NOT EXISTS workout_sessions (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  routine_id  INTEGER REFERENCES public.routines(id) ON DELETE SET NULL,
  title       TEXT NOT NULL,
  workout_date DATE NOT NULL DEFAULT (CURRENT_DATE),
  status      TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress','completed')),
  started_at  timestamptz DEFAULT now(),
  completed_at timestamptz,
  notes       TEXT
);

-- 세션 내 운동 목록(순서/노트/휴식)
CREATE TABLE IF NOT EXISTS workout_exercises (
  id           SERIAL PRIMARY KEY,
  session_id   INTEGER NOT NULL REFERENCES workout_sessions(id) ON DELETE CASCADE,
  exercise_id  INTEGER REFERENCES public.exercises(id) ON DELETE SET NULL,
  name         TEXT NOT NULL,
  ord          INTEGER NOT NULL DEFAULT 1,
  note         TEXT,
  rest_sec     INTEGER NOT NULL DEFAULT 90
);

-- 세트(실측 기록)
CREATE TABLE IF NOT EXISTS workout_sets (
  id           SERIAL PRIMARY KEY,
  session_id   INTEGER NOT NULL REFERENCES workout_sessions(id) ON DELETE CASCADE,
  exercise_id  INTEGER NOT NULL REFERENCES workout_exercises(id) ON DELETE CASCADE,
  set_no       INTEGER NOT NULL,
  weight_kg    NUMERIC(7,2),  -- 저장은 kg
  reps         INTEGER,
  rpe          NUMERIC(3,1),
  completed    BOOLEAN NOT NULL DEFAULT false
);

CREATE INDEX IF NOT EXISTS idx_workout_sets_session ON workout_sets(session_id);
CREATE INDEX IF NOT EXISTS idx_workout_exercises_session ON workout_exercises(session_id);

COMMIT;
