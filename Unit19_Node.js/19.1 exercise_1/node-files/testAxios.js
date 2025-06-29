const axios = require("axios");

axios
  .get("https://example.com")
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error("Error", error);
  });
