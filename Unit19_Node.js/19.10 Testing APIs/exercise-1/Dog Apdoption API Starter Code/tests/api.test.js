// tests/api.test.js
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const request = require("supertest");
const { connectDB } = require("../db");

let app; // loaded after env is set

describe("Dog Adoption API", function () {
  this.timeout(20000);

  let mongo;
  let tokenA, tokenB; // users
  let myDogId;

  before(async () => {
    mongo = await MongoMemoryServer.create();
    process.env.MONGODB_URI = mongo.getUri();
    process.env.JWT_SECRET = "testsecret";

    app = require("../app");
    await connectDB();
  });

  after(async () => {
    await mongoose.disconnect();
    if (mongo) await mongo.stop();
  });

  it("registers users and logs in", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({ username: "alice", password: "pass123" })
      .expect(201);
    await request(app)
      .post("/api/auth/register")
      .send({ username: "bob", password: "pass123" })
      .expect(201);

    const resA = await request(app)
      .post("/api/auth/login")
      .send({ username: "alice", password: "pass123" })
      .expect(200);
    tokenA = resA.body.token;

    const resB = await request(app)
      .post("/api/auth/login")
      .send({ username: "bob", password: "pass123" })
      .expect(200);
    tokenB = resB.body.token;
  });

  it("allows an authenticated user to register a dog", async () => {
    const res = await request(app)
      .post("/api/dogs")
      .set("Authorization", `Bearer ${tokenA}`)
      .send({ name: "Buddy", description: "Friendly golden" })
      .expect(201);

    myDogId = res.body._id;
  });

  it("prevents owner from adopting their own dog", async () => {
    await request(app)
      .post(`/api/dogs/${myDogId}/adopt`)
      .set("Authorization", `Bearer ${tokenA}`)
      .send({ message: "Thanks!" })
      .expect(403);
  });

  it("allows another user to adopt the dog", async () => {
    const res = await request(app)
      .post(`/api/dogs/${myDogId}/adopt`)
      .set("Authorization", `Bearer ${tokenB}`)
      .send({ message: "Thank you for Buddy!" })
      .expect(200);

    // adopted flag
    if (res.body?.dog?.status !== "adopted")
      throw new Error("Dog should be adopted");
  });

  it("prevents re-adoption of the same dog", async () => {
    await request(app)
      .post(`/api/dogs/${myDogId}/adopt`)
      .set("Authorization", `Bearer ${tokenB}`)
      .send({ message: "again" })
      .expect(409);
  });

  it("prevents owner from removing an adopted dog", async () => {
    await request(app)
      .delete(`/api/dogs/${myDogId}`)
      .set("Authorization", `Bearer ${tokenA}`)
      .expect(409);
  });

  it("lists registered dogs with pagination and status filter", async () => {
    const res = await request(app)
      .get("/api/dogs/mine?status=adopted&page=1&limit=10")
      .set("Authorization", `Bearer ${tokenA}`)
      .expect(200);

    if (typeof res.body.total !== "number")
      throw new Error("Expected pagination payload");
  });

  it("lists my adopted dogs with pagination", async () => {
    const res = await request(app)
      .get("/api/dogs/adopted?page=1&limit=10")
      .set("Authorization", `Bearer ${tokenB}`)
      .expect(200);

    if (!Array.isArray(res.body.items)) throw new Error("Expected items array");
  });
});
