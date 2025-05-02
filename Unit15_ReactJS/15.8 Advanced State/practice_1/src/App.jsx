import React, { useState } from 'react';
import Child from './Family/Child'
import './App.css'
import ThemeProvider from './ThemeProvider'
import NavBar from './NavBar'

function App() {
  const [themeColor, setThemeColor] = useState('purple')
  const toggleTheme = () => {
    setThemeColor(color => color === 'purple' ? 'teal' : 'purple')
  }
  return (
    <>
      <ThemeProvider>
        <NavBar />
        <Child /> 
     </ThemeProvider>
    </>
  )
}

export default App
