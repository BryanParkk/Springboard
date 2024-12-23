/* Task 1: No Parameters: Activate Hyperdrive */
// TODO: Write an arrow function named `activateHyperdrive` with no parameters that prints `"Hyperdrive activated!"` to the console. Call `activateHyperdrive` to test it.
const activateHyperdrive = () => {
  console.log("Hyperdrive activated!");
};
activateHyperdrive(); // Call the function to test

/* Task 2: Implicit Return: Scan for Lifeforms */
// TODO: Create an arrow function named `scanForLife` that implicitly returns `"No lifeforms detected"` without using curly braces. Print the result of calling `scanForLife`.
const scanForLife = () => "No lifeforms detected";
console.log(scanForLife()); // Prints the returned value

/* Task 3: Implicit Return with Objects: Log Coordinates */
// TODO: Write an arrow function named `currentCoordinates` that returns an object with properties `x`, `y`, and `z`, representing coordinates in space. Use implicit return. Print the returned object from `currentCoordinates`.
const currentCoordinates = () => ({ x: 10, y: 20, z: 30 });
console.log(currentCoordinates()); // Prints the returned object { x: 10, y: 20, z: 30 }

/* Task 4: Understanding `this`: Message from Home Base */
// TODO: Inside an object named `spacecraft`, create a method named `receiveMessage` using arrow function syntax.
// This method should log `"Message received: "` followed by a message it receives as a parameter.
// Directly call `receiveMessage` within `spacecraft` and observe.
// Observe and explain the behavior of `this` in this context as a comment.

const spacecraft = {
  name: "Galactic Explorer",
  receiveMessage: (message) => {
    console.log(`Message received: ${message}`);
    console.log(`Inside receiveMessage, this.name is: ${this.name}`);
  },
};

spacecraft.receiveMessage("Welcome back to base!"); // Observe behavior

/*
 * Observations:
 * In arrow functions, `this` is lexically bound, meaning it refers to the context where the function was defined.
 * In this case, `this` does not refer to the `spacecraft` object but to the surrounding context, which might be `undefined` or the global object in non-strict mode.
 * This makes arrow functions unsuitable for methods where we expect `this` to refer to the enclosing object.
 */
