//- Global scope
/////- Module scope
///////- Function scope
//////////- Block scope - let and const
console.log("hello");

(function () {
  var harry = "potter";
  var voldmort = "He who must not be named";

  function fight(char1, char2) {
    var attack1 = Math.floor(Math.random() * char1.length);
    var attack2 = Math.flood(Math.random() * char2.length);
    return attack1 > attack2 ? `${char1} wins` : `${char2} wins`;
  }
  console.log(fight(harry, voldmort));
});
