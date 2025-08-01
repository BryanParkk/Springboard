const express = require("express");
const jsonschema = require("jsonschema"); // 추가 add
const Book = require("../models/book");
const bookCreateSchema = require("../schemas/bookCreate.json"); // 추가 add
const bookUpdateSchema = require("../schemas/bookUpdate.json"); // 추가 add

const router = new express.Router();

/** GET / => {books: [book, ...]}  */
router.get("/", async function (req, res, next) {
  try {
    const books = await Book.findAll(req.query);
    return res.json({ books });
  } catch (err) {
    return next(err);
  }
});

/** GET /[id]  => {book: book} */
router.get("/:id", async function (req, res, next) {
  try {
    const book = await Book.findOne(req.params.id);
    return res.json({ book });
  } catch (err) {
    return next(err);
  }
});

/** POST /   bookData => {book: newBook}  */
router.post("/", async function (req, res, next) {
  try {
    // ✅ 유효성 검사 추가
    const result = jsonschema.validate(req.body, bookCreateSchema);
    if (!result.valid) {
      const errors = result.errors.map((e) => e.stack);
      return res.status(400).json({ error: errors });
    }

    const book = await Book.create(req.body);
    return res.status(201).json({ book });
  } catch (err) {
    return next(err);
  }
});

/** PUT /[isbn]   bookData => {book: updatedBook}  */
router.put("/:isbn", async function (req, res, next) {
  try {
    // 유효성 검사 추가 add validation
    const result = jsonschema.validate(req.body, bookUpdateSchema);
    if (!result.valid) {
      const errors = result.errors.map((e) => e.stack);
      return res.status(400).json({ error: errors });
    }

    const book = await Book.update(req.params.isbn, req.body);
    return res.json({ book });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[isbn]   => {message: "Book deleted"} */
router.delete("/:isbn", async function (req, res, next) {
  try {
    await Book.remove(req.params.isbn);
    return res.json({ message: "Book deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
