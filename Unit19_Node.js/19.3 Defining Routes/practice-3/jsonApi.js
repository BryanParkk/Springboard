const express = require("express");
const app = express();

const candies = [
  { id: 1, name: "Snickers" },
  { id: 2, name: "Skittles" },
];

app.get("/candies", (req, res) => {
  res.json(candies);
});

app.use((error, req, res, next) => {
  res.send("This is an error");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
