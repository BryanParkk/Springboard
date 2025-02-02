//Depth first search
class Node {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
  findDFS(val) {
    const toVisitStack = [this];
    while (toVisitStack.length) {
      const current = toVisitStack.pop();
      console.log("Visiting: ", current);
      if (current.val === val) {
        return current;
      }
      for (let child of current.children) {
        toVisitStack.push(child);
      }
    }
  }
  findBFS(val) {
    const toVisitQueue = [this];
    while (toVisitQueue.length) {
      const current = toVisitQueue.shift();
      console.log("Visiting: ", current);
      if (current.val == val) {
        return current;
      }
      for (let child of current.children) {
        toVisitQueue.push(child);
      }
    }
  }
}

let amy = new Node("amy", [
  new Node("bob"),
  new Node("barb"),
  new Node("barry"),
]);

// amy.children.push(bob);
// amy.children.push(barb);
// amy.children.push(barry);

let htmlEl = new Node("html", [
  new Node("head"),
  new Node("body", [
    new Node("ul", [new Node("li"), new Node("li2")]),
    new Node("table"),
  ]),
]);

// Breadth first search
