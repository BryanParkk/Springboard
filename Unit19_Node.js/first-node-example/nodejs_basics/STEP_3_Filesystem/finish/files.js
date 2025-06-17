const fs = require("fs");

// Reading a file //
// 1. Reading a file
//
fs.readFile("./docs/blog1.txt", (err, data) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(data.toString());
});
console.log("This runs immediately");
console.log("---------------------");



// Writing files //
// 2. Overwriting a file
// Do note! The default [fs.writeFile()] functionality is to overwrite the data! 


const content = "Hello World. This will replace the text in [blog1.txt] file!";
fs.writeFile('./docs/blog1.txt', content, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log("File [blog1.txt] was overwrtitten");
});



// 3. Writing a new file
//

const newContent = "Hello World. this is new content to create the [blog2.txt] file!";
fs.writeFile('./docs/blog2.txt', newContent, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log("File [blog2.txt] was created");
});



// 4. Directories 
// Making and removing directories
//
if (!fs.existsSync("./assets")) {
  fs.mkdir("./assets", (err) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log("Created directory [./assets]");
  });
} else {
  console.log("The directory [./assets] already exists");
  console.log("Removing the directory");
  fs.rmdir("./assets", (err) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log("Directory [./assets] removed");
  });
}

