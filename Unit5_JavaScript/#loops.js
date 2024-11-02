/////////////////////////////////////////////////////////////
// For loop
const animals = [ 'lions', 'cats', 'hippos', 'aligators', 'dogs'];

for (let a=0; a<animals.length; a++) {
    console.log(a, animals[a]);
}

console.log('-----------------------------------------------');
const students = [
    {
        name: 'park',
        score: 96
    },
    {
        name: 'eunji',
        score: 99
    },
    {
        name: 'kim',
        score: 92
    }
]

for(let i=0; i<students.length; i++) {
    console.log(i, students[i].name, students[i].score)
}

for(let i=0; i < students.length; i++) {
    let student = students[i];
    console.log(`${student.name} scored ${student.score}`)
}

const word = 'Stressed';
let reversedWord = ""
for(let i = word.length -1; i >= 0; i--) {
    reversedWord += word[i];
    console.log(reversedWord);
}

// Nested for loop
for (let i = 1; i <= 10; i++) {
    console.log('OUTER LOOP:', i);
    for (let j = 10; j >= 0; j-=2) {
        console.log('  INNER LOOP', j);
    }
}

let sumStudents=0;
let avgStudents=0;
for(let i=0; i<students.length; i++) {
    sumStudents += students[i].score;
} 
console.log(sumStudents/students.length);


/////////////////////////////////////////////////////////////
// While Loop : some condition in the loop

let j = 0;
while(j <= 5) {
    console.log(j);
    j++;
}

j=0;
let guess = Math.floor(Math.random() * 10);
let target = 0;
console.log(target, guess);

while(guess !== target) {
    target = Math.floor(Math.random() * 10);
    console.log(`${target} and ${guess}`);
}
console.log("Contraturation !");
console.log(`${target} and ${guess}`)


/////////////////////////////////////////////////////////////
// FOR OF loop
//       for (variable of iterable) {
//       statement
//       }

let subreddits = ['soccer', 'phoheads', 'cringe', 'books'];
for(let i = 0; i < subreddits.length; i++) {
    console.log(subreddits[i]);
}
console.log(`----------------------------`);
for(let sub of subreddits) {
    console.log(sub);
}
console.log(`----------------------------`);
for(let char of 'abcdefghijklmnop') {
    console.log(char.toUpperCase());
}
console.log(`----------------------------`);
const magicSquare = [
    [2, 7, 6],
    [9, 5, 1],
    [4, 3, 8]
];
for(let i=0; i<magicSquare.length; i++) {
    let row=magicSquare[i];
    sum=0;
    for(let j = 0; j < row.length; j++) {
        sum += row[j];
    }
    console.log(`${row} summed to ${sum}`)
}