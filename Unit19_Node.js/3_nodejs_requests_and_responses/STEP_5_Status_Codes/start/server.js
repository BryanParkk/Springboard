const http = require("http");


const server = http.createServer((req, res) => {

  // Status Codes
  // Alter the existing logic and send the proper status codes
  // 200 if the HTML file IS found 
  // 404 if the HTML files IS NOT found
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

