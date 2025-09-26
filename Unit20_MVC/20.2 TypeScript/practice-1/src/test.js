// function sum(x: number, y: number) {
//   console.log(x + y);
// }
var admin = {
    username: "bryan",
    age: 40,
    email: "bryan1010110@gmail.com"
};
function printUsername(user) {
    console.log(user.username);
}
function printUserAge(user) {
    console.log(user.age);
}
function isAdult(user) {
    return user.age >= 18;
}
function makeRandoUser(name) {
    return {
        username: name,
        age: Math.floor(Math.random() * 100),
    };
}
