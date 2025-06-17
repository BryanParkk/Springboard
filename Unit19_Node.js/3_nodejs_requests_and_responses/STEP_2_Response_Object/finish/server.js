const http = require("http");


const server = http.createServer((req, res) => {

  // 1. Send plain text response
  // in this case we are sending plain text, noted by the "Content-Type" header
  // Uncomment it to see how the plain text response is sent 
  //
  // res.setHeader("Content-Type", "text/plain");
  // res.write("Hello Ninjas");
  // res.end();


  // 2. Send an HTML response
  // in this case we are sending HTML, noted by the "Content-Type" header
  // We are still sending text strings, but the browser will interpret it as HTML
  // Remove the comments to see it in action, make sure to comment OUT the code in Step 1!
  
  // res.setHeader("Content-Type", "text/html");
  // res.write("<!DOCTYPE html>")
  // res.write("<p>Hello There</p>");
  // res.write("<p>We are sending in some HTML</p>");
  // res.end();  


});
// This starts our server //
// make sure that this is in the global scope //
server.listen(3000, "localhost", () => {
  console.log("Listinening to requests on port: 3000");
});

