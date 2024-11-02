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

