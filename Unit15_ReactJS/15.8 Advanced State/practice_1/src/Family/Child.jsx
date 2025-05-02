import React, { useState } from 'react';
import GrandChild from './GrandChild';
import CounterContext from './CountContext';

function Child() {
    const [count, setCount] = useState(0);
    const addToCount = () => {
        setCount(count => count + 1)
    }
    return (
        <CounterContext.Provider value={count}>
            <div style={{border: '4px solid #0074D9', margin: '1rem', width: '500px'}}>
                <p>I'm the child!</p>
                <p>I "own" count, It is: {count}</p>
                <GrandChild />
            </div>
        </CounterContext.Provider>
    )
}

export default Child;