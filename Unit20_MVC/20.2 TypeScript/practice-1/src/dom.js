console.log("hello");
function product(x, y) {
  return x * y;
}
console.log(product(4, 7));
console.log("bye");

const btn = document.getElementById("btn");
btn.addEventListener("click", function () {
  console.log("CLICKED");
});
