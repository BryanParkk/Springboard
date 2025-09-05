// db.js
const mongoose = require("mongoose");

async function connectDB(uri) {
  const mongoUri = uri || process.env.MONGODB_URI;
  if (!mongoUri) throw new Error("MONGODB_URI not set");

  mongoose.set("strictQuery", true);
  await mongoose.connect(mongoUri, {
    autoIndex: true,
  });
  return mongoose.connection;
}

module.exports = { connectDB };
