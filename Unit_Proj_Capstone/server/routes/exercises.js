const express = require("express");
const router = express.Router();
const db = require("../db");

// GET /api/exercises
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM exercies ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching exercises:", err);
    res.status(500).json({ error: "Seerver error" });
  }
});

module.exports = router;
