//getter and setter
//Accessor properties are mothds that gets or sets the value
// of an objects property

// 1. getter properties - read objects property value - get
// 2. setter properties - set an objects property value - set

//Encapsulation - hide data form outside world
//set calculated value for a property
/*
let john = {
  name: "John",
  birthYear: 1990,
  AnnualSalary: 12000,

  get getName() {
    return "Mr." + this.name;
  },

  set setName(val) {
    if (val.length < 4) {
      alert("Name should be of at least 4 characters!");
    } else {
      this.name = val;
    }
  },
};

console.log(john.getName);
john.name = "Joh";
console.log(john.getName);

console.log(john.name);
john.name = "John Doe";
console.log(john.name);
*/

let User = class {
  constructor(name, pswd, role) {
    this.name = name;
    this.password = pswd;
    this.role = role;
  }
};
