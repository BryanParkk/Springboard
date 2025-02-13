// Example of an undirected graph.

class PersonNode {
  constructor(name, adjacent = new Set()) {
    // Create a person node with friends adjacent
    this.name = name;
    this.adjacent = adjacent;
  }
}
// end

// FriendGraph class
class FriendGraph {
  // Graph holding people and their friendships.
  constructor() {
    this.nodes = new Set();
  }

  addPerson(person) {
    // Add a person to our graph
    this.nodes.add(person);
  }

  setFriends(person1, person2) {
    // Set two people as friends
    person1.adjacent.add(person2);
    person2.adjacent.add(person1);
  }

  addPeople(people_list) {
    // Add a list of people to our graph
    for (let person of people_list) {
      this.addPerson(person);
    }
  }
  // end

  areConnectedBFS(person1, person2) {
    let toVisitQueue = [person1];
    let seen = new Set(toVisitQueue);

    while (toVisitQueue.length > 0) {
      let currPerson = toVisitQueue.shift();
      
      if (currPerson === person2) return true

      for (let neighbor of currPerson.adjacent) {
        if (!seen.has(neighbor)) {
          toVisitQueue.push(neighbor);
          seen.add(neighbor);
        }
      }
    }

    return false;
  }
  // end

  areConnectedDFS(person1, person2) {  
    let toVisitStack = [person1];
    let seen = new Set(toVisitStack);
  
    while (toVisitStack.length > 0) {
      let currPerson = toVisitStack.pop();
  
      if (currPerson === person2) return true;
  
      for (let neighbor of currPerson.adjacent) {
        if (!seen.has(neighbor)) {
          toVisitStack.push(neighbor);
          seen.add(neighbor);
        }
      }
    }
  
    return false;
  }
  // end

  areConnectedRecursive(person1, person2, seen=new Set([person1])) {
    if (person1 === person2) return true;

    for (let neighbor of person1.adjacent) {
      if (!seen.has(neighbor)) {
        seen.add(neighbor);
        if (this.areConnectedRecursive(neighbor, person2, seen)) {
          return true;
        }
      }
    }

    return false;
  }
  // end
}

//  Add sample friends
let homer = new PersonNode("Homer");
let marge = new PersonNode("Marge");
let maggie = new PersonNode("Maggie");
let lisa = new PersonNode("Lisa");
let grampa = new PersonNode("Grampa");

let friends = new FriendGraph();
friends.addPeople([homer,marge,maggie,lisa,grampa]);

friends.setFriends(homer, marge);
friends.setFriends(homer, maggie);
friends.setFriends(homer, lisa);
friends.setFriends(marge, maggie);
friends.setFriends(lisa, grampa);
