// function constructor => blue print
let Person = function (name, gender, birthYear) {
  this.name = name;
  this.gender = gender;
  this.birthYear = birthYear;
  this.calcAge = function () {
    let age = new Date().getFullYear() - this.birthYear;
    console.log(age);
  };
};

let bryan = new Person("bryan", "male", 1986);
bryan.calcAge();
console.log(bryan);

let merry = new Person("merry", "female", 1983);
console.log(merry);
// let now = new Date();
// let str = new String();
