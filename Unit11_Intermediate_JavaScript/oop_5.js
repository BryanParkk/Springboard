//object.create()
let person = {
  calcAge() {
    return new Date().getFullYear() - this.birthYear;
  },
  grett() {
    return "Have a nice day!";
  },
  init(name, birthYear, gender) {
    this.name = name;
    this.birthYear = birthYear;
    this.gender = gender;
  },
};
// 1.
let john = Object.create(person);
john.name = "John";
john.birthYear = 1990;
john.gender = "Male";
console.log(john);
console.log(john.calcAge());

// 2.
let merry = Object.create(person, {
  name: { value: "Merry" },
  birthYear: { value: 1983 },
  gender: { value: "Female" },
});
console.log(merry);

// 3.
let mark = Object.create(person);
mark.init("Mark", 1994, "Male");
console.log(mark);

// test
