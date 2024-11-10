//Technical Survey Project - part 2 - Exercise 8

//Given code
const friend = "BRUTUS";
const shiftValue = 3;
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

// Step 1
// function encryptLetter(letter, shiftValue) {
//     if (typeof(friend) !== 'string') {
//         console.log('error');
//     }
//     const encLetter = alphabet[alphabet.indexOf(letter.toLowerCase()) + shiftValue % alphabet.length];
//     return encLetter;
// }
// console.log(encryptLetter('a', shiftValue));

// Step 1
function encryptLetter(letter, shift) {
    const index = alphabet.indexOf(letter.toLowerCase());
    const newIndex = (index + shift) % alphabet.length;
    return alphabet[newIndex];
}
console.log('---------------------------------------');

// Step 2
// function encrtyptMessage(word, shiftValue) {
//     for(let sq of word) {
//         let encMsg = encryptLetter(sq, shiftValue);
//         console.log(encMsg);
//     }
// }
// console.log(encrtyptMessage(friend, shiftValue));

// Step 2
function encryptMessage(word, shift) {
    let encryptedMessage = "";
    for (let i = 0; i < word.length; i++) {
        encryptedMessage += encryptLetter(word[i], shift);
    }
    return encryptedMessage;
}
console.log('---------------------------------------');

// Step 3
function decryptLetter(letter, shift) {
    const index = alphabet.indexOf(letter.toLowerCase());
    const newIndex = (index - shift + alphabet.length) % alphabet.length;
    return alphabet[newIndex];
}

// Step 4
function decryptMessage(word, shift) {
    let decryptedMessage = "";
    for (let i = 0; i < word.length; i++) {
        decryptedMessage += decryptLetter(word[i], shift);
    }
    return decryptedMessage;
}
console.log('---------------------------------------');

// Result
console.log( encryptLetter('a', shiftValue) );
console.log( encryptMessage(friend, shiftValue) );
console.log( decryptLetter('d', shiftValue) );
console.log( decryptMessage(encryptMessage(friend, shiftValue), shiftValue) );