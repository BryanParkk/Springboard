// rest operator
// function doSomething(...asdf)

//
function sum(...nums) {
  return nums.reduce((sum, n) => sum + n);
}

const sumAll = (...values) => {
  return values.reduce((sum, n) => sum + n);
};
