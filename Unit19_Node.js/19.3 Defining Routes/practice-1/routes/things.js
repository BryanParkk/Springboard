"use strict";
const express = require("express");
let router = express.Router();

router.use(function (req, res, next) {
  console.log(req.url, "@", Date.now());
  next();
});

router
  .route("/cars")
  .get((req, res) => {
    res.send("hi get /things/cars");
  })
  .post((req, res) => {
    res.send("hi post /things/cars");
  });

router
  .route("/cars/:carid")
  .get((req, res) => {
    res.send("hi get /things/cars" + req.params.carid);
  })
  .put((req, res) => {
    res.send("hi put /things/cars" + req.params.carid);
  });

const greetings = {
  en: "hello",
  fr: "bonjour",
  ko: "안녕하세요.",
  ja: "konnichiwa",
};

// router.route("/greet/:language").get((req, res) => {
//   const lang = req.params.language;
//   const greeting = greetings[lang];
//   res.send(greeting);
// });

router.get("/greet/:language", (req, res) => {
  const lang = req.params.language;
  const greeting = greetings[lang];
  res.send(greeting);
});

module.exports = router;
