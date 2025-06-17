// we need the [http] module which is part of [nodejs]
const http = require("http");


// the http module in itself has a [createServer] method
// here we are calling this method and RETURNIN a 'server' instance 
// but it is not running or doing anything yet

const server = http.createServer((req, res) => {
  console.log("request made");
});

// now we tell the server to 'listen' for any requests //
const PORT = 3000;
server.listen(PORT, '127.0.0.1', () => {
  console.log(`listening for requests on port ${PORT}`);
}); 

// Experiment here //
// 1. Try removing the 'localhost' function argument
// 2. Try passing 'anotherhost' instead of 'localhost'
// 4. What if you pass in '127.0.0.1' instad of 'localhost' (remember the quotes)
// 5. What if you assign another PORT, say 8000 ?
// 6. What if you set PORT = 25 or PORT = 587 ?