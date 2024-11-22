// Errors
// - Syntax error
// - Reference error
// = Type error

// Debugging
// - do googling them
// - googling, mentor, stack overflow

let grades = [90, 98, 76, 54, 66, 90, 81];
let sum = 0;
debugger;
for (let i = 0; i <= grades.length; i++) {
    sum += grades[i];
}
let avg = sum / grades.length;