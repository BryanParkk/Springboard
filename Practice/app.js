let userInput = window.prompt("Hello, Input your name");

if (userInput == null) {
  window.alert("You just canceled.");
} else {
  window.alert(`Hello, ${userInput}. :)`);
}
