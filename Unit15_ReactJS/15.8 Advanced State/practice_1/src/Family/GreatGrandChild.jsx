import React, { useContext } from 'react'
import CountContext from './CountContext';
import GreatGreatGrandChild from './GreatGreatGrandChild';

function GreatGrandChild() {
    const { count, increment } = useContext(CountContext);
    return (
        <div style={{ border: '4px solid #178b21', margin: '1rem'}}>
            <p>I'm a great-grand child!</p>
            <p>Count is {count}</p>
            {/* <button onClick={add}>Increment Count</button> */}
            <button onClick={increment}>Increment</button>
            <GreatGreatGrandChild />
        </div>
    )
}

export default GreatGrandChild; 