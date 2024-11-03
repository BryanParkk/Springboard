//Technical Survey Project - part 2 - Exercise 7

//Given code
const friend = "BRUTUS";
const shiftValue = 3;

//Step 1
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

//Step 2

let encName = "";

for(let i = 0; i < friend.length; i++) {
    const curFriend = friend[i];
    const curAlphabet = alphabet.indexOf(curFriend.toLowerCase());
    const newAlphabet = (curAlphabet + 3) % alphabet.length;
    console.log(encName += alphabet[newAlphabet].toUpperCase());
}
