// Function

// Structure of Function
function functionName() {
    // here is the function body
  }

//start
console.log(`------------------------------------------`);
function greet(name, num1, num2) {
    console.log(`Hi, ${name}`);
    let num3 = num1 * num2;
    console.log(num3);
    return num3;
}
greet('anya', 5, 2);
console.log(`------------------------------------------`);

function rollDie() {
    let roll = Math.floor(Math.random() * 6) + 1;
    console.log(`Rolled: ${roll}`);
}
function throwDice(num) {
    for(let i = 0; i < num; i++) {
        rollDie();
    }
}
throwDice(10);
console.log(`------------------------------------------`);

//////////
// Fnction 2
add = (x, y) => {
    let temp = x * y;
    return temp;
}
console.log(add(5,9));
console.log(`------------------------------------------`);

// Function 3 (anonymous function)
((x, y) => {return x+y}) (2, 3);
console.log(`------------------------------------------`);
 




