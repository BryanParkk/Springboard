// rest, spread operators

// function max() {
//   console.log(arguments);
// }

function sum() {
  //   console.log(Array.from(arguments));
  const args = Array.from(arguments);
  return args.reduce((sum, val) => {
    return sum + val;
  });
}

const max = () => {
  console.log(arguments);
};

const maxx = function () {
  const args = Array.from(arguments);
  return args.reduce((max, currVal) => {
    return currVal > max ? currVal : max;
  });
};
