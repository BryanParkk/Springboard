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

//Employee function constructor
let Employee = function (name, gender, birthYear, empId, salary) {
  this.name = name;
  this.gender = gender;
  this.birthYear = birthYear;
  this.empId = empId;
  this.salary = salary;
};

///
