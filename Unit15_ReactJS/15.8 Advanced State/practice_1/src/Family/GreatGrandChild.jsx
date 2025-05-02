import React, { useContext } from 'react'
import CountContext from './CountContext';
import GreatGreatGrandChild from './GreatGreatGrandChild';

function GreatGrandChild() {
    const count = useContext(CountContext);
    return (
        <div style={{ border: '4px solid #178b21', margin: '1rem'}}>
            <p>I'm a great-grand child!</p>
            <p>Count is {count}</p>
            {/* <button onClick={add}>Increment Count</button> */}
            <GreatGreatGrandChild />
        </div>
    )
}

export default GreatGrandChild; 