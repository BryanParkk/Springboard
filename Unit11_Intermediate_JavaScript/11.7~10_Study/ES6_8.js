//map function
//examples
// const numbers = [1, 2, 3, 4, 5];

// const squaredNumbers = numbers.map((value, index, array) => {
//   console.log(`now value: ${value}, index: ${index}, array: ${array}`);
//   return value * value;
// });

// console.log(squaredNumbers);

//
const numbers = [23, 4, 25, 64, 23, -12];
const negatives = numbers.map(function (num) {
  return num * -1;
});

const doubles = numbers.map(function (num) {
  console.log(num * 2);
});

const todos = [
  {
    id: 1,
    text: "walk with dog",
    priority: "high",
  },
  {
    id: 2,
    text: "eating with friend",
    priority: "medium",
  },
  {
    id: 3,
    text: "sleep in the bed",
    priority: "very high",
  },
  {
    id: 4,
    text: "talk with wife",
    priority: "low",
  },
];

//
const todoText = todos.map(function (todo) {
  return todo.text;
});

//
const links = Array.from(document.querySelectorAll("a"));
const urls = links.map(function (a) {
  return a.href;
});

//
// function myMap(arr, callback) {
//   const mappedArray = [];
//   for (let i = 0; i < arr.length; i++) {
//     const val = callback(arr[i], i, arr);
//     mappedArray.push(val);
//   }
//   return mappedArray;
// }

// const priorityMap = myMap(todos, function (todo) {
//   return todo.priority;
// });

// const repeatedStrings = myMap(["a", "b", "c", "d", "e"], function (str, idx) {
//   return str.repeat(idx);
// });
