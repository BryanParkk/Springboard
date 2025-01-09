function holler() {
  console.log("HEY YOU!");
}

const whisper = function () {
  console.log("pssssst I have a secret!");
};

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

const mathFuncs = [add, subtract, multiply, divide];

setTimeout(whisper, 4000);
