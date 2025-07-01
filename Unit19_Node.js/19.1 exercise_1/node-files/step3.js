const fs = require("fs");
const axios = require("axios");

function cat(path, outFile) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading ${path}:\n  ${err}`);
      process.exit(1);
    }

    if (outFile) {
      writeToFile(outFile, data);
    } else {
      console.log(data);
    }
  });
}

function webCat(url, outFile) {
  axios
    .get(url)
    .then((res) => {
      if (outFile) {
        writeToFile(outFile, res.data);
      } else {
        console.log(res.data);
      }
    })
    .catch((err) => {
      console.error(`Error fetching ${url}:\n  ${err}`);
      process.exit(1);
    });
}

function writeToFile(filename, data) {
  fs.writeFile(filename, data, "utf8", (err) => {
    if (err) {
      console.error(`Couldn't write to ${filename}:\n  ${err}`);
      process.exit(1);
    }
  });
}

function isURL(path) {
  return path.startsWith("http://") || path.startsWith("https://");
}

// ==== 메인 로직 시작 ====

let outFile;
let input;

if (process.argv[2] === "--out") {
  outFile = process.argv[3];
  input = process.argv[4];
} else {
  input = process.argv[2];
}

if (!input) {
  console.error("Usage: node step3.js [--out output.txt] <file-or-url>");
  process.exit(1);
}

if (isURL(input)) {
  webCat(input, outFile);
} else {
  cat(input, outFile);
}
//
