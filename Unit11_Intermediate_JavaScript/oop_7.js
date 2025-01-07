///
let user = {
  name: "John",
  role: "admin",
  access: "read-write",

  addUser() {
    //Logic
  },

  removeUser() {
    //Logic
  },
};

///
let john = {
  name: "John",
  birthYear: 1990,
  gender: "Male",

  calculateAge() {
    return 2024 - this.birthYear;
  },
};

/// Person function constructor (constructor using pascal case)
let Person = function (name, gender, birthYear) {
  this.name = name;
  this.gender = gender;
  this.birthYear = birthYear;
};
// Prototype
Person.prototype.calcAge = function () {
  let age = new Date().getFullYear() - this.birthYear;
  console.log(age);
};

// Object
let jon = new Person("jon", "Male", 1986);
jon.calcAge();
console.log(jon);

let merry = new Person("merry", "Female", 1983);
merry.calcAge();
console.log(merry);

let Person1 = function (name, gender, money) {
  this.name = name;
  this.gender = gender;
  this.money = money;
};

Person1.prototype.addPerson = function () {};
Person1.prototype.addMoney = 50000;

park = new Person1("Byeongil", "Male", 50000);
console.log(park);
