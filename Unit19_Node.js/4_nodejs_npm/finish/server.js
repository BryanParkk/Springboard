const http = require("http");
const fs = require("fs");
const _ = require("lodash");

// note that the fnished code should have
// 1. a [node_modules] directory
// 2  a {package.json} file
// 3  a {package.lock.json} file

const server = http.createServer((req, res) => {


  // lodash random num generator
  const num = _.random(0, 100);
  console.log(num);

  // define [greet()] and run once 
  const greet = _.once(() => {
    console.log("Hello");
  });
  
  greet(); // will run //
  greet(); // will not run //

  // remmber to make a request in your browser to see it in action //

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
      break;
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

