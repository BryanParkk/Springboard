// server/routes/user.js
import express from "express";
import db from "../db/index.js";

const router = express.Router();

// 내 정보 가져오기
router.get("/", async (req, res) => {
  const userId = req.user?.id; // requireAuth가 세팅
  if (!userId) return res.status(401).json({ error: "UNAUTHORIZED" });
  const { rows } = await db.query(
    `
    SELECT id, email, name, role,
           current_weight_kg, current_height_cm, goal_weight_kg, goal_body_type,
           sex, TO_CHAR(birthday, 'YYYY-MM-DD') AS birthday,
           weight_unit, distance_unit, height_unit,
           theme_mode, created_at, updated_at
    FROM public.users WHERE id=$1
  `,
    [userId]
  );
  res.json(rows[0] || null);
});

// 내 정보 업데이트
router.put("/", async (req, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: "UNAUTHORIZED" });
  const f = req.body || {};
  const { rows } = await db.query(
    `
    UPDATE public.users SET
      name              = COALESCE($1, name),
      current_weight_kg = COALESCE($2, current_weight_kg),
      current_height_cm = COALESCE($3, current_height_cm),
      goal_weight_kg    = COALESCE($4, goal_weight_kg),
      goal_body_type    = COALESCE($5, goal_body_type),
      sex               = COALESCE($6, sex),
      birthday          = COALESCE($7, birthday),
      weight_unit       = COALESCE($8, weight_unit),
      distance_unit     = COALESCE($9, distance_unit),
      height_unit       = COALESCE($10, height_unit),
      theme_mode        = COALESCE($11, theme_mode)
    WHERE id=$12
    RETURNING *;
  `,
    [
      f.name,
      f.current_weight_kg,
      f.current_height_cm,
      f.goal_weight_kg,
      f.goal_body_type,
      f.sex,
      f.birthday,
      f.weight_unit,
      f.distance_unit,
      f.height_unit,
      f.theme_mode,
      userId,
    ]
  );
  res.json({ ok: true, user: rows[0] });
});

export default router;
