process.env.NODE_ENV = "test";

const Product = require("../models/product");
const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("../server");

chai.use(chaiHttp);

before((done) => {
  Product.deleteMany({}, function (err) {});
  done();
});

after((done) => {
  //   Product.deleteMany({}, function (err) {});
  done();
});

describe("/First Test Collection", () => {
  it("test default API welcome route", (done) => {
    chai
      .request(server)
      .get("/api/welcome")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        console.log(res.body.message);
        // res.body.should.be.a("array");
        const actualVal = res.body.message;
        expect(actualVal).to.be.equal("Welcome to the MEN-REST-API");
        done();
      });
  });

  it("should POST a valid product", (done) => {
    let product = {
      name: "Test Product",
      description: "Test Product Description",
      price: 100,
      inStock: true,
    };
    chai
      .request(server)
      .post("/api/products")
      .send(product)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it("should verify that we have 1 products in the DB", (done) => {
    chai
      .request(server)
      .get("/api/products")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(1);
        done();
      });
  });

  it("should test two values...", () => {
    //actual test content in here
    let expectedVal = 10;
    let actualVal = 10;

    expect(actualVal).to.be.equal(expectedVal);
  });
});
