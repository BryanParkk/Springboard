const express = require("express");
const { ObjectId } = require("mongodb");
const { connectToDb, getDb } = require("./db");

const app = express();
let db;

connectToDb((err) => {
  if (err) {
    console.error("❌ Failed to connect to MongoDB:", err);
    process.exit(1);
  }
  db = getDb();
  app.listen(3001, () => {
    console.log("✅ app listening on port 3001");
  });
});

// DB 준비 안 되었을 때 요청 차단(안전장치)
app.use((req, res, next) => {
  if (!db) return res.status(503).json({ error: "DB not ready" });
  next();
});

// GET /books
app.get("/books", async (req, res) => {
  try {
    const books = await db
      .collection("books")
      .find({})
      .sort({ author: 1 })
      .toArray(); // ★ 핵심
    res.status(200).json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch the documents" });
  }
});

// GET /books/:id
app.get("/books/:id", async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  try {
    const doc = await db.collection("books").findOne({ _id: new ObjectId(id) }); // ★ 핵심
    if (!doc) return res.status(404).json({ error: "Book not found" });
    res.status(200).json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch the document" });
  }
});

/// brew services start mongodb-community@8.0
