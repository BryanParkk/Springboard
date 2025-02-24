// go to the spoonacular api, get random recipe
// click a button add display
// the browser need to display it

const spoonacularAPIKEY = "5ac5911a4f7f462bb79709103115db2d";

const button = document.getElementById("generate-button");
const displayDiv = document.getElementById("display-div");

console.log(button);

button.addEventListener("click", function () {
  console.log("I clicked the button");
  getRandomRecipe();
});
// https://api.spoonacular.com/recipes/random

async function getRandomRecipe() {
  // create a new div
  let newDiv = document.createElement("div");
  let h3 = document.createElement("h3");

  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/random?apiKey=${spoonacularAPIKEY}`
    );
    console.log(response);
    displayDiv.innerHTML = "";

    // set recipe title into the header 3
    h3.innerHTML = response.data.recipes[0].title;
    displayDiv.appendChild(h3);

    // set recipe summary in the new div
    newDiv.innerHTML = response.data.recipes[0].summary;
    displayDiv.appendChild(newDiv);
  } catch (error) {
    // clear the div
    displayDiv.innerHTML = "";

    // set the header
    h3.innerHTML = "Error";
    h3.classList.add("error-response");
    displayDiv.appendChild(h3);

    //show error text from the API response
    newDiv.innerHTML = error.response.data.message;
    newDiv.classList.add("error-response");
    displayDiv.appendChild(newDiv);
  }
}
