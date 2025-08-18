// const { MongoClient } = require("mongodb");

// let dbConnection;

// module.exports = {
//   connectToDb: (cb) => {
//     MongoClient.connect("mongodb://localhost:27017/bookstore")
//       .then((client) => {
//         dbConnection = client.db();
//         return cb();
//       })
//       .catch((err) => {
//         console.log(err);
//         return cb(err);
//       });
//   },
//   getDb: () => {
//     dbConnection;
//   },
// };
// db.js
const { MongoClient } = require("mongodb");

// 반드시 127.0.0.1 사용 (IPv6/localhost 이슈 예방)
const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const dbName = process.env.MONGODB_DB || "bookstore";

let _db;
let _client;

function connectToDb(cb) {
  _client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
  _client
    .connect()
    .then(() => {
      _db = _client.db(dbName);
      console.log(`✅ Mongo connected: ${uri}/${dbName}`);
      cb(); // <-- 성공 시에만 에러 없이 콜백
    })
    .catch((err) => {
      console.error("❌ Mongo connect error:", err);
      cb(err); // <-- 실패 시 에러 전달
    });
}

function getDb() {
  if (!_db) {
    throw new Error("DB has not been initialized yet");
  }
  return _db;
}

module.exports = { connectToDb, getDb };
