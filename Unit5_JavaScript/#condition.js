// Conditional Logic

//if statement
if(true) {
    console.log("Hello World");
}else {
    console.log("World, Hello");
}

//Comparisons
> // greater than
< // less than
>= // greater than or equal to
<= // less than or equal to
== // equality
!= // not equal
=== // strict equality 
!= // strict non-equality

// Boolean
Boolean('hi');             // true
Boolean('');               // false
Boolean(favoriteNumber);   // false
Boolean(null);             // false
Boolean(1);                // true
Boolean(undefined);        // false
Boolean('cat');            // true
Boolean(-0);               // false
Boolean(-1);               // true 

//!! bangbang
let favoriteNumber = 0;

!!'hi';             // true
!!'';               // false
!!favoriteNumber;   // false
!!null;             // false
!!1;                // true
!!undefined;        // false
!!'cat';            // true

//Ternary operator
( expression to check ) ? statement if true : statement if false;
let guess = 15; // guess a number between 1 to 20
guess > answer ? console.log('too high') : console.log('too low');

let guess = 15;
let wasCorrect = (guess === 15) ? 'Your correct!' : 'Incorrect';
console.log(wasCorrect) // => 'Your correct!'

