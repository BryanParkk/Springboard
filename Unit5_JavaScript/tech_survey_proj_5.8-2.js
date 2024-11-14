//Technical Survey Project - part 2 - Exercise 9

/// Encrypt ////////////////////////////////////////////////////////////////////////////
const alphabet = "abcdefghijklmnopqrstuvwxyz";

function encryptLetter(letter, shift) {
  const index = alphabet.indexOf(letter.toLowerCase());
  if (index === -1) return letter; // if it's not alphabet, just return it
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
/// Decrypt ////////////////////////////////////////////////////////////////////////////
function decryptLetter(letter, shift) {
  const index = alphabet.indexOf(letter.toLowerCase());
  if (index === -1) return letter; // if it's not alphabet, just return it
  const newIndex = (index - (shift % alphabet.length) + alphabet.length) % alphabet.length; // index recalculate
  return alphabet[newIndex];
}

function decrypt(encryptedMessage, shiftValue) {
  let decryptedMessage = "";
  for (let i = 0; i < encryptedMessage.length; i++) {
    decryptedMessage += decryptLetter(encryptedMessage[i], shiftValue);
  }
  return decryptedMessage;
}

//// Result ///////////////////////////////////////////////////////////////////////////
console.log( encrypt('GARDEN', 3) );
console.log( encrypt('hello brutus, meet me at the high gardens.', 42))

console.log( decrypt('JDUGHQ', 3) );
console.log( decrypt('Xubbe Rhkjki, cuuj cu qj jxu xywx wqhtudi.', 42) );
    