// const preferences = {
//   fontSize: "18px",
//   favColor: "teal",
// };

// const { setServers } = require("dns");

//in
// // localStorage.setItem("preferences", preferences);
// localStorage.setItem("preferences", JSON.stringify(preference''''''''''''''''''''''''''''''''''
//
//
//

const toggleSwitch = document.querySelector('input[type="checkbox"]');

if (localStorage.getItem("darkModeEnabled") == "true") {
  document.body.className = "dark";
  toggleSwitch.checked = true;
}

toggleSwitch.addEventListener("click", function (e) {
  const checked = toggleSwitch.checked;
  document.body.className = checked ? "dark" : "";
  localStorage.setItem("darkModeEnabled", checked);
});
