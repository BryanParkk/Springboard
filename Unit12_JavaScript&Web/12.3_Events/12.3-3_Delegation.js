// const removeButtons = document.querySelectorAll("li button");
// const form = document.querySelector("#add-friend");
// const input = document.querySelector("#first-name");
// const friendList = document.querySelector("#friend-list");

// for (let btn of removeButtons) {
//   btn.addEventListener("click", function (e) {
//     e.target.parentElement.remove();
//   });
// }

// form.addEventListener("submit", function (e) {
//   e.preventDefault();
//   console.log(input.value);
//   const newFriend = document.createElement("li");
//   const removeBtn = document.createElement("button");
//   removeBtn.innerText = "UnFriend";
// //   removeBtn.addEventListener("click", function (e) {
// //     e.target.parentElement.remove();
// //   });
//   newFriend.innerText = input.value + " ";
//   newFriend.appendChild(removeBtn);
//   input.value = "";
//   friendList.appendChild(newFriend);
// });
const form = document.querySelector("#add-friend");
const input = document.querySelector("#first-name");
const friendList = document.querySelector("#friend-list");

friendList.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    e.target.parentElement.remove();
  } else if (e.target.tagName === "LI") {
    console.log("you clicked LI");
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(input.value);
  const newFriend = document.createElement("li");
  const removeBtn = document.createElement("button");
  removeBtn.innerText = "UnFriend";
  newFriend.innerText = input.value + " ";
  newFriend.appendChild(removeBtn);
  input.value = "";
  friendList.appendChild(newFriend);
});
