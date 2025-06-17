const http = require("http");


const server = http.createServer((req, res) => {

  // Use the [fs] module to read the [index.html] file in the [./views] directory
  // set proper headers with the [res] object and send the HTML file to the client

});



server.listen(3000, "localhost", () => {
  console.log("Listinening to requests on port: 3000");
});

