document.addEventListener("DOMContentLoaded", function () {
  console.log("Exercise Events DOM has loaded");

  const boxContainer = document.querySelector("#box-container");
  const newBoxButton = document.querySelector("#new-box-button");
  const colorForm = document.querySelector("#color-form");
  const colorInput = document.querySelector("#color-input");
  //
  const boxes = document.querySelectorAll(".box");

  let boxColor = "#848";
  let boxCounter = 0;

  colorForm.addEventListener("click", function (e) {
    e.preventDefault();
    boxes.forEach((box) => {
      box.style.backgroundColor = colorInput.value;
    });
    boxColor = colorInput.value;
    colorInput.value = "";
  });

  function addNewBox() {
    const newBox = document.createElement("div");
    const boxID = `box-${boxCounter}`;
    // box setting
    newBox.textContent = boxID;
    newBox.className = "box";
    newBox.style.backgroundColor = boxColor;
    newBox.setAttribute("data-id", boxID);
    // mouse leave Event
    newBox.addEventListener("mouseleave", function () {
      newBox.textContent = newBox.getAttribute("data-id");
    });
    // append newBox
    document.querySelector("#box-container").appendChild(newBox);
    // increase counter
    boxCounter++;
  }
  document
    .querySelector("#new-box-button")
    .addEventListener("click", addNewBox);
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
