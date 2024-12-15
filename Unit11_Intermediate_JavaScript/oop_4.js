//Static methods
class Person {
  constructor(name, birthYear, gender) {
    this.name = name;
    this.birthYear = birthYear;
    this.gender = gender;
  }
  calcAge() {
    console.log(new Date().getFullYear() - this.birthYear);
  }

  static greet() {
    console.log("Hey there! How are you?");
  }
}

let john = new Person("john", 1983, "Male");
console.log(john);
