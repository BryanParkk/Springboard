// - 🔍 Continuously monitoring the space station conditions.
// - 🗓️ Scheduling several one-time tasks.
// - 🚀 Executing a thrilling countdown to a rocket launch.

// Task 1: Declare The Task Array and The Interval ID
// TODO: Begin by declaring an array to hold your one-time tasks (`oneTimeTasks`) and variables for any interval IDs you'll need for continuous tasks (`monitoringTaskId`).
let oneTimeTasks = []; // one-time tasks를 저장할 배열
let monitoringTaskId = null; // 모니터링 인터벌 ID를 저장할 변수

// Task 2: Add One-Time Task Function
function addOneTimeTask(func, delay) {
  // TODO: Write a function named `addOneTimeTask` that accepts a function (`func`) and a delay (`delay`) as parameters. This function should add an object containing both parameters into the `oneTimeTasks` array.
  oneTimeTasks.push({ func, delay }); // 작업과 딜레이를 객체 형태로 배열에 추가
}

// Task 3: Run One-Time Tasks Function
function runOneTimeTasks() {
  // TODO: Create a function named `runOneTimeTasks` that iterates over the `oneTimeTasks` array and uses `setTimeout` to schedule each task according to its delay.
  oneTimeTasks.forEach((task) => {
    setTimeout(task.func, task.delay); // 각 작업을 딜레이 후에 실행
  });
}

// Task 4: Start Monitoring Function
function startMonitoring() {
  // TODO: Write a function named `startMonitoring` that uses `setInterval` to simulate continuous monitoring. This function should print a message every few seconds and store the interval ID in `monitoringTaskId`.
  monitoringTaskId = setInterval(() => {
    console.log("Monitoring space station conditions... 🌌"); // 2초마다 모니터링 메시지 출력
  }, 2000);
}

// Task 5: Stop Monitoring Function
function stopMonitoring() {
  // TODO: Implement a function named `stopMonitoring` that stops the continuous monitoring by using `clearInterval` on `monitoringTaskId`.
  if (monitoringTaskId !== null) {
    clearInterval(monitoringTaskId); // 모니터링 중지
    console.log("Monitoring stopped. 🛑");
  }
}

// Task 6: Start Countdown Function
function startCountdown(duration) {
  // TODO: Create a function named `startCountdown` that takes a duration parameter. Use `setInterval` to decrease the countdown every second and print the remaining time. Use `clearInterval` to stop the countdown when it reaches zero, printing a "Liftoff!" message.
  let timeLeft = duration;
  const countdownId = setInterval(() => {
    if (timeLeft > 0) {
      console.log(`Countdown: ${timeLeft} seconds remaining...`); // 남은 시간 출력
      timeLeft--;
    } else {
      console.log("Liftoff! 🚀"); // 카운트다운 완료 후 출력
      clearInterval(countdownId); // 카운트다운 중지
    }
  }, 1000); // 1초마다 남은 시간 출력
}

// Task 7: Schedule Pre-Launch Activities and Launch
function scheduleMission() {
  // TODO: Use the functions you've created to schedule the pre-launch system check, start and stop monitoring, and execute the countdown. Make sure to adjust the delays appropriately to simulate a real mission timeline.
  console.log("Mission Start!");

  // 시스템 점검 작업 예약
  addOneTimeTask(() => console.log("System check complete. ✅"), 3000);

  // 모니터링 시작 작업 예약
  addOneTimeTask(() => startMonitoring(), 4000);

  // 모니터링 종료 작업 예약
  addOneTimeTask(() => stopMonitoring(), 10000);

  // 카운트다운 시작 작업 예약
  addOneTimeTask(() => startCountdown(5), 11000);

  // 예약된 모든 작업 실행
  runOneTimeTasks();
}

scheduleMission(); // Starts the mission.
