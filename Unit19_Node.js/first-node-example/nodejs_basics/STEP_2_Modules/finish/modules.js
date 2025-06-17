const os = require("os");
const { people, ages, displayData } = require("./people");

// Note the outup from the [people.js]  module //
console.log(people, ages);

// you can now call the [displayData] function //
displayData();

// Note the output inforamtion of your local OS //
console.log(os.platform(), os.homedir());