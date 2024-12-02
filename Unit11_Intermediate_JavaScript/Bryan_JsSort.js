let numbers = [100, 60, 200, 1000];

// console.log( numbers.sort() );
console.log( numbers.sort((a,b) => a - b) );


let instructors = [
    {name: "Elie", favLang: "English"},
    {name: "Joel", favzLang: "Python"},
    {name: "Alissa", favLang: "JS"}
]

// console.log( instructors.sort() );
console.log( instructors.sort((a,b) => {
    if(a.name < b.name) return -1;
    if(a.name > b.name) return 1;
    return 0;
})
);

