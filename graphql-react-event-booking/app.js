const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();

app.use(bodyParser.json());

// app.get("/", (req, res, next) => {
//   res.send("Hello World!");
// });
app.use(
  "/graphql",
  graphqlHttp({
    schema: buildSchema(`
        schema {
            query: 
            mutation: 
        }
    `),
    rootValue: {},
    graphql: true,
  })
);

app.listen(3000);
