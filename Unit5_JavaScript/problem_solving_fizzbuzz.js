// Problem solving - Practice

// FizzBuzz
// let n = Math.floor(Math.random() * 100); // 0 to 100 number
let n = 30;

if(n % 3 == 0) {
    console.log(`Fizz ${n}`);
}else if(n % 5 == 0) {
    console.log(`Buzz ${n}`);
}else if(n % 3 == 0 && n % 5 == 0) {
    console.log(`FizzBuzz ${n}`);
}else {
    console.log(n);
}


