import { useState } from 'react'
import './App.css'

// function App() {
//   const [number, setNumber] = useState(0)

//   const increase = () => {
//     setNumber(number + 1);
//   }

//   const increaseAsync = () => {
//     setTimeout(() => {
//       setNumber((prev) => prev + 1);
//     }, 2000)
//   }

//   return (
//     <div>
//       <button onClick={increase}>Increase</button>
//       <button onClick={increaseAsync}>Increase Async</button>
//       <h1>{number}</h1>
//     </div>
//   )
// }

// export default App


function App() {
  const [input, setInput] = useState("");
  const [user, setUser] = useState({
    name: "john",
    email: "john@gmail.com",
    images: ["profile.png", "cover.png"],
  });

  const changeUser = () => {
    setUser((prev) => ({...prev, name:input}));
  };

  return(
    <div>
      <h2> User: </h2>
      <input
        onChange={(e) => setInput(e.target.value)}
        placeholder="enter a new name"
      />
      <button onClick={changeUser}>Change username</button>
      <span>Username is: {user.name}</span>
    </div>
  )
}

export default App