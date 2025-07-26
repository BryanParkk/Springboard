const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

//
const app = express();

// connect to MongoDB
const dbURI =
  "mongodb+srv://bryan:	1234%21%40%23%24@springboard.mtzjsej.mongodb.net/?retryWrites=true&w=majority&appName=SpringBoard";
mongoose
  .connect(dbURI)
  .then(() => app.listen(3000))
  .catch((err) => console.error(err));

//
app.set("view engine", "ejs");

//
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

//
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

//
app.post("/blogs", (req, res) => {
  req.body;
});

//
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "new blog2",
    snippet: "about my new blog",
    body: "more about my new blog",
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//
app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//
app.get("/single-blog", (req, res) => {
  Blog.findById("6883d5a4fda176fea7e8b24d");
});

//
app.get("/add-blog", (req, res) => {
  const newBlog = new blog({
    title: "new blog",
    snippet: "'all my new blog",
    body: "more about my new blog",
  });
});
//

//
app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new Blog" });
});

// 404 핸들러
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
