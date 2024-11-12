//Technical Survey Project - part 2 - Exercise 9

const alphabet = "abcdefghijklmnopqrstuvwxyz";

function encryptLetter(letter, shift) {
  const index = alphabet.indexOf(letter.toLowerCase());
  const newIndex = (index + shift) % alphabet.length;
  return alphabet[newIndex];
}

function encrypt (message, shiftValue)
{
  let encryptedMessage = "";
  for (let i = 0; i < message.length; i++) {
      encryptedMessage += encryptLetter(message[i], shiftValue);
  }
  return encryptedMessage;
}
///////////////////////////////////////////////////////////////////////////////

function decryptLetter(letter, shift) {
  const index = alphabet.indexOf(letter.toLowerCase());
  const newIndex = (index - shift + alphabet.length) % alphabet.length;
  return alphabet[newIndex];
}

function decrypt (encryptedMessage, shiftValue)
{
  let decryptedMessage = "";
  for (let i = 0; i < encryptedMessage.length; i++) {
      decryptedMessage += decryptLetter(encryptedMessage[i], shiftValue);
  }
  return decryptedMessage;
}
///////////////////////////////////////////////////////////////////////////////

console.log( encrypt('GARDEN', 3) );
console.log( decrypt('jdughq', 3) );