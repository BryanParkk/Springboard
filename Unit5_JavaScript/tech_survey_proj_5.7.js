//Technical Survey Project - part 2 - Exercise 7

//Given code
const friend = "BRUTUS";
const shiftValue = 3;

//Step 1
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

//Step 2
var encName = "";
for(let i = 0; i < friend.length; i++) {
    const curChar = friend[i];
    const curAlphabet = alphabet.indexOf(curChar.toLowerCase);
    const newAlphabet = (curAlphabet + shiftValue) % alphabet.length;
    encName += alphabet[newAlphabet].toUpperCase();
}
console.log(encName);



// let encryptedName = "";

// for (let i = 0; i < friend.length; i++)
// {
//   const currentLetter = friend[i];
//   const currentIndex = alphabet.indexOf(currentLetter.toLowerCase());
//   const newIndex = (currentIndex + shiftValue) % alphabet.length;
//   encryptedName += alphabet[newIndex].toUpperCase();
// }

// console.log(encryptedName);


// console.log(uppderAlphabet[0]);
// console.log(friend[i])