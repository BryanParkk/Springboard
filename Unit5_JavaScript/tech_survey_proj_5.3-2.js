
const friend = "BRUTUS";
const shiftValue = 3;


//Step 1
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

//Step 2
const firstLetter = friend[0];
const step2 = alphabet.indexOf(firstLetter.toLowerCase());


// Question 1
// index starts 0, not 1. B is second letter of alphabet, so answer is going to be 1.

//Step 3
const step3 = alphabet[step2+shiftValue];

// Question 2
// Modulo(%) operator can warp around.

//Step 4
const alphabetLength = alphabet.length;

//Step 5
const step5 = (step2+shiftValue)%alphabetLength;
const encFirstMsg = alphabet[step5];

//Step 6
const encMsg = 'EUXWXV';
const send = encMsg.slice(0, 3);