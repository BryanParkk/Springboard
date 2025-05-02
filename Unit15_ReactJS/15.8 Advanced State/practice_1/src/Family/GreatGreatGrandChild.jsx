import React, { useContext } from 'react'
import CountContext from './CountContext';

function GreatGreatGrandChild() {
    const count = useContext(CountContext);
    return (
        <div style={{ border: '4px solid #a2cc39', margin: '1rem'}}>
            <p>I'm a great-great-grand child!</p>
            <p>I also consume count:  {count}</p>
            {/* <button onClick={add}>Increment Count</button> */}

        </div>
    )
}

export default GreatGreatGrandChild; 