//////////////////////////////////////////////////////////
// Errors
// - Syntax error
// - Reference error
// = Type error

// Debugging
// - do googling them
// - googling, mentor, stack overflow
//////////////////////////////////////////////////////////

// try {
//     functionThatDoesNotExist();
// } catch (e) {
//     console.log('Somthing went wrong', e);
// }

// console.log("did we make it?");



// try {
//     3+3;
// } catch {
//     console.log("error");
// }
// console.log("success");



// try {
//     asdfasfdasdfsadf();
// } catch (e) {
//     console.log('Oh no error!!');
//     console.log(e);
// } 
// console.log('success')



// function displayInitials(user) {
//     let firstNameLetter = user.firstName[0].toUpperCase();
//     let lastNameLetter = user.lastName[0].toUpperCase();
//     return `hello ${firstNameLetter}.${lastNameLetter}`
// }
// displayInitials({firstname: 'Jason', lastName: "Momoa"});



// function displayInitials(user) {
//     let firstNameLetter;
//     let lastNameLetter;
//     try {
//         firstNameLetter = user.firstName[0].toUpperCase();
//         lastNameLetter = user.lastName[0].toUpperCase();
//     } catch(e) {
//         return "Invalid input!"+e;
//     }
//     return `Hello ${firstNameLetter}.${lastNameLetter}`;
// }
// console.log( displayInitials({ firstName: 'Jason' } ));



// try {
//     undefined.pop();
//     console.log("INSIDE TRY!");
// } catch(e) {
//     console.log('OH NO ERROR!');
//     console.log(e);
// } finally {
//     console.log("INSIDE FINALLY!");
// }
// console.log('did we make?');



try {
    throw new TypeError("I don't like you doing that");
    // throw new Error('I AM THE ERROR');
    // undefined.pop();
}
catch(e) {
    // console.log('there was an error', e);
    // console.dir(e);
    console.log("what kind of error?", e.name);
    console.log("what is the message?", e.message);
    console.log("where did it happen?", e.stack);
}
