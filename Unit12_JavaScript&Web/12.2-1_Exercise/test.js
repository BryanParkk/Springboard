document.addEventListener("DOMContentLoaded", function ()
{
	testAllTasks();
});

function testAllTasks ()
{
	testTask1();
	testTask2();
	testTask3();
	testTask4();
	testTask5();
	testTask6();
	testTask7();
	testTask8();
	testTask9();
}

function updateResult (taskNumber, passed)
{
	const resultElement = document.getElementById(`test-result-${taskNumber}`);
	const status = passed ? "Passed" : "Failed";
	const symbol = passed ? "✅" : "❌";

	if (resultElement)
	{
		resultElement.textContent = symbol;
	}

	console.log(`Task ${taskNumber}:`, status);
}

function testTask1 ()
{
	const passed = document.getElementById("task1").innerText === "Changed using 'innerText'.";
	updateResult(1, passed);
}

function testTask2 ()
{
	const passed = document.getElementById("task2").innerHTML.includes("</button>");
	updateResult(2, passed);
}

function testTask3 ()
{
	const bgColor = window.getComputedStyle(document.body).backgroundColor;
	const passed = bgColor === "rgb(35, 35, 35)";
	updateResult(3, passed);
}

function testTask4 ()
{
	const items = document.querySelectorAll(".item");
	const passed = Array.from(items).every(item => item.style.border !== "");
	updateResult(4, passed);
}

function testTask5 ()
{
	const passed = document.getElementById("task5").href.includes("https://www.springboard.com/");
	updateResult(5, passed);
}

function testTask6 ()
{
	const passed = document.getElementById("task6").value === "DOM Master";
	updateResult(6, passed);
}

function testTask7 ()
{
	const passed = document.getElementById("task7").classList.contains("new-class");
	updateResult(7, passed);
}

function testTask8 ()
{
	const task8Children = document.getElementById("task8").children;
	const passed = task8Children.length > 0 && task8Children[0].tagName === "BUTTON";
	updateResult(8, passed);
}

function testTask9 ()
{
	const passed = !document.getElementById("task9");
	updateResult(9, passed);
}
