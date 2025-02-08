/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}
class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */
  sumValues() {
    if (!this.root) return 0;
    let total = 0;
    const toVisit = [this.root];
    while (toVisit.length) {
      const current = toVisit.pop();
      total += current.val;
      for (let child of current.children) {
        toVisit.push(child);
      }
    }
    return total;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */
  countEvens() {}

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {}
}

module.exports = { Tree, TreeNode };
