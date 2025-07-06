const express = require("express");
const app = express();
const items = require("./fakeDb");

app.use(express.json()); // body-parser

// GET /items
app.get("/items", (req, res) => {
  return res.json(items);
});

// POST /items
app.post("/items", (req, res) => {
  const { name, price } = req.body;
  if (!name || price === undefined) {
    return res.status(400).json({ error: "Name and price are required" });
  }
  const newItem = { name, price };
  items.push(newItem);
  return res.status(201).json({ added: newItem });
});

// GET /items/:name
app.get("/items/:name", (req, res) => {
  const found = items.find((item) => item.name === req.params.name);
  if (!found) return res.status(404).json({ error: "Item not found" });
  return res.json(found);
});

// PATCH /items/:name
app.patch("/items/:name", (req, res) => {
  const item = items.find((item) => item.name === req.params.name);
  if (!item) return res.status(404).json({ error: "Item not found" });

  const { name, price } = req.body;
  if (name !== undefined) item.name = name;
  if (price !== undefined) item.price = price;

  return res.json({ updated: item });
});

// DELETE /items/:name
app.delete("/items/:name", (req, res) => {
  const idx = items.findIndex((item) => item.name === req.params.name);
  if (idx === -1) return res.status(404).json({ error: "Item not found" });

  items.splice(idx, 1);
  return res.json({ message: "Deleted" });
});

module.exports = app;
