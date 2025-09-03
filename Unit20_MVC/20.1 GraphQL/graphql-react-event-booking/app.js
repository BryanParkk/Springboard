const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/user");
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

        type User {
          _id: ID!
          email: String!
          password: String
        }

        input EventInput {
          title: String!
          description: String!
          price: Float!
          date: String!
        }

        input UserInput {
          email: String!
          password: String!
        }

        type RootQuery {
          events: [Event!]!
            
        }
        type RootMutation {
          createEvent(eventInput: EventInput): Event
          createUser(userInput: UserInput): User
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
          creator: "68b610c8979ce6862906ac0a",
        });
        let createdEvent;
        return event
          .save()
          .then((result) => {
            createdEvent = { ...result._doc, _id: result._doc._id.toString() };
            return User.findById("68b610c8979ce6862906ac0a");
          })
          .then((user) => {
            if (!user) {
              throw new Error("User not found.");
            }
            user.createdEvents.push(event);
            return user.save();
          })
          .then((result) => {
            return createdEvent;
          })
          .catch((err) => {
            console.log(err);
            throw err;
          });
      },
      createUser: (args) => {
        const { userInput } = args;

        return User.findOne({ email: userInput.email })
          .then((user) => {
            if (user) {
              throw new Error("User exists already.");
            }
            return bcrypt.hash(userInput.password, 12);
          })
          .then((hashedPassword) => {
            const user = new User({
              email: userInput.email,
              password: hashedPassword,
            });
            return user.save();
          })
          .then((result) => {
            return { ...result._doc, password: null, _id: result.id };
          })
          .catch((err) => {
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
