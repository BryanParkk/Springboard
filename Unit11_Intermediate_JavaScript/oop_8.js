//Javascript classes
// 1. class declaration
class Person {
  constructor(name, birthYear, gender) {
    this.name = name;
    this.birthYear = birthYear;
    this.gender = gender;

    // this.calcAge = function () {
    //   console.log(new Data().getFullYear() - this.birthYear);
    // };
  }
  calcAge() {
    console.log(new Date().getFullYear() - this.birthYear);
  }
}

let john = new Person("Park", 1986, "Male");
console.log(john);

// 2. class expression
//let Person = class {};
