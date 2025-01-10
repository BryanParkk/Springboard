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

[1, 2, 3, 4, 5, 6].filter(function (num) {
  return num % 2 === 0;
});

[1, 2, 3, 4, 5, 6].filter((num) => num % 2 === 0);

const double = (n) => n * 2;
const doublee = (n) => {
  return n * 2;
};

[1, 2, 3, 4, 5, 6, 7, 8].map((n) => {
  if (n % 2 === 0) {
    return "even";
  }
  return "odd";
});

// [1, 2, 3, 4, 5, 6, 7, 8].map((n) =>
//     if (n % 2 === 0) {
//     "even";
//     }
//     "odd";
// );

[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (n % 2 === 0 ? "even" : "odd"));

//////
const dailyRainTotals = [
  [1.3, 0.35, 2.2],
  [1.7, 0.6, 0.1],
  [2.5, 0.9, 1.5],
];
// dailyRainTotals.map((hourlyRainTotals) => {
//   return hourlyRainTotals.reduce((sum, inchesOfRain) => {
//     return sum + inchesOfRain;
//   });
// });

dailyRainTotals.map((hourlyRainTotals) =>
  hourlyRainTotals.reduce((sum, inchesOfRain) => sum + inchesOfRain)
);

// ******************************
// ARROW FUNCTION "Gotchas"
// ******************************

const makeMath = (num) => ({
  square: num * num,
  double: num * 2,
});

const cat = {
  //Don't use arrow function in Object!
  name: "Bubs",
  meow: function () {
    return `${this.name} syas MEOW!!`;
  },
};
