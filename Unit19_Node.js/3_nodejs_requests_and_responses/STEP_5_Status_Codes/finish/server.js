const http = require("http");
const fs = require("fs");


const server = http.createServer((req, res) => {

  
  res.setHeader("Content-Type", "text/html");
  let path = "./views/";

  switch(req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200; // Set a 200 OK status code 
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200; // Set a 200 OK status code
      break;
    default:
      path += "404.html";
      res.statusCode = 404; // Set a 404 Not Found status code
  }
  
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.write(data);
      res.end();
      // we don't have to set a status code here as it is set conditionally in the [switch] statement
    }
  });
 
});


// This starts our server //
server.listen(3000, "localhost", () => {
  console.log("Listinening to requests on port: 3000");
});

