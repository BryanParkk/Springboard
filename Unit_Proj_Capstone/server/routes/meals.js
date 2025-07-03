import express from "express";
import db from "../db/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM meals ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching meals:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
