/* Task 1: Declare a Destination Variable */
let destination = "Ancient Egypt"; // Declare 'destination' with 'let'
console.log(destination); // Output: Ancient Egypt

/* Task 2: Change the Destination */
destination = "Medieval Europe"; // Change the value of 'destination'
console.log(destination); // Output: Medieval Europe

/* Task 3: Declare a Constant Travel Date */
const travelDate = "2024-03-15"; // Declare 'travelDate' with 'const'
console.log(travelDate); // Output: 2024-03-15

// Attempting to change 'travelDate' will throw an error
// travelDate = "2024-04-01"; // Uncommenting this line will cause a TypeError: Assignment to constant variable

/*
 * Observations:
 * - Variables declared with `const` cannot be reassigned after their initial value.
 * - Trying to change `travelDate` results in a TypeError, preventing accidental modifications.
 */

/* Task 4: Experiment with Variable Hoisting */
console.log(timeMachineModel); // Output: undefined (due to hoisting)
var timeMachineModel = "T-800"; // Declare 'timeMachineModel' with 'var'
console.log(timeMachineModel); // Output: T-800

/*
 * Observations:
 * - Variables declared with `var` are hoisted, meaning their declarations are moved to the top of the scope.
 * - However, the value assignment remains in place, so accessing the variable before assignment returns `undefined`.
 * - This behavior can lead to bugs if not handled carefully.
 */
