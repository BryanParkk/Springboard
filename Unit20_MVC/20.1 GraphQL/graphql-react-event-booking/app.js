const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");

const Event = require("./models/event");

const app = express();

const events = [];

app.use(bodyParser.json());

// app.get("/", (req, res, next) => {
//   res.send("Hello World!");
// });
app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
        type Event {
          _id: ID!
          title: String!
          description: String!
          price: Float!
          date: String!
        }

        input EventInput {
          title: String!
          description: String!
          price: Float!
          date: String!
        }

        type RootQuery {
          events: [Event!]!
            
        }
        type RootMutation {
          createEvent(eventInput: EventInput!): Event!
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      events: () => {
        return Event.find()
          .then((events) => {
            return events.map((event) => {
              return { ...event._doc, _id: event._doc._id.toString() };
            });
          })
          .catch((err) => {
            console.log(err);
          });
      },
      createEvent: (args) => {
        const { eventInput } = args;
        // const event = {
        //   _id: Math.random().toString(),
        //   title: eventInput.title,
        //   description: eventInput.description,
        //   price: +eventInput.price,
        //   date: eventInput.date,
        // };
        const event = new Event({
          title: eventInput.title,
          description: eventInput.description,
          price: eventInput.price,
          date: eventInput.date,
        });
        return event
          .save()
          .then((result) => {
            console.log(result);
            return { ...result._doc, _id: result._doc._id.toString() };
          })
          .catch((err) => {
            console.log(err);
            throw err;
          });
      },
    },
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@springboard.mtzjsej.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=SpringBoard`
  )
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
