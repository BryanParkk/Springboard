const people = ["Yoshi", "ryu", "chun-li", "mario"];
const ages = [20, 25, 30, 35];

// exporting functions //
const displayData = () => {
  for (let i = 0; i < people.length; i++) {
    console.log(`Character name: ${people[i]}. Character age: ${ages[i]}`);
  }
}
module.exports = {
  people, ages, displayData
};


