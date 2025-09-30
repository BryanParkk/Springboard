// server/routes/logs.js
import express from "express";
import db from "../db/index.js";

const router = express.Router();

// 숫자 가드
const asInt = (v) => {
  const n = Number(v);
  return Number.isInteger(n) ? n : null;
};

/** 오늘 세션 조회 ?date=YYYY-MM-DD&status=in_progress (status 생략하면 전부) */
router.get("/", async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "UNAUTHORIZED" });

    const date = req.query.date || new Date().toISOString().slice(0, 10);
    const status = req.query.status || null;

    const { rows } = await db.query(
      `SELECT id, title, routine_id, workout_date, status, started_at, completed_at
       FROM workout_sessions
       WHERE user_id=$1
         AND workout_date=$2
         AND ($3::text IS NULL OR status=$3)
       ORDER BY started_at DESC`,
      [userId, date, status]
    );
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "INTERNAL_ERROR" });
  }
});

/** 완료 히스토리 */
router.get("/history", async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "UNAUTHORIZED" });

    const status = req.query.status || "completed"; // 기본 완료 목록
    const limit = Math.min(parseInt(req.query.limit || "50", 10), 200);
    const offset = parseInt(req.query.offset || "0", 10);

    const { rows } = await db.query(
      `SELECT id, title, workout_date, status, started_at, completed_at
       FROM workout_sessions
       WHERE user_id=$1 AND ($2::text IS NULL OR status=$2)
       ORDER BY COALESCE(completed_at, started_at) DESC
       LIMIT $3 OFFSET $4`,
      [userId, status, limit, offset]
    );
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "INTERNAL_ERROR" });
  }
});

/** 세션 시작: routine 기반 또는 빈 세션 */
router.post("/start", async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "UNAUTHORIZED" });

    const { routine_id, title, date } = req.body || {};
    const workoutDate = date || new Date().toISOString().slice(0, 10);

    // 이미 오늘 in_progress 가 있으면 재사용
    const existing = await db.query(
      `SELECT id FROM workout_sessions
       WHERE user_id=$1 AND workout_date=$2 AND status='in_progress'
       ORDER BY started_at DESC LIMIT 1`,
      [userId, workoutDate]
    );
    if (existing.rowCount) {
      const sid = existing.rows[0].id;
      const data = await db.query(
        `SELECT id, title FROM workout_sessions WHERE id=$1`,
        [sid]
      );
      return res.status(200).json({ id: sid, title: data.rows[0].title });
    }

    // 세션 생성
    const sessionTitle = title || "Workout";
    const { rows: srows } = await db.query(
      `INSERT INTO workout_sessions (user_id, routine_id, title, workout_date)
       VALUES ($1,$2,$3,$4) RETURNING id, title`,
      [userId, routine_id || null, sessionTitle, workoutDate]
    );
    const sid = srows[0].id;

    // routine 펼치기
    if (routine_id) {
      const r = await db.query(
        `SELECT items FROM public.routines WHERE id=$1`,
        [routine_id]
      );
      const items = r.rows[0]?.items || [];
      for (let i = 0; i < items.length; i++) {
        const it = items[i];
        const exIns = await db.query(
          `INSERT INTO workout_exercises (session_id, exercise_id, name, ord, note, rest_sec)
           VALUES ($1,$2,$3,$4,$5,$6) RETURNING id`,
          [
            sid,
            it.exercise_id || null,
            it.name,
            i + 1,
            it.note || null,
            it.rest_sec || 90,
          ]
        );
        const exId = exIns.rows[0].id;
        const sets = it.sets || [];
        for (let j = 0; j < sets.length; j++) {
          const s = sets[j];
          await db.query(
            `INSERT INTO workout_sets (session_id, exercise_id, set_no, weight_kg, reps)
             VALUES ($1,$2,$3,$4,$5)`,
            [sid, exId, s.set_no || j + 1, s.weight_kg ?? null, s.reps ?? null]
          );
        }
      }
    }

    res.status(201).json({ id: sid, title: sessionTitle });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "INTERNAL_ERROR" });
  }
});

