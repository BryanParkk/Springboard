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
function isValidPassword(password, username) {
    if(
        password.length < 8 || 
        password.indexOf(' ') !== -1 ||
        password.indexOf(username) !== -1
    )return false;
    return true;
}
console.log( isValidPassword('asdfasds', 'parkbeng') );

// Practice 2
console.log('#### Practice 2 ####')
function avg(arr) {
    let total = 0;
    for(let num of arr) {
        total += num;
    } return total / arr.length;
}
console.log( avg([0, 50]) );
console.log( avg([75, 76, 80, 95, 100]) );

// Practice 3
console.log('#### Practice 3 ####')