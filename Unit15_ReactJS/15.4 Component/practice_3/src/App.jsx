import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(1);

  return (
    <>
      <div className="card">
        <p>Count : {count}</p>
        <button onClick={() => setCount((count) => count + 1)}>Up</button>
      </div>
    </>
  )
}

export default App;
