const http = require("http");
const fs = require("fs");


const server = http.createServer((req, res) => {

  // The [switch] statemnt reads the [req.url] and conditionally makes a path
  // i.e if [req.url] = '/about' the end 'path' is './views/about.html'
  // then [fs.readFile] sends the proper file
  
  res.setHeader("Content-Type", "text/html");
  let path = "./views/";

  switch(req.url) {
    case "/":
      path += "index.html";
      break;
    case "/about":
      path += "about.html";
      break;
    default:
      path += "404.html";
  }
  
  fs.readFile(path, (err, data) => {
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

