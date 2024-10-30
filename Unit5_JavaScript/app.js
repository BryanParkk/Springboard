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
console.log(objectName1.name, objectName1['10601'], objectName1[year]); // various way to call
objectName1['money'] = '$2,000,000'; // add property
objectName1.nationality = 'South Korea'; // other way to add property
objectName1['age'] += 2; // modify age
objectName1.age = objectName1.age + 2; // other way to modify age 
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
