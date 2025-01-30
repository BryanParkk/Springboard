/* Task 1: Unveiling the Coordinates */
const coordinates = { x: 34, y: 42, z: 67 };
// Destructuring `x` and `y` from the object
const { x, y } = coordinates;
console.log(`Coordinates: x=${x}, y=${y}`);
// Output: Coordinates: x=34, y=42

/* Task 2: The Map of Secrets */
const locations = {
  first: "Cave of Wonders",
  second: "Lake of Mystery",
  third: "Mount of Ages",
  fourth: "Desert of Shadows",
};
// Destructuring `first`, `second`, and capturing the rest
const { first, second, ...remaining } = locations;
console.log(`Key Locations: ${first}, ${second}`);
console.log("Remaining Locations:", remaining);
// Output: Key Locations: Cave of Wonders, Lake of Mystery
// Remaining Locations: { third: 'Mount of Ages', fourth: 'Desert of Shadows' }

/* Task 3: The Mysterious Door */
const doorCode = {
  upper: "Alpha",
  lower: "Omega",
};
// Destructuring with default value
const { upper, lower, middle = remaining.third } = doorCode;
console.log(
  `Door Code Sequence: upper=${upper}, middle=${middle}, lower=${lower}`
);
// Output: Door Code Sequence: upper=Alpha, middle=Mount of Ages, lower=Omega

/* Task 4: The Guardian's Riddle */
const riddle = {
  ancientWord: "Sphinx",
  modernWord: "Cat",
};
// Renaming `ancientWord` to `translation`
const { ancientWord: translation } = riddle;
console.log(`Translation of the riddle: ${translation}`);
// Output: Translation of the riddle: Sphinx

/* Task 5: The Array of Elements */
const elements = ["Fire", "Water", "Earth", "Air"];
// Array destructuring for first two elements
const [firstElement, secondElement] = elements;
console.log(`Essential Elements: ${firstElement}, ${secondElement}`);
// Output: Essential Elements: Fire, Water

/* Task 6: Skipping Stones */
const stones = [1, 2, 3, 4, 5, 6];
// Array destructuring for the first and sixth stones
const [firstStone, , , , , sixthStone] = stones;
console.log(`Extracted Stones: ${firstStone}, ${sixthStone}`);
// Output: Extracted Stones: 1, 6

/* Task 7: The Array of Shadows */
const shadows = ["Darkness", "Silence", "Whisper", "Echo"];
// Array destructuring with rest
const [visibleShadow, ...hiddenShadows] = shadows;
console.log(`Visible Shadow: ${visibleShadow}`);
console.log("Hidden Shadows:", hiddenShadows);
// Output: Visible Shadow: Darkness
// Hidden Shadows: [ 'Silence', 'Whisper', 'Echo' ]

/* Task 8: The Wise Function */
function revealPath({ direction, distance }) {
  console.log(`Travel ${distance} units towards ${direction}.`);
}
revealPath({ direction: "North", distance: 100 });
// Output: Travel 100 units towards North.

/* Task 9: The Scroll of Defaults */
function mixPotion({ ingredient1 = "Water", ingredient2 = "Fireflower" } = {}) {
  console.log(`Mixing ${ingredient1} and ${ingredient2}.`);
}
mixPotion({ ingredient1: "Earthroot" });
mixPotion({});
// Output: Mixing Earthroot and Fireflower.
// Output: Mixing Water and Fireflower.

/* Task 10: The Array Spell */
function castSpell([ingredient1, ingredient2]) {
  console.log(`Casting spell with ${ingredient1} and ${ingredient2}.`);
}
castSpell(["Stardust", "Moonstone", "Sunbeam"]);
// Output: Casting spell with Stardust and Moonstone.

/* Task 11: The Nested Secret */
const nestedSecret = { outer: { inner: "The Final Key" } };
// Nested destructuring
const {
  outer: { inner: finalKey },
} = nestedSecret;
console.log(`Unveiled Secret: ${finalKey}`);
// Output: Unveiled Secret: The Final Key

/* Task 12: The Swap of Fate */
let stoneA = "Emerald";
let stoneB = "Ruby";
// Swapping values using array destructuring
[stoneA, stoneB] = [stoneB, stoneA];
console.log(`Swapped Stones: stoneA=${stoneA}, stoneB=${stoneB}`);
// Output: Swapped Stones: stoneA=Ruby, stoneB=Emerald
