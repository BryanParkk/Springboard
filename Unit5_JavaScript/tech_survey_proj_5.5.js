//Technical Survey Project - part 2 - Exercise 5

//Given code
const guests = ['ANTONY', 'CICERO', 'CASSIUS', 'CLEOPATRA'];

//Step 1
guests.unshift('BRUTUS');

//Questsion 1
// You can check first element in Array guests.
// console.log(guests[0]);

//Step 2
guests.push('AUGUSTUS', 'LUCIA');

//Step 3
console.log(guests.indexOf('SPARTACUS'));
//var spartacusIndex = guests.indexOf('SPARTACUS');

//Question 2
const spartacusIndex = guests.indexOf('SPARTACUS');
console.log(spartacusIndex);
//the answer is '-1'

//Step 4
//guests.splice(3, 1);
const remove = guests.indexOf('CASSIUS');
guests.splice(remove, 1);

//Step 5
const specialGuests = guests.splice(0, 3);

//Step 6
const honoredGuests = guests.slice(0, 1); // Honored Guest list
const otherGuests = guests.slice(1); // Except honored guest
otherGuests.sort(); // sorting
const sortedGuests = honoredGuests.concat(otherGuests); // concate

//Result
console.log(honoredGuests);
console.log(otherGuests);
console.log(sortedGuests);