//Dynamic Imports
//theme management
export function setLightTheme() {
  console.log("Light theme has been applied now.");
  document.body.style.backgroundColor = "White";
  document.body.style.color = "Black";
}

export function setDarkTheme() {
  console.log("Dark theme has been applied now.");
  document.body.style.backgroundColor = "Black";
  document.body.style.color = "White";
}
