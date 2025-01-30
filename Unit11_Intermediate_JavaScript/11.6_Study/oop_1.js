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

let steve = new Person("steve", "male", 2005);
// let now = new Date();
// let str = new String();

////////////////////////////////////////////////////////////////

// function constructor => blue print
let Person2 = function (name, gender, birthYear) {
  this.name = name;
  this.gender = gender;
  this.birthYear = birthYear;
};

Person2.prototype.calcAge = function () {
  let age2 = new Date().getFullYear() - this.birthYear;
  console.log(age2);
};

Person2.prototype.city = "London";

let bryan2 = new Person2("bryan", "male", 1986);
bryan2.calcAge();
console.log(bryan2);

let merry2 = new Person2("merry", "female", 1983);
merry2.calcAge();
console.log(merry2);

let steve2 = new Person2("steve", "male", 2005);
steve2.calcAge();
console.log(steve2);
// let now = new Date();
// let str = new String();

////////////////////////////////////////
let mark = {
  name: "Mark",
  birthYear: 1983,
  gender: "Male",
};
// let mark = new Object();

let arr = [10, 20, 30, 40];
console.log(arr);
//new Array()
arr.push(23);

////////////////////////////////////////
function Person3(name, gender, addr) {
  this.name = name;
  this.gender = gender;
  this.addr = addr;
  this.sayHello = () => {
    return `hello ${name}. I'm genie`;
  };
}

bryan = new Person3("bryan", "Male", "google");
console.log(bryan.sayHello());
