const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { createEvent } = require("@testing-library/react");

const app = express();

app.use(bodyParser.json());

// app.get("/", (req, res, next) => {
//   res.send("Hello World!");
// });
app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
        type RootQuery {
          events: [String!]!
            
        }
        type RootMutation {
          createEvent(name: String!): String!
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      events: (args) => {
        return ["Romantic Cooking", "Cooking", "Sailing", "All-Night Coding"];
      },
      createEvent: (args) => {
        const eventName = args.name;
        return eventName;
      },
    },
    graphiql: true,
  })
);

app.listen(3000);
