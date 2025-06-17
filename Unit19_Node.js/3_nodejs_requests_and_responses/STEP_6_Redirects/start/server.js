const http = require("http");


const server = http.createServer((req, res) => {

  // Redirects
  // Alter the existing logic and add a redirect
  // if a user goes to the '/about_me' route, they should be redirected to '/about' route
  // the user shoud also receive a 301 Redirected status code

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
    default:
      res.statusCode = 404;
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

