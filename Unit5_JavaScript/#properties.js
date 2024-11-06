
let hello = "      Hello, World!      ";

// thing.method()
console.log( hello.length );
console.log( Number.isInteger(hello) );
console.log( typeof(hello) );
console.log( hello.toUpperCase() );
console.log( hello.toLowerCase() );
console.log( hello.trim() );
console.log( hello.trim().toUpperCase() );

// thing.method(argument)
console.log( hello.indexOf('Hello') ); // not exist is representatio -1
console.log( "Hello World".slice(0,2) );
console.log( hello.replace('World','JavaScript') );

// ESCAPES
console.log( 'I\'m happy');
console.log( "I\"m happy");
console.log( 'I\'m\n Happy');
console.log( 'I\'m happy\\');

//Template literals
console.log( `${hello}` );  // Back-tick -> `
console.log( ` Hello, 'World'! `)

//NULL and undefined
let hello2 = null;
console.log( hello2 );
let hello3 = undefined;
console.log( hello3 );

//Math object
console.log( Math.PI );
console.log( Math.E );
console.log( Math.round(4.9) ); // 5
console.log( Math.abs(-456) ); // 456
console.log( Math.pow(2, 5) ); // 32
console.log( Math.floor(3.9999) ); // 3 
console.log( Math.random() );

// Random integer
const step1 = Math.random();
const step2 = step1 * 10;
const step3 = Math.floor(step2);
const step4 = step3 + 1;
Math.floor(Math.random() * 10) + 1;
console.log( Math.floor(Math.random() * 10) + 1);

// TYPE OF
console.log( typeof(hello) );
console.log( typeof(33) );
console.log( typeof(true) );
console.log( typeof(null) ); // Bug
console.log( typeof hello );

// ParseInt & ParseFloat
console.log( parseInt('24') );
console.log( parseFloat('24.987') );
console.log( parseInt('2.345') );
console.log( parseFloat('2') );
console.log( parseInt('Hello 3rd World') ); // NaN
console.log( parseInt('3rd Hello World') ); // 3

// Array related methods (ordered)
// push, pop, unshift, shift, concat, join, indexOf, Includes, reverse, splice, sort, slice, Nested Arrays
const arrayName1 = []; // Usually use const
const arrayName2 = [ 'ice', 'cheese', 'soda', 'serial'];
const arrayName3 = [ 43, 20, 10, 30, 63 ];
const arrayName4 = [ 'google', 23, 'naver', 60, 'DAUM', 51];
const arrayName5 = [
    [ 'apple', 'grape', 'orange' ],
    [ 'red', 'purple', 'pink' ]
]; // Nested Array
arrayName2[1] = 'cheddar cheese';
arrayName2[arrayName2.length] = 'Tomatoes';
arrayName2.push('Fish'); // last push
arrayName2.pop(); // last pop (delete)
arrayName2.unshift('pork', 'beef'); // first push
arrayName2.shift(); // first pop (delete)
arrayName2.concat(arrayName3);
const arrayALL = arrayName2.concat(arrayName3, arrayName4); // 2 to concat 3, 4
arrayName2.includes('pork', 2); // ('value', place) -> if that value is placed it results 'ture'
arrayName2.indexOf('pork');
arrayName2.reverse();
arrayName2.join(); // Doesn't effect original array
const sliceName = arrayName2.slice(0, 2); // (start, end -1) // Doesn't effect original array
arrayName2.splice(1, 0, 'Name'); // (start, how many, 'value')
arrayName2.sort() // sorting alphabetically
arrayName5[1][1];

// Objects (unordered) : collection of properties. Dictionary in Python.
const objectName1 = {
    name: 'bryan', age: 38, birth: '05/27/86', sex: 'Male', 10601: 'zip'
}
const year = 'age';
console.log(objectName1.name, objectName1['10601'], objectName1[year]);
objectName1['money'] = '$2,000,000';
objectName1.nationality = 'South Korea';
objectName1['age'] += 2;
objectName1.age++;
const objectName2 = {
    firstName : 'David', strengths: [ 'Music', 'Art'],
}
objectName2.strengths[1]; // call array in object
const arrayName6 = [ // Declare Object in Array
    {
        name: 'bryan'
    },
    {
        name: 'eunji'
    }
]
const objectName3 ={ // nested object and array
    name: "John", 
    age: 30, 
    hobbies: [
        "reading", "painting", "cooking"
    ], 
    address: { 
        street: "123 Main St", 
        city: "Exampleville" 
    }
}
 
