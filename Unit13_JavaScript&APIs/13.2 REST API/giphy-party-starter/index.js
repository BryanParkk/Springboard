// look back at the <readme.md> file for some hints //
// working API key //
const giphyApiKey = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym";
//const giphyApiKey = "FlHelcE6XtABp0ZEAdRkxXqDkI4tcb1g";
const search_button = document.getElementById("search_button");
const search_input = document.getElementById("search_input");
const displayDiv = document.getElementById("gifs");
const remove_button = document.getElementById("remove_button");
// async function giphyRequest() {
//   const response = await axios.get(
//     `http://api.giphy.com/v1/gifs/trending?api_key=${giphyApiKey}&limit=50`
//   );
//   console.log(response);
//   //   console.log(typeof response.status, response.status);
//   //   console.log(typeof response.data, response.data);
//   //   console.log(typeof response.data.data, response.data.data);
//   //   console.log(typeof response.data.data[0], response.data.data[0]);
//   //   console.log(response.data.data.length);
//   //   console.log(response.data.data[0].rating)
// }

search_button.addEventListener("click", function (event) {
  event.preventDefault();
  console.log("give me gif!");
  const search_term = document.getElementById("search_term").value;
  let newDiv = document.createElement("div");
  getGifs(search_term, newDiv);
});

async function getGifs(search_term, newDiv) {
  try {
    const response = await axios.get(
      `http://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&limit=1&q=${search_term}`
    );

    if (response.data.data.length > 0) {
      const gifUrl = response.data.data[0].images.fixed_height.url;
      newDiv.innerHTML = `<img src="${gifUrl}" alt="gif">`;
      displayDiv.appendChild(newDiv);
    } else {
      newDiv.innerHTML = "No GIFs found.";
      displayDiv.appendChild(newDiv);
    }
  } catch (err) {
    newDiv.innerHTML = "Error fetching GIFs.";
    displayDiv.appendChild(newDiv);
  }
}

remove_button.addEventListener("click", function () {
  location.reload();
});
