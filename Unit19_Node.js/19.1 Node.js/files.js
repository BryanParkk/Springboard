const fs = require("fs");

// reading
// fs.readFile("../docs/blog1.txt", (err, data) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(data.toString());
// });

// console.log("last line");

// writing
fs.writeFile("../docs/blog2.txt", "hello, world", () => {
  console.log("file was written");
});

// directories

// deleting
