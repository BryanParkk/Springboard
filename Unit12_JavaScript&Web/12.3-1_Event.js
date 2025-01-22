//Event

//When a _______ event occurs on ________ elelment, do this _________
//event: click, mouseover, mouseout, keydown, keyup, submit, etc.
//element: button, input, form, etc.
//action: change color, hide, show, etc.
function makeBody(color) {
  document.body.style.backgroundColor = color;
}

const btn = document.querySelector("#teal");
btn.onclick = function () {
  makeBody("teal");
};

//Event Listener
const violetBtn = document.querySelector("#violet");
violetBtn.addEventListener("click", function () {
  makeBody("violet");
});

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM CONTENT LOADED");
});
window.addEventListener("load", function () {
  console.log("WINDOW LOADED");
});
//
