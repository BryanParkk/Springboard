class PersonNode {
  constructor(name, adjacent = new Set()) {
    this.name = name;
    this.adjacent = adjacent;
  }
}
const homer = new PersonNode("homer simpson");
const marge = new PersonNode("marge simpson");
const maggie = new PersonNode("meggie simpson");
// homer.adjacent.push(marge);
// marge.adjacent.push(homer);
homer.adjacent.add(marge);
marge.adjacent.add(homer);
maggie.adjacent.add(homer);
maggie.adjacent.add(marge);
homer.adjacent.add(maggie);
marge.adjacent.add(maggie);

///////////////////////////////////////////////////////////////