/** 세트 값 업데이트 */
router.patch("/sets/:setId", async (req, res) => {
  try {
    const userId = req.user?.id;
    const setId = asInt(req.params.setId);
    if (!userId || setId === null)
      return res.status(404).json({ error: "NOT_FOUND" });

    // 권한 체크: set -> session -> user
    const own = await db.query(
      `SELECT s.id as sid, ws.user_id
       FROM workout_sets s
       JOIN workout_sessions ws ON ws.id=s.session_id
       WHERE s.id=$1`,
      [setId]
    );
    if (!own.rowCount || own.rows[0].user_id !== userId)
      return res.status(404).json({ error: "NOT_FOUND" });

    const f = req.body || {};
    const { rows } = await db.query(
      `UPDATE workout_sets SET
         weight_kg = COALESCE($1, weight_kg),
         reps      = COALESCE($2, reps),
         rpe       = COALESCE($3, rpe),
         completed = COALESCE($4, completed)
       WHERE id=$5
       RETURNING *`,
      [
        f.weight_kg ?? null,
        f.reps ?? null,
        f.rpe ?? null,
        f.completed ?? null,
        setId,
      ]
    );
    res.json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "INTERNAL_ERROR" });
  }
});

// 세션 취소(하드 삭제): in_progress 상태의 세션과 자식 레코드 전체 제거
router.post("/:id/cancel", async (req, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: "UNAUTHORIZED" });

  const sid = req.params.id;

  try {
    await db.query("BEGIN");

    // 소유/상태 확인
    const own = await db.query(
      `SELECT status FROM workout_sessions WHERE id=$1 AND user_id=$2`,
      [sid, userId]
    );
    if (!own.rowCount) {
      await db.query("ROLLBACK");
      return res.status(404).json({ error: "NOT_FOUND" });
    }
    if (own.rows[0].status !== "in_progress") {
      await db.query("ROLLBACK");
      return res.status(400).json({ error: "NOT_IN_PROGRESS" });
    }

    await db.query(`DELETE FROM workout_sets WHERE session_id=$1`, [sid]);
    await db.query(`DELETE FROM workout_exercises WHERE session_id=$1`, [sid]);
    await db.query(`DELETE FROM workout_sessions WHERE id=$1 AND user_id=$2`, [
      sid,
      userId,
    ]);

    await db.query("COMMIT");
    return res.json({ ok: true });
  } catch (e) {
    console.error(e);
    try {
      await db.query("ROLLBACK");
    } catch {}
    return res.status(500).json({ error: "INTERNAL_ERROR" });
  }
});

/** 단건 세션 조회 */
router.get("/:id", async (req, res) => {
  try {
    const userId = req.user?.id;
    const sid = asInt(req.params.id);
    if (!userId || sid === null)
      return res.status(404).json({ error: "NOT_FOUND" });

    const { rows } = await db.query(
      `SELECT * FROM workout_sessions WHERE id=$1 AND user_id=$2`,
      [sid, userId]
    );
    if (!rows.length) return res.status(404).json({ error: "NOT_FOUND" });

    const [exs, sets] = await Promise.all([
      db.query(
        `SELECT * FROM workout_exercises WHERE session_id=$1 ORDER BY ord, id`,
        [sid]
      ),
      db.query(
        `SELECT * FROM workout_sets WHERE session_id=$1 ORDER BY exercise_id, set_no`,
        [sid]
      ),
    ]);

    const byEx = exs.rows.map((ex) => ({
      ...ex,
      sets: sets.rows.filter((s) => s.exercise_id === ex.id),
    }));
    res.json({ session: rows[0], exercises: byEx });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "INTERNAL_ERROR" });
  }
});

/** 세션 제목/메모 수정 */
router.patch("/:id", async (req, res) => {
  try {
    const userId = req.user?.id;
    const sid = asInt(req.params.id);
    if (!userId || sid === null)
      return res.status(404).json({ error: "NOT_FOUND" });

    const { title, notes } = req.body || {};

    const own = await db.query(
      `SELECT id FROM workout_sessions WHERE id=$1 AND user_id=$2`,
      [sid, userId]
    );
    if (!own.rowCount) return res.status(404).json({ error: "NOT_FOUND" });

    const { rows } = await db.query(
      `UPDATE workout_sessions
       SET title = COALESCE($1, title),
           notes = COALESCE($2, notes)
       WHERE id=$3
       RETURNING id, title, notes, status`,
      [title ?? null, notes ?? null, sid]
    );
    res.json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "INTERNAL_ERROR" });
  }
});

/** 세션 완료 */
router.post("/:id/complete", async (req, res) => {
  try {
    const userId = req.user?.id;
    const sid = asInt(req.params.id);
    if (!userId || sid === null)
      return res.status(404).json({ error: "NOT_FOUND" });

    const { title } = req.body || {};
    const { rows } = await db.query(
      `UPDATE workout_sessions
       SET status='completed',
           completed_at=now(),
           title = COALESCE($1, title)
       WHERE id=$2 AND user_id=$3
       RETURNING id, status, title, completed_at`,
      [title ?? null, sid, userId]
    );
    if (!rows.length) return res.status(404).json({ error: "NOT_FOUND" });
    res.json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "INTERNAL_ERROR" });
  }
});

export default router;
