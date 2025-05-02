import React, { useContext } from 'react'
import CountContext from './CountContext';
import ThemeContext from '../ThemeContext';

function GreatGreatGrandChild() {
    const { count, increment } = useContext(CountContext);
    const { color } = useContext(ThemeContext);

    return (
        <div style={{ border: '4px solid #a2cc39', margin: '1rem'}}>
            <p>I'm a great-great-grand child!</p>
            <p>I also consume count:  {count}</p>
            <button style={{color}} onClick={increment}>Increment</button>
            {/* <button onClick={add}>Increment Count</button> */}

        </div>
    )
}

export default GreatGreatGrandChild; 