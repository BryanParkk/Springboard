// server/routes/auth.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db/index.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body || {};
    if (!email || !password)
      return res.status(400).json({ error: "MISSING_FIELDS" });
    const lowered = email.toLowerCase().trim();
    const dup = await db.query("SELECT 1 FROM public.users WHERE email=$1", [
      lowered,
    ]);
    if (dup.rowCount) return res.status(409).json({ error: "EMAIL_TAKEN" });
    const hash = await bcrypt.hash(password, 10);
    const { rows } = await db.query(
      "INSERT INTO public.users (email, password_hash, name) VALUES ($1,$2,$3) RETURNING id,email,name,role",
      [lowered, hash, name || null]
    );
    res.status(201).json({ ok: true, user: rows[0] });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "INTERNAL_ERROR" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password)
      return res.status(400).json({ error: "MISSING_FIELDS" });
    const lowered = email.toLowerCase().trim();
    const { rows } = await db.query(
      "SELECT id,email,password_hash,name,role FROM public.users WHERE email=$1",
      [lowered]
    );
    if (!rows.length)
      return res.status(401).json({ error: "INVALID_CREDENTIALS" });
    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: "INVALID_CREDENTIALS" });
    const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "INTERNAL_ERROR" });
  }
});

router.get("/me", (req, res) => {
  try {
    const auth = req.headers.authorization || "";
    const [, token] = auth.split(" ");
    const payload = jwt.verify(token, JWT_SECRET);
    res.json({ ok: true, user: { id: payload.sub, email: payload.email } });
  } catch {
    res.status(401).json({ error: "UNAUTHORIZED" });
  }
});

export default router;
