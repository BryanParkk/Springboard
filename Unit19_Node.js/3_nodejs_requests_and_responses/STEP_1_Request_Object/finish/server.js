const http = require("http");


const server = http.createServer((req, res) => {

  console.log("The [req] object:\n");
  console.log(req);
  console.log("\n\n\n");

  console.log("The [req.headers] object:\n");
  console.log(req.headers);
  console.log("\n\n\n");

  console.log("The [req.url] string:\n");
  console.log(req.url);
  console.log("\n\n\n");

  console.log("The [req.method] string:\n");
  console.log(req.method);
  console.log("\n\n\n");

});
// This starts our server //
// make sure that this is in the global scope //
server.listen(3000, "localhost", () => {
  console.log("Listinening to requests on port: 3000");
});

