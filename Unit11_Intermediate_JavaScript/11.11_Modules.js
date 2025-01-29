//- Global scope
/////- Module scope
///////- Function scope
//////////- Block scope - let and const
console.log("hello");

var fightModule = (function () {
  var harry = "potter";
  var voldmort = "He who must not be named";

  function fight(char1, char2) {
    var attack1 = Math.floor(Math.random() * char1.length);
    var attack2 = Math.floor(Math.random() * char2.length);
    return attack1 > attack2 ? `${char1} wins` : `${char2} wins`;
  }
  //   console.log(fight(harry, voldmort));
  return {
    fight: fight,
  };
})();

//CommonJS and AMD(Asyncronous Module Definition)
var module1 = require("module1");
var module2 = require("module2");

function fight() {}
module.export = {
  fight: fight,
};

//////////////////////////
///////// ES6

/// import
import module1 from "module1";
import module2 from "module2";

/// export
const harry = "potter";
const voldmort = "He who must not be named";

export function jump() {
  // function
}
export default function fight2(char1, char2) {
  const attack1 = Math.floor(Math.random() * char1.length);
  const attack2 = Math.floor(Math.random() * char2.length);
  return attack1 > attack2 ? `${char1} wins` : `${char2} wins`;
}
//
