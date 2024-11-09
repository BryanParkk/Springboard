//Technical Survey Project - part 2 - Exercise 8

//Given code
const friend = "BRUTUS";
const shiftValue = 3;
const alphabet = 'abcdefghijklmnopqrstuvwxyz';


// Step 1
function encryptLetter(letter, shiftValue) {
    const encLetter = alphabet[alphabet.indexOf(letter.toLowerCase()) + shiftValue % alphabet.length];
    return encLetter;
}

// console.log(encryptLetter('A', shiftValue));


// Step 2
function encrtyptMessage(word, shiftValue) {
    for(let i; i < word.length; i++) {
        let encMsg = encryptLetter(word, shiftValue);
    }
    return console.log (encMsg);
}

console.log(encrtyptMessage('ABCD', shiftValue)); 