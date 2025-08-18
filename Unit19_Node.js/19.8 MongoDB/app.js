const express = require("express");
const { ObjectId } = require("mongodb");
const { connectToDb, getDb } = require("./db");

// init app & middleware
const app = express();
app.use(express.json());

// db connection
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

app.post("/books", (req, res) => {
  const book = req.body;

  db.collection("books")
    .insertOne(book)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ err: "Could not create a new document" });
    });
});

app.delete("/books/:id", async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  try {
    const result = await db
      .collection("books")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Book not found" });
    }
    // 성공 — 바디 없이 204가 보통 깔끔
    return res.sendStatus(204);

    // 또는 200으로 결과를 보내고 싶다면:
    // return res.status(200).json({ deletedId: id, deletedCount: result.deletedCount });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Could not delete the document" });
  }
});

app.patch("/books/:id", async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  // 업데이트 허용 필드 화이트리스트
  const allowed = ["title", "author", "pages", "rating", "genres", "reviews"];
  const update = {};
  for (const k of allowed) {
    if (Object.prototype.hasOwnProperty.call(req.body, k)) {
      update[k] = req.body[k];
    }
  }
  if (Object.keys(update).length === 0) {
    return res.status(400).json({ error: "No updatable fields" });
  }

  try {
    const result = await db.collection("books").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: update },
      { returnDocument: "after" } // 새 문서 반환
    );

    if (!result.value) {
      return res.status(404).json({ error: "Book not found" });
    }
    return res.status(200).json(result.value);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Could not update the document" });
  }
});

/// brew services start mongodb-community@8.0
