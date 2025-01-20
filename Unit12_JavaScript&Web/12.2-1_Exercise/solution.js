//Task1
document.getElementById("task1").innerText = "Changed using 'innerText'.";

//Task2
document.getElementById("task2").innerHTML = "<button>Submit</button>";

//Task3
document.body.style.backgroundColor = "#232323";

//Task4
document.querySelectorAll(".item").forEach((item) => {
  item.style.border = "2px solid black";
});

//Task5
document.getElementById("task5").href = "https://www.springboard.com";

//Task6
document.getElementById("task6").value = "DOM Master";

//Task7
document.getElementById("task7").classList.add("new-class");

//Task8
const container = document.getElementById("task8");
const button = document.createElement("button");
button.innerText = "Task8";
container.append(button);

//Task9
document.getElementById("task9").remove();
