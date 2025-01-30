let Car = function (name, brand, tire, price) {
  this.name = name;
  this.brand = brand;
  this.tire = tire;
  this.price = price;
};
Car.prototype.fuel = "Gas";

let BMW = new Car("X2", "BMW", "4WD", 300000);

console.log(BMW);
