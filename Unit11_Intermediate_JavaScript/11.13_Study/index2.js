// Node
class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
  //find method
  find(sought) {
    let currentNode = this;
    while (currentNode) {
      console.log("Visiting:", currentNode.val);
      if (currentNode.val === sought) return currentNode;
      if (currentNode.val > sought) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
  }
}

//BST (Binary Search Tree)
class BinarySearchTree {
  constructor(root) {
    this.root = root;
  }
  traverse(node = this.root) {
    if (node.left) this.traverse(node.left);
    if (node.right) this.traverse(node.right);
    console.log(node.val);
  }
}

//Value insert
const E = new Node("E");
const A = new Node("A");
const B = new Node("B");
const C = new Node("C");
const D = new Node("D");
const F = new Node("F");
const G = new Node("G");

E.left = B;
E.right = G;
B.left = A;
B.right = D;
G.left = F;

//New Tree / root is E
const tree = new BinarySearchTree(E);
