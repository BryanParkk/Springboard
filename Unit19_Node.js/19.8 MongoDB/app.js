const express = require("express");

// init app & middleware
const app = express();

app.listen(3001, () => {
  console.log("app listening on port 3001");
});

// routes
app.get("/books", (req, res) => {
  res.json({ msg: "Welcome to the API" });
});
