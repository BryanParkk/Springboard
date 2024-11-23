// Errors
// - Syntax error
// - Reference error
// = Type error

// Debugging
// - do googling them
// - googling, mentor, stack overflow

try {
    functionThatDoesNotExist();
} catch (e) {
    console.log('Somthing went wrong', e);
}

console.log("did we make it?");



try {
    3+3;
} catch {
    console.log("error");
}
console.log("success");



try {
    asdfasfdasdfsadf();
} catch (e) {
    console.log('Oh no error!!');
    console.log(e);
} 
console.log('success')