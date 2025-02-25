// class PersonNode {
//   constructor(name, adjacent = new Set()) {
//     this.name = name;
//     this.adjacent = adjacent;
//   }
// }
// const homer = new PersonNode("homer simpson");
// const marge = new PersonNode("marge simpson");
// const maggie = new PersonNode("meggie simpson");
// // homer.adjacent.push(marge);
// // marge.adjacent.push(homer);
// homer.adjacent.add(marge);
// marge.adjacent.add(homer);
// maggie.adjacent.add(homer);
// maggie.adjacent.add(marge);
// homer.adjacent.add(maggie);
// marge.adjacent.add(maggie);

///////////////////////////////////////////////////////////////

class PersonNode {
  constructor(name, adjacent = new Set()) {
    this.name = name;
    this.adjacent = adjacent;
  }
}

class FriendGraph {
  constructor() {
    this.node = new Set();
  }
  addPerson(node) {
    this.node.add(node);
  }
  addPeople(peopleList) {
    for (let node of peopleList) {
      this.addPerson(node); // 수정: add -> node
    }
  }
  setFriends(person1, person2) {
    person1.adjacent.add(person2);
    person2.adjacent.add(person1);
  }
}

const homer = new PersonNode("homer simpson");
const marge = new PersonNode("marge simpson");
const maggie = new PersonNode("meggie simpson");
const lisa = new PersonNode("lisa simpson");
const grampa = new PersonNode("grampa simpson");

const friends = new FriendGraph();
friends.addPeople([homer, marge, maggie, lisa, grampa]);

// setFriends 메서드에는 두 개의 인자를 전달합니다.
friends.setFriends(homer, marge);
friends.setFriends(homer, lisa);
friends.setFriends(homer, maggie);
friends.setFriends(marge, maggie);
friends.setFriends(maggie, lisa);
friends.setFriends(lisa, grampa);

console.log(friends);
