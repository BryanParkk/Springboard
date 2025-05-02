import React, { useState, useContext } from 'react';
import GrandChild from './GrandChild';
import CounterContext from './CountContext';
import ThemeContext from '../ThemeContext';

function Child() {
    const [count, setCount] = useState(0);
    const { color } = useContext(ThemeContext);
    const increment = () => {
        setCount(count => count + 1)
    }
    return (
        <CounterContext.Provider value={ {count, increment} }>
            <div style={{border: '4px solid #0074D9', margin: '1rem', width: '500px'}}>
                <p>I'm the child!</p>
                <p>I "own" count, It is: {count}</p>
                <button style={{color}} onClick={increment}>Add to count</button>
                <GrandChild />
            </div>
        </CounterContext.Provider>
    )
}

export default Child;