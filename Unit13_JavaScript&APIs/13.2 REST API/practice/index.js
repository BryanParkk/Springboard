console.log(axios);

axios.get("https://catfact.ninja/fact").then((response) => {
  console.log(response.data.fact);
});

axios.get("https://dog.ceo/api/breeds/image/random").then((response) => {
  console.log(response.data.message);
});

axios
  .get("https://official-joke-api.appspot.com/random_joke")
  .then((response) => {
    console.log(response.data.setup);
  });

const city = "New York City";
function logCitySkyline() {
  let skyscraper = "Empire State Building";
  return "The stars over the " + skyscraper + " in " + city;
}
