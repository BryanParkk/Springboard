//JavaScript Classes
//There are two ways to create a class
// 1. class declaration
// class Persona {}

//2. class expression
// let Persona = class {};
//////////////////////////

// class Person {
//   constructor(name, birthYear, gender) {
//     this.name = name;
//     this.birthYear = birthYear;
//     this.gender = gender;

//     this.calcAge = function () {
//       console.log(new Data().getFullYear() - this.birthYear);
//     };
//   }
// }

class Person {
  constructor(name, birthYear, gender) {
    this.name = name;
    this.birthYear = birthYear;
    this.gender = gender;
  }
  calcAge() {
    console.log(new Date().getFullYear - this.birthYear);
  }
}
Person2.prototype.greet = function () {
  console.log("Good Morning!" + this.name);
};

let jhon2 = new Person("jhon", 1990, "Male");
console.log(jhon2);

let merry2 = new Person("merry", 1995, "Femail");
console.log(merry2);

//1. classes caanot be hoisted.
//2. classes are first class citizen
//3. classes are excuted in strict mode
