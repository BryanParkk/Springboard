const express = require("express");

const app = express();

function middleware1(req, res, next) {
  console.log("I am a middleware 1");

  const errObj = new Error("I am an error");

  next(errObj);
}

function errorHandler(err, req, res, next) {
  if (err) {
    res.send("<h1>There was an error</h1>");
  }
}
//
app.use(middleware1);
app.use(errorHandler);

function standardExpressCallback(req, res, next) {
  console.log("I am standardExpressCallback function");
  res.send("<h1>Hello World</h1>");
}
app.get("/", standardExpressCallback);

app.listen(3000);
