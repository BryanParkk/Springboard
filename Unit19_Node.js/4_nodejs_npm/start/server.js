const http = require("http");
const fs = require("fs");


// 1. install nodemoen globally
// 2. initialize a new package.json file using npm init
// 3. install lodash locally 
// 4. Use the lodash library to make a random number and print it to the terminal when the server starts
// 5. Use the lodash library to create a [greet()] function which will run once only
// 6. In the end you should be able to run your server using 'nodemon' and it should automatically restart with any changes


const server = http.createServer((req, res) => {

  
  res.setHeader("Content-Type", "text/html");
  let path = "./views/";

  switch(req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200; 
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about_me":
      res.statusCode = 301;
      res.setHeader("Location", "/about"); 
      res.end(); 
    default:
      path += "404.html";
      res.statusCode = 404;
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

