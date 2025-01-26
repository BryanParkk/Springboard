// const myMap = new Map();
// myMap.set(7, "seven");
// myMap.set("seven", "seven string");

// const empty = [];
// myMap.set(empty, "empty array");

// console.log(myMap.get(7));

const add = (x, y) => x + y;
const multi = (x, y) => x * y;

const funcCalls = new Map();
funcCalls.set(add, 0);
funcCalls.set(multi, 0);

funcCalls.set(add, 1);
funcCalls.set(multi, 9);

//
const bandData = [
  [3, "3 doors down"],
  ["three", "three big dogs"],
];
const bandMap = new Map(bandData);

//
bandMap.set(102, "blind").set("twenty", "cool guy");

//
bandMap.forEach((val, key) => {
  console.log(key + "=>" + val);
});

//
for (let [key, value] of bandMap) {
  console.log(key, "=>", value);
}
