// server/routes/routines.js
import express from "express";
import db from "../db/index.js";

const router = express.Router();

/** 루틴 목록 */
router.get("/", async (req, res) => {
  try {
    const userId = req.user?.id || null; // TODO: requireAuth 붙이면 필수로 변경
    const sqlBase = `
      SELECT
        id,
        title,
        COALESCE(items, '[]'::jsonb) AS items,              
        created_at,
        updated_at,
        jsonb_array_length(COALESCE(items, '[]'::jsonb)) AS exercise_count,
        COALESCE((
          SELECT SUM(COALESCE(jsonb_array_length(elem->'sets'), 0))
          FROM jsonb_array_elements(COALESCE(items, '[]'::jsonb)) AS elem
        ), 0) AS set_count
      FROM public.routines
    `;
    const where = userId ? ` WHERE user_id = $1` : ``;
    const order = ` ORDER BY COALESCE(updated_at, created_at) DESC`;

    const { rows } = await db.query(
      sqlBase + where + order,
      userId ? [userId] : []
    );
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "INTERNAL_ERROR" });
  }
});

/** 루틴 단건 조회 */
router.get("/:id", async (req, res) => {
  try {
    const { rows } = await db.query(
      `SELECT
         id, user_id, title,
         COALESCE(items, '[]'::jsonb) AS items, -- ✅ 널 방지
         created_at, updated_at
       FROM public.routines
       WHERE id=$1`,
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: "NOT_FOUND" });
    res.json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "INTERNAL_ERROR" });
  }
});

/** 루틴 생성 */
router.post("/", async (req, res) => {
  try {
    const userId = req.user?.id || null; // TODO: requireAuth 권장
    const { title, items } = req.body || {};
    if (!title || !Array.isArray(items)) {
      return res.status(400).json({ error: "MISSING_FIELDS" });
    }

    let itemsJson;
    try {
      itemsJson = JSON.stringify(items);
    } catch {
      return res.status(400).json({ error: "BAD_JSON" });
    }

    const { rows } = await db.query(
      `INSERT INTO public.routines (user_id, title, items)
       VALUES ($1, $2, $3::jsonb)
       RETURNING id, title, COALESCE(items,'[]'::jsonb) AS items, created_at, updated_at`,
      [userId, title, itemsJson]
    );
    res.status(201).json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "INTERNAL_ERROR" });
  }
});

/** 루틴 수정 */
router.put("/:id", async (req, res) => {
  try {
    const { title, items } = req.body || {};

    // items가 오면 반드시 배열이어야 함
    let itemsJson = null;
    if (items !== undefined) {
      if (items && !Array.isArray(items)) {
        return res.status(400).json({ error: "ITEMS_MUST_BE_ARRAY" });
      }
      try {
        itemsJson = JSON.stringify(items);
      } catch {
        return res.status(400).json({ error: "BAD_JSON" });
      }
    }

    const { rows } = await db.query(
      `UPDATE public.routines SET
         title = COALESCE($1, title),
         items = COALESCE($2::jsonb, items),
         updated_at = now()
       WHERE id=$3
       RETURNING id, title, COALESCE(items,'[]'::jsonb) AS items, created_at, updated_at`,
      [title ?? null, itemsJson, req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: "NOT_FOUND" });
    res.json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "INTERNAL_ERROR" });
  }
});

/** 루틴 삭제 */
router.delete("/:id", async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "UNAUTHORIZED" });

    const { rows } = await db.query(
      `DELETE FROM public.routines
       WHERE id=$1 AND user_id=$2
       RETURNING id`,
      [req.params.id, userId]
    );
    if (!rows.length) return res.status(404).json({ error: "NOT_FOUND" });
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "INTERNAL_ERROR" });
  }
});

export default router;
