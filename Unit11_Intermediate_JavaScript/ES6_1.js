// arrow functions
// array.map(function x) {
//     return x * 2
// }

function greet() {}

// const add = function (x, y) {
//   return x + y;
// };

const addd = (x, y) => {
  return x + y;
};

const subs = (x, y) => {
  return x - y;
};

// [1, 2, 3, 4].reduce(function(max, currNum) {
//    return Math.max(max, currNum)
// });

[1, 2, 3, 4].reduce((max, currNum) => {
  return Math.max(max, currNum);
});

// ******************************
// ARROW FUNCTION "SHORTCUTS"
// ******************************

[1, 2, 3, 4, 5].forEach((n) => {
  console.log(n * 10);
});

const greett = () => {
  console.log("hello");
};
