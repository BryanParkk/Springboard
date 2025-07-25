const express = require("express");
const morgan = require("morgan");

const app = express();

app.set("view engine", "ejs");

app.listen(3000);

app.use(morgan("dev"));

// // ✅ 미들웨어 수정
// app.use((req, res, next) => {
//   console.log("new request made:");
//   console.log("host:", req.hostname);
//   console.log("path:", req.path);
//   console.log("method:", req.method);
//   next();
// });

// app.use((req, res, next) => {
//   console.log("in the next middleware");
//   next();
// });

app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur1",
    },
    {
      title: "Mario finds stars",
      snippet: "Lorem ipsum dolor sit amet consectetur2",
    },
    {
      title: "How to defeat bowser",
      snippet: "Lorem ipsum dolor sit amet consectetur3",
    },
  ];
  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new Blog" });
});

// 404 핸들러
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
