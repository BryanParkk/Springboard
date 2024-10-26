///////////////////
var rating = '3';
if (rating > 2) {
    console.log("You good");
}
if (rating > 2) {
    console.log("You good");
}
else if (rating > 2) {
    console.log("You gooda");
}
///////////////////
let password = "hellok";

if(password.length >= 6) {
    if(password.indexOf(' ') === -1) {
        console.log("Valid Password!");
    } 
} else {
    console.log("Password must be longer")
}
///////////////////
let mystery = 0;
if(mystery) {
    console.log("truthy");
} else {
    console.log ("falsy");
}
///////////////////
let fruit = 'melon';

if(fruit === 'melon' || fruit === 'water') {
    console.log(`your fruit is ${fruit}`);
}else {
    console.log('out of stock');
}
if(!(fruit === 'melon' || fruit === 'water')) {
    console.log(`your fruit is ${fruit}`);
}else {
    console.log('out of stock');
}