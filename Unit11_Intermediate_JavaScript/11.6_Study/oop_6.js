//Inheritance between function constructor
let Person = function (name, gender, birthYear) {
  this.name = name;
  this.gender = gender;
  this.birthYear = birthYear;
};
Person.prototype.calcAge = function () {
  let age = new Date().getFullYear() - this.birthYear;
  console.log(age);
};

let john = new Person("John", "Male", 1983);
let merry = new Person("merry", "Female", 1984);

//Employee function constructor
//this = mark
//Employee - child class
let Employee = function (name, gender, birthYear, empId, salary) {
  Person.call(this, name, gender, birthYear);
  this.empId = empId;
  this.salary = salary;
};
Employee.prototype = Person.prototype;

Employee.prototype.calcSalary = function () {
  return this.salary * 12;
};
Employee.prototype.empDetails = function () {
  console.log(this.name);
  console.log(this.empID);
};

let mark = new Employee("Mark", "Male", 1983, 101, 12000);
console.log(mark);
//
//
