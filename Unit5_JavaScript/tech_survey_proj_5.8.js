//Technical Survey Project - part 2 - Exercise 8

//Given code
const friend = "BRUTUS";
const shiftValue = 3;
const alphabet = 'abcdefghijklmnopqrstuvwxyz';


// Step 1
function encryptLetter(letter, shiftValue) {
    if (typeof(friend) !== 'string') {
        console.log('error');
    }
    const encLetter = alphabet[alphabet.indexOf(letter.toLowerCase()) + shiftValue % alphabet.length];
    return encLetter;
}
console.log(encryptLetter('a', shiftValue));
console.log('---------------------------------------');

// Step 2
function encrtyptMessage(word, shiftValue) {
    for(let sq of word) {
        let encMsg = encryptLetter(sq, shiftValue);
        console.log(encMsg);
    }
}
console.log(encrtyptMessage(friend, shiftValue));
console.log('---------------------------------------');

// Step 3
