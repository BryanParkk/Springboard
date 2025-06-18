const fs = require("fs");

////// reading
// fs.readFile("../docs/blog1.txt", (err, data) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(data.toString());
// });
// console.log("last line");

////// writing
// fs.writeFile("../docs/blog2.txt", "hello, world", () => {
//   console.log("file was written");
// });

////// directories
// if (!fs.existsSync("../docs/assets")) {
//   fs.mkdir("../docs/assets", (err) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log("folder created");
//   });
// } else {
//   fs.rmdir("../docs/assets", (err) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log("folder deleted");
//   });
// }

////// deleting
if (fs.existsSync("../docs/deleteme.txt")) {
  fs.unlink("../docs/deleteme.txt", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("file deleted");
  });
}
