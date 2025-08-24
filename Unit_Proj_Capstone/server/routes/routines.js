// server/routes/routines.js
import express from "express";
import db from "../db/index.js";

const router = express.Router();

// 목록
router.get("/", async (req, res) => {
  try {
    const userId = req.user?.id || null; // requireAuth 사용 권장
    const { rows } = await db.query(
      userId
        ? "SELECT id, title, created_at, updated_at FROM routines WHERE user_id=$1 ORDER BY updated_at DESC"
        : "SELECT id, title, created_at, updated_at FROM routines ORDER BY updated_at DESC",
      userId ? [userId] : []
    );
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "INTERNAL_ERROR" });
  }
});

// 단건 조회
router.get("/:id", async (req, res) => {
  try {
    const { rows } = await db.query(
      "SELECT id, user_id, title, items, created_at, updated_at FROM routines WHERE id=$1",
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: "NOT_FOUND" });
    res.json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "INTERNAL_ERROR" });
  }
});

// 생성
router.post("/", async (req, res) => {
  try {
    const userId = req.user?.id || null;
    const { title, items } = req.body || {};
    if (!title || !Array.isArray(items))
      return res.status(400).json({ error: "MISSING_FIELDS" });

    let itemsJson;
    try {
      itemsJson = JSON.stringify(items);
    } catch {
      return res.status(400).json({ error: "BAD_JSON" });
    }

    const { rows } = await db.query(
      "INSERT INTO routines (user_id, title, items) VALUES ($1,$2,$3::jsonb) RETURNING id, title, created_at, updated_at",
      [userId, title, itemsJson]
    );
    res.status(201).json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "INTERNAL_ERROR" });
  }
});

// 수정(옵션)
router.put("/:id", async (req, res) => {
  try {
    const { title, items } = req.body || {};

    // items가 넘어오면 json 문자열로 정규화(옵션)
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
      `UPDATE routines SET
       title = COALESCE($1, title),
        items = COALESCE($2::jsonb, items)
      WHERE id=$3
      RETURNING id, title, items, created_at, updated_at`,
      [title ?? null, itemsJson, req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: "NOT_FOUND" });
    res.json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "INTERNAL_ERROR" });
  }
});

// 삭제(옵션)
router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM routines WHERE id=$1", [req.params.id]);
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "INTERNAL_ERROR" });
  }
});

export default router;
