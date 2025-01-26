////////////Events Exercise
//Step.1 : dom load
document.addEventListener("DOMContentLoaded", function () {
  console.log("Exercise Events DOM has loaded");

  //Step.2 : set variable
  const boxContainer = document.querySelector("#box-container");
  const newBoxButton = document.querySelector("#new-box-button");
  const colorForm = document.querySelector("#color-form");
  const colorInput = document.querySelector("#color-input");

  //Step.3 : setting boxes
  const boxes = document.querySelectorAll(".box");
  let boxColor = "#fff";
  let boxCounter = 0;

  //Step.4 : click event and set color
  colorForm.addEventListener("click", function (e) {
    e.preventDefault();
    boxes.forEach((box) => {
      box.style.backgroundColor = colorInput.value;
    });
    boxColor = colorInput.value;
    colorInput.value = "";
  });

  //Step.5 : add box
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
  //Step.6 : click event
  document
    .querySelector("#new-box-button")
    .addEventListener("click", addNewBox);

  //Step.7 : double click Event
  document.addEventListener("dblclick", function (e) {
    if (e.target.classList.contains("box")) {
      e.target.remove();
    }
  });

  //Step.8 : coordinate
  document.addEventListener("mouseover", function (e) {
    if (e.target.classList.contains("box")) {
      e.target.textContent = "X:" + e.pageX + ", " + "Y:" + e.pageY;
    }
  });

  // Step.9
  document.addEventListener("mouseout", function (e) {
    if (e.target.classList.contains("box")) {
      const boxID = e.target.getAttribute("data-id");
      e.target.textContent = boxID;
    }
  });

  //Step.10
  document.addEventListener("keydown", function (e) {
    if (e.key === "N" || e.key === "n") {
      const activeElement = document.activeElement;
      if (activeElement && activeElement.id === "color-input") return;
      addNewBox();
    }
  });
});
