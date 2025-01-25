document.addEventListener("DOMContentLoaded", function () {
  console.log("Exercise Events DOM has loaded");

  const boxContainer = document.querySelector("#box-container");
  const newBoxButton = document.querySelector("#new-box-button");
  const colorForm = document.querySelector("#color-form");
  const colorInput = document.querySelector("#color-input");
  //
  const boxes = document.querySelectorAll(".box");

  let boxColor = "#848";
  let counter = 0;

  colorForm.addEventListener("click", function (e) {
    e.preventDefault();
    boxes.forEach((box) => {
      box.style.backgroundColor = colorInput.value;
    });
    boxColor = colorInput.value;
    colorInput.value = "";
  });

  newBoxButton.addEventListener("click", function (e) {
    e.preventDefault();
    document.appendChild("div");
    newDiv.innerText = "HelloWorld";
  });
});

// form.addEventListener("submit", function (e) {
//     e.preventDefault();
//     console.log(input.value);
//     const newFriend = document.createElement("li");
//     const removeBtn = document.createElement("button");
//     removeBtn.innerText = "UnFriend";
//     newFriend.innerText = input.value + " ";
//     newFriend.appendChild(removeBtn);
//     input.value = "";
//     friendList.appendChild(newFriend);
//   });
