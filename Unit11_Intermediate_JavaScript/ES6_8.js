//map function
//examples
const numbers = [1, 2, 3, 4, 5];

const squaredNumbers = numbers.map((value, index, array) => {
  console.log(`now value: ${value}, index: ${index}, array: ${array}`);
  return value * value;
});

console.log(squaredNumbers);
