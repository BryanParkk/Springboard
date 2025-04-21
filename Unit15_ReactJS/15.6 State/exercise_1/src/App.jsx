import { useState } from 'react'
import './App.css'
import Simple from './SimpleCounter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Simple />
      <Simple />
      <Simple />
    </>
  )
}

export default App
