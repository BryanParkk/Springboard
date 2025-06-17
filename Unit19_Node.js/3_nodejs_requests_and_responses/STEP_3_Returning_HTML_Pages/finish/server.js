const http = require("http");
const fs = require("fs");


const server = http.createServer((req, res) => {

  // Read a file and send the HTML
  // In this case we are reading the <index.html> file in the ./views directory
  
  res.setHeader("Content-Type", "text/html");
  fs.readFile("./views/index.html", (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });   
 
});


// This starts our server //
server.listen(3000, "localhost", () => {
  console.log("Listinening to requests on port: 3000");
});

