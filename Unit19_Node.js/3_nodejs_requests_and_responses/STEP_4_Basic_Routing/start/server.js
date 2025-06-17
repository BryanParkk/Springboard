const http = require("http");


const server = http.createServer((req, res) => {

  // Basic Routing
  // Set proper headers using the [res] object
  // create a dynamic path by reading from [req.url] object with a switch statemnt
  // Use the [fs] module and the [readFile] method to read from the [./views] directory and send the proper HTML file

});




// This starts our server //
server.listen(3000, "localhost", () => {
  console.log("Listinening to requests on port: 3000");
});

