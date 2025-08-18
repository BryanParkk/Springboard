// books.js
use("bookstore");

db.books.insertMany([
  {
    title: "The Way of Kings",
    author: "Brandon Sanderson",
    rating: 9,
    pages: 400,
    genres: ["fantasy"],
    reviews: [
      { name: "Yoshi", body: "Great book!!" },
      { name: "Mario", body: "so so" },
    ],
  },
  {
    title: "1984",
    author: "George Orwell",
    pages: 300,
    rating: 7,
    genres: ["sci-fi", "dystopian", "fantasy", "1", "2"],
    reviews: [
      { name: "Peach", body: "not my cup of tea" },
      { name: "Mario", body: "meh" },
    ],
  },
  {
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    pages: 500,
    rating: 10,
    genres: ["fantasy"],
    reviews: [{ name: "Peach", body: "one of my favorites" }],
  },
  {
    title: "The Color of Magic",
    author: "Terry Pratchett",
    pages: 360,
    rating: 8,
    genres: ["fantasy", "magic"],
    reviews: [
      { name: "Luigi", body: "it was ok" },
      { name: "Bowser", body: "really good book" },
    ],
  },
  {
    title: "The Light Fantastic",
    author: "Terry Pratchett",
    pages: 250,
    rating: 7,
    genres: ["fantasy", "magic"],
    reviews: [
      { name: "Luigi", body: "it was pretty good" },
      { name: "Bowser", body: "loved it!!" },
    ],
  },
]);
