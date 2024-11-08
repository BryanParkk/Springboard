// Practice 1
console.log('------------------------------------');
function isValidPassword(password, username) {
    if (
        password.length >= 8 && 
        password.indexOf(' ') == -1 && 
        password.indexOf(username) == -1
    ) {
        return true;
    }
    return false;
}
console.log(isValidPassword('89Fjj1nms', 'dogLuvr')); // true
console.log(isValidPassword('dogLuvr123!', 'dogLuvr')); // false
console.log(isValidPassword('Hello1!', 'dogLuvr')); //f alse
 

// Practice 2
console.log('------------------------------------');
function avg(arr) {
    // loop over each num
    // add them together
    // divide by number of nums
    let total = 0;
    for(let num of arr) {
        total += num;
    }
    return total / arr.length;
}
console.log( avg([0, 50]) );
console.log( avg([75, 76, 80, 95, 100]) );
console.log('------------------------------------');


// practice 3 : pangram
// 	1.	The quick brown fox jumps over the lazy dog
//	2.	Pack my box with five dozen liquor jugs
//	3.	A wizard’s job is to vex chumps quickly in fog
//	4.	How vexingly quick daft zebras jump
//	5.	Five or six big jet planes zoomed quickly by the tower
//	6.	The five boxing wizards jump quickly
//	7.	Bright vixens jump; dozy fowl quack
//	8.	Quick zephyrs blow, vexing daft Jim
//	9.	Jinxed wizards pluck ivy from the big quilt
//	10.	The lazy dog jumps over five quick brown oxen

// function isPangram(words) {
//     let alphabet = 'abcdefghijklmnopqrstuvxwyz';
//     let word = words.toLowerCase();
//     let res = false;

//     for(let i=0; i < alphabet.length; i++) {
//         res = alphabet[i] === word[i]
//     }
//     return res;
// }

// console.log( isPangram('abcdefghijklmnopqrstuvxwyz') );

function isPangram(words) {
    let alphabet = 'abcdefghijklmnopqrstuvxwyz';
    words = words.toLowerCase();

    for(let char of alphabet) {
        if(words.indexOf(char) === -1) {
            return false;
        }
    }
    return true;
}
console.log( isPangram('The quick brown fox jumps over The lazy dog') );
console.log('------------------------------------');

// let a = 'abcdefghijklmn';
// console.log(a.indexOf('c'));


///////////////////////////////////////////////////////////////////////////

// repeat
// Practice 1
console.log('#### Practice 1 ####')
function isValidPassword2(password, username) {
    if(
        password.length < 8 || 
        password.indexOf(' ') !== -1 ||
        password.indexOf(username) !== -1
    )return false;
    return true;
}
console.log( isValidPassword2('asdfasds', 'parkbeng') );

///////////////////////////////////////////////////////////////////////////
// Practice 2
console.log('#### Practice 2 ####')
function avg2(arr) {
    let total = 0;
    for(let num of arr) {
        total += num;
    } return total / arr.length;
}
console.log( avg2([0, 50]) );
console.log( avg2([75, 76, 80, 95, 100]) );

///////////////////////////////////////////////////////////////////////////
// Practice 3
console.log('#### Practice 3 ####')
// function isPangram2(words) {
//     let lowerSentence = words.toLowerCase();
//     for(let char of 'abcdefghijklmnopqrstuvxwyz') {
//         if(lowerSentence.indexOf(char) === -1) {
//         return false; 
//         }
//     }
//     return true;
// }
// console.log( isPangram('The quick brown fox jumps over the lazy dog') );
function isPangram2(words) {
    let lowerWords = words.toLowerCase();

    for(let char of words) {
        if(!lowerWords.includes(char)) {
            return false;
        } 
    }
    return true;
}
console.log( isPangram('The quick brown fox jumps over the lazy dog') );

///////////////////////////////////////////////////////////////////////////
// Practice 4
console.log('#### Practice 4 ####')
// [1]
// function getCard() {
//     const value = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'Q', 'J'];
//     const suit = ['clubs', 'spades', 'hearts', 'diamonds'];
    
//     const ranSuit = Math.floor(Math.random() * value.length); 
//     const ranValue = Math.floor(Math.random() * suit.length);

//     return { value:ranSuit, suit:ranValue };
// } 
// console.log( getCard() );

///////////////////////////////////////////////////////////////////////////
// //[2]
// function getCard() {
//     const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'Q', 'J'];
//     const suits = ['clubs', 'spades', 'hearts', 'diamonds'];

//     const idxValue = Math.floor(Math.random() * values.length);
//     const idxSuit = Math.floor(Math.random() * suits.length)

//     const outValues = values[idxValue];
//     const outSuits = suits[idxSuit];

//     return { suits:outValues,values:outSuits};   
// }
// console.log( getCard() );

///////////////////////////////////////////////////////////////////////////
//[3]
// function pick(arr) {
//     const idx = Math.floor(Math.random() * arr.length);
//     return arr[idx];
// }

// function getCard() {
//     const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'Q', 'J'];
//     const suits = ['clubs', 'spades', 'hearts', 'diamonds'];

//     return { value:pick(values), suit:pick(suits) };   
// }
// console.log( getCard() );

///////////////////////////////////////////////////////////////////////////
// repeat practice
function getRandom(arr) {
    let arrIdx = Math.floor(Math.random() * arr.length);
    return arrIdx;
}

function getCard() {
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'Q', 'J'];
    const suits = ['clubs', 'spades', 'hearts', 'diamonds'];

    //const valueIdx = Math.floor(Math.random() * values.length);
    //const suitIdx = Math.floor(Math.random() * suits.length);

    const value = values[getRandom(values)];
    const suit = suits[getRandom(suits)];

    return console.log({ value: value, suit: suit });
}

getCard();