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
  this.calcAge = function () {
    let age = new Date().getFullYear() - this.birthYear;
    console.log(age);
  };
};

let jon = new Person("jon", "Male", 1986);
jon.calcAge();
console.log(jon);

let merry = new Person("merry", "Female", 1983);
merry.calcAge();
console.log(merry);

// let Car = function (tire, window, water) {
//   this.tire = tire;
//   this.window = window;
//   this.water = water;
//   this.engine = function () {
//     let gas = "v8";
//     console.log(gas);
//   };
// };

// let BMW = new Car(4, 4, 2);
// console.log(BMW);
