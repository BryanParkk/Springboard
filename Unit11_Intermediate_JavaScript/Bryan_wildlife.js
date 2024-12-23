/* Task 1: Track Animal Sightings */
function trackAnimalSightings(...animals) {
  console.log(`Sighted animals: ${animals.join(", ")}`);
}
trackAnimalSightings("Elephant", "Tiger", "Panda", "Rhino");
// 출력: Sighted animals: Elephant, Tiger, Panda, Rhino

/* Task 2: Merge Habitat Areas */
const forestHabitats = ["Forest A", "Forest B"];
const savannahHabitats = ["Savannah C", "Savannah D"];
const allHabitats = [...forestHabitats, ...savannahHabitats];
console.log(allHabitats);
// 출력: ["Forest A", "Forest B", "Savannah C", "Savannah D"]

/* Task 3: Update Conservation Status */
const rhinoStatus = {
  population: 500,
  status: "Endangered",
};
const updatedRhinoStatus = {
  ...rhinoStatus,
  population: 550,
  habitat: "Grasslands",
};
console.log(updatedRhinoStatus);
// 출력: { population: 550, status: "Endangered", habitat: "Grasslands" }

/* Task 4: Catalog Genetic Diversity */
const lionProfile = {
  name: "Leo",
  age: 5,
  species: "Lion",
};
const lionWithGenetics = {
  ...lionProfile,
  genetics: {
    diversityScore: "High",
  },
};
lionWithGenetics.genetics.diversityScore = "Moderate";
console.log(lionProfile);
// 출력: { name: "Leo", age: 5, species: "Lion" }
console.log(lionWithGenetics);
// 출력: { name: "Leo", age: 5, species: "Lion", genetics: { diversityScore: "Moderate" } }

/* Task 5: Analyze Ecosystem Health */
const ecosystemHealth = {
  waterQuality: "Good",
  foodSupply: {
    herbivores: "Abundant",
    carnivores: "Sufficient",
  },
};
const copiedEcosystemHealth = { ...ecosystemHealth };
copiedEcosystemHealth.foodSupply.herbivores = "Scarce";
console.log(ecosystemHealth);
// 출력: { waterQuality: "Good", foodSupply: { herbivores: "Scarce", carnivores: "Sufficient" } }
console.log(copiedEcosystemHealth);
// 출력: { waterQuality: "Good", foodSupply: { herbivores: "Scarce", carnivores: "Sufficient" } }
