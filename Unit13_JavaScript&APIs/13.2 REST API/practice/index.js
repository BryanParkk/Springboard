console.log(axios);

axios.get("https://catfact.ninja/fact").then((response) => {
  console.log(response.data.fact);
});

axios.get("https://dog.ceo/api/breeds/image/random").then((response) => {
  console.log(response);
});
