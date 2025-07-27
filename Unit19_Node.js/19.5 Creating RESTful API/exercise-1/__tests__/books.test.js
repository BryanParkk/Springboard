const request = require("supertest");
const app = require("../app");

describe("PUT /books/:isbn", function () {
  test("valid update", async function () {
    const resp = await request(app).put("/books/0691161518").send({
      isbn: "0691161518",
      title: "Updated Title",
      amazon_url: "http://amazon.com/book",
      author: "Author Name",
      language: "English",
      pages: 300,
      publisher: "Pub",
      year: 2023,
    });
    expect(resp.statusCode).toBe(200);
    expect(resp.body.book.title).toBe("Updated Title");
  });

  test("invalid update - missing title", async function () {
    const resp = await request(app).put("/books/0691161518").send({
      isbn: "0691161518",
      amazon_url: "http://amazon.com/book",
      // title 빠짐
    });
    expect(resp.statusCode).toBe(400);
    expect(resp.body.error).toBeDefined();
  });
});
