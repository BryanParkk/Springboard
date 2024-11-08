// Problem solving - Practice

// Try 1 //

// let n = Math.floor(Math.random() * 100); // 0 to 100 number
// if(n % 3 == 0) {
//     if(n % 5 == 0) {
//     console.log(`FizzBuzz ${n}`);
//     }else 
//     console.log(`Fizz ${n}`);
// }else if(n % 5 == 0) {
//     console.log(`Buzz ${n}`);
// }else if(n % 3 == 0 && n % 5 == 0) {
//     console.log(`FizzBuzz ${n}`);
// }else {
//     console.log(n);
// }


// Try 2 //

const n = 100;

if (!Number.isInteger(n) || n < 1 || n >= 1000) {
    console.log.out("Erro100");
}

for(let i=1; i<=n; i++) {
    if(i % 3 == 0) {
        if(i % 5 == 0) {
        console.log(`FizzBuzz`);
        }else 
        console.log(`Fizz`);
    }else if(i % 5 == 0) {
        console.log(`Buzz`);
    }else {
        console.log(i);
    }
}

