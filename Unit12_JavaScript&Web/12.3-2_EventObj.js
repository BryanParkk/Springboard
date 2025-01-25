const p = document.querySelector("p");

p.addEventListener("click", function (e) {
  console.log(e.type);
});
p.addEventListener("mousedown", function (e) {
  console.log(e.type);
});
p.addEventListener("mouseup", function (e) {
  console.log(e.type);
});

////
const key_press = document.querySelector("h2");
key_press.addEventListener("keypress", function (event) {
  if (event.key === "a") {
    alert("'a' is pressed!");
  }
});

document.addEventListener("keypress", function (e) {
  console.log(e.key);
});

document.addEventListener("keydown", function (e) {
  console.log(e.key);
});
