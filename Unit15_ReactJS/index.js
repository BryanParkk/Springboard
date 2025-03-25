// Front End Frameworks
// - Larger JS libraries , methods
// - provide "blueprint" for apps
// - provide for code re-use, templating of HTML
// - Opinionated, -> How you should design a JS app

// Popular Front end Frameworks
// - Angular , Ember, Vue , React

// const MovieList = () => {
//   return (
//     <ul>
//       <li>Big fish</li>
//       <li>Terminator 2</li>
//       <li>Diehard 3</li>
//     </ul>
//   );
// };

// const App = () => {
//   return (
//     <div>
//       <h1>App component!</h1>
//       <MovieList />
//     </div>
//   );
// };

// ReactDOM.render(<App />, document.getElementById("root"));

function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i);
  }
}
repeat(3, console.log);

//
function greet(name) {
  console.log("Hello, " + name);
}

function processUserInput(callback) {
  var name = "John";
  callback(name); // 콜백 함수 호출
}

processUserInput(greet); // "Hello, John"

const favFood = ["kimchi", "noodle", "mandoo", "bulgogi"];

favFood.forEach((food, idx) => {
  console.log(`${idx}: ${food} is my favorite food`);
});

const favHobby = ["ski", "exercise", "golf", "pingpong", "google", "samsung"];

const myHobby = favHobby.map((hobby, idx) => {
  idx++;
  if (idx == 1) {
    console.log(`${hobby} is my ${idx}st my favorite hobby`);
  } else if (idx == 2) {
    console.log(`${hobby} is my ${idx}nd my favorite hobby`);
  } else if (idx == 3) {
    console.log(`${hobby} is my ${idx}rd my favorite hobby`);
  } else {
    console.log(`${hobby} is my ${idx}th my favorite hobby`);
  }
});
