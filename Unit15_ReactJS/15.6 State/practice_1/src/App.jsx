import { useState } from 'react'
import './App.css'
import NumbersList from './NumbersList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
        <NumbersList />
      </div>
    </>
  )
}

export default App
