const fs = require("fs");
const axios = require("axios");

function cat(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading ${path}:\n  ${err}`);
      process.exit(1);
    }
    console.log(data);
  });
}

function webCat(url) {
  axios
    .get(url)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.error(`Error fetching ${url}:\n  ${err}`);
      process.exit(1);
    });
}

function isURL(path) {
  return path.startsWith("http://") || path.startsWith("https://");
}

const arg = process.argv[2];

if (!arg) {
  console.error("Usage: node step2.js <file-path or url>");
  process.exit(1);
}

if (isURL(arg)) {
  webCat(arg);
} else {
  cat(arg);
}
