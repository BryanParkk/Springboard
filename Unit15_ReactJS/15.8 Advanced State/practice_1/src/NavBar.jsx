import React, { useContext } from 'react'
import ThemeContext from './ThemeContext';

const NavBar = () => {
    const { color, toggleColor } = useContext(ThemeContext);

    return (
        <nav style = {{backgroundColor: color}}>
            <span>Web Site</span> <p></p>
            <button onClick={toggleColor}>Toggle Theme</button>
        </nav>
    )
}

export default NavBar;