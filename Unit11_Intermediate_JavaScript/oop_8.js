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
Person.prototype.greet = function () {
  console.log("Good morning " + this.name);
};

let john = new Person("Park", 1986, "Male");
console.log(john);
john.greet();

let merry = new Person("merry", 1983, "Female");
console.log(merry);

// 1. classes cannot be hoisted
// 2. classes are first class citizen
// 3. classes are excueted in strict mode

//getter , setter

let john2 = {
  name: "John",
  birthYear: 1983,
  AnnualSalary: 12000,

  get getName() {
    return this.name;
  },

  set setName(val) {
    if (val.length < 4) {
      alert("Name should be of atleast 4 characters!");
    } else {
      this.name = val;
    }
  },
};

console.log(john.getName);
john2.setName = "john doe";
console.log(john.getName);
