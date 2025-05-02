import React, { useContext } from 'react'
import CountContext from './CountContext';

function GrandGrandChild() {
    const counts = useContext(CountContext);

    return (
        <div style={{ border: '4px soild #7fdbff', margin: '1rem'}}>
            <p>I'm a great-grand child!</p>
            <p>Count is {count}</p>
            {/* <button onClick={add}>Increment Count</button> */}

        </div>
    )
}

export default GrandGrandChild;