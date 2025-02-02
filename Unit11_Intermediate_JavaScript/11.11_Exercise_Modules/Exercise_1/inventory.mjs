// Named Exports and import //
// inventory.mjs
const inventory = [];

// addItem()
export function addItem(item) {
  inventory.push(item);
  console.log(`${item} added to inventory`);
}

// removeItem()
export function removeItem(item) {
  const index = inventory.indexOf(item);
  inventory.splice(index, 1);
  console.log(`${item} removed from inventory.`);
}

// listItems()
export function listItems(item) {
  console.log("<Current Inventory>");
  inventory.forEach((item, index) => console.log(`${item}`));
}
