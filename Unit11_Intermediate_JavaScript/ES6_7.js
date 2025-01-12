//forEach

const colors = ["teal", "cyan", "peach", "purple"];

// colors.forEach(function (val, i) {
//   console.log(val.toUpperCase(), i);
// });

// const names = ["bryan", "eunji", "park", "kang"];

// names.forEach(function (val) {
//   console.log(val);
//   return names;
// });

function forEach(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i, arr);
  }
}

forEach(colors, function (color, i, arr) {
  console.log(color.toUpperCase(), "at index if: ", i, arr);
});

const numbers = [4, 3, 2, 1, 4, 2, 3, 45];
numbers.forEach((val) => console.log(val));
