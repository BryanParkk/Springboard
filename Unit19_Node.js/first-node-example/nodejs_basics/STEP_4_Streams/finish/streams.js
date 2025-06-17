const fs = require("fs");

// Step 1.
// Read a large text file [blog3.txt] in chunks using [readStream] method from [fs] module 
//
const readStream = fs.createReadStream("./docs/blog3.txt");

readStream.on("data", (dataChunk) => { 
  console.log("---------- NEW CHUNK ----------");
  console.log(dataChunk);
});



// Step 2.
// Read a large text file [blog3.txt] in chunks using [readStream] method from [fs] module 
// Then, write that data to a new [blog4.txt] file using [writeStream] method from the [fs] module
// Uncomment the code below to run it, comment out Step 1
//
//
// const readStream = fs.createReadStream("./docs/blog3.txt");
// const writeStream = fs.createWriteStream("./docs/blog4.txt");
//
// readStream.on("data", (dataChunk) => {
//
//   console.log("---------- NEW CHUNK ----------");
//   console.log(dataChunk);
//
//   writeStream.write("\nNEW CHUNK\n", (err) => {
//     if (err) {
//       console.log(err);
//       process.exit(1);
//     }
//     console.log("---------- WRITING... ----------");
//   });
//
//   writeStream.write(dataChunk, (err) => {
//     if (err) {
//       console.log(err);
//       process.exit(1);
//     }
//     console.log("---------- WRITING THE DATA... ----------");
//   });
//
// });



// Step 3. Piping
// Piping is often a shortcut when reading and streaming files
// especially if we don't need to configure many settings 
// Uncomment the code below to run it, comment out Steps 2 and 3
//
// const readStream = fs.createReadStream("./docs/blog3.txt");
// const writeStream = fs.createWriteStream("./docs/blog5.txt");

// readStream.pipe(writeStream);
