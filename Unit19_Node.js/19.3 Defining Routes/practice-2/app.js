"use strict";
const express = require("express");
const app = express();
const port = process.env.port || 4444;
// const things = require("./routes/things");

app.use(express.json());

app.get("/", (req, res) => {
  //handle root
  res.send("hello root");
});

app.listen(port, (err) => {
  if (err) {
    return console.log("ERROR", err);
  }
  console.log(`Listening on port ${port}`);
});

//
const greetings = {
  en: "hello",
  fr: "bonjour",
  ko: "안녕하세요.",
  ja: "konnichiwa",
};

app.get("/greet/:language", (req, res) => {
  const lang = req.params.language;
  const greeting = greetings[lang];
  res.send(greeting);
});
//
