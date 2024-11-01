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