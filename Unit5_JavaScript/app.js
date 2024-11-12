// array //
const arrayName2 = [ 'ice', 'cheese', 'soda', 'serial'];
const arrayName1 = [];
const arrayName3 = [ 43, 20, 10, 30, 63 ];
const arrayName4 = [ 'google', 23, 'naver', 60, 'DAUM', 51];
const arrayName5 = [
    [ 'apple', 'grape', 'orange' ],
    [ 'red', 'purple', 'pink' ]
]; // Nested Array

// object //
const bryan = {
    "first_name": "Byeongil",
    "last_name": "Park",
    "birth_date": "05/27/86",
    "gender": "Male",
    "addr": "New York"
};

const objectName1 = {
    name: 'bryan', age: 38, birth: '05/27/86', sex: 'Male', 10601: 'zip'
}
const year = 'age';
// console.log(objectName1.name, objectName1['10601'], objectName1[year]); // various way to call
objectName1['money'] = '$2,000,000'; // add property
objectName1.nationality = 'South Korea'; // other way to add property
objectName1['age'] += 2; // modify age
objectName1.age = objectName1.age + 2; // other way to modify age 


// Function //
function order(food) {
    return `I will have the ${food}, please`;
}
console.log(order("pizza"));
console.log(order("cake"));


let count = 0;
function counter() {
    let name = 'google';
    count++;
    return `${name} called ${count} times!`
}
count++;
console.log(counter());
console.log(counter());
console.log(counter());

//////////
// Fnction 2
add = (x, y) => {
    let temp = x * y;
    return temp;
}
console.log(add(5,9));
// Function 3 (anonymous function)
((x, y) => {return x+y}) (2, 3);


// Fuction 3 * There's no 'else if' or 'else' but it's working.
function isPurple(color) {
    if(color.toLowerCase() === 'purple') {
        return true;
    }
    return false;
}
console.log(isPurple('Purple'));

// Function 4
function isPurple2(color) {
    return color.toLowerCase() === 'purple';
}
console.log(isPurple('Purple'));