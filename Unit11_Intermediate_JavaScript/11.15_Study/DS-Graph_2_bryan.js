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
  areConndectedBFS(person1, person2) {
    let toVisitQueue = [person1];
    let seen = new Set(toVisitQueue);
    while (toVisitQueue.length) {
      console.log(toVisitQueue.map((node) => node.name));

      let currPerson = toVisitQueue.shift();
      console.log("BFS VISITING : ", currPerson.name);

      if (currPerson === person2) return true;

      for (let neighbor of currPerson.adjacent) {
        if (!seen.has(neighbor)) toVisitQueue.push(neighbor);
        seen.add(neighbor);
      }
    }
    return false;
  }

  areConndectedDFS(person1, person2) {
    let toVisitStack = [person1];
    let seen = new Set(toVisitStack);
    while (toVisitStack.length) {
      console.log(toVisitStack.map((node) => node.name));

      let currPerson = toVisitStack.pop();
      console.log("DFS VISITING : ", currPerson.name);

      if (currPerson === person2) return true;

      for (let neighbor of currPerson.adjacent) {
        if (!seen.has(neighbor)) toVisitStack.push(neighbor);
        seen.add(neighbor);
      }
    }
    return false;
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

//// add 2 ////
const moe = new PersonNode("moe");
const barney = new PersonNode("barney");
const lenny = new PersonNode("lenny");
friends.addPeople([moe, barney, lenny]);
friends.setFriends(moe, barney);
friends.setFriends(barney, lenny);
