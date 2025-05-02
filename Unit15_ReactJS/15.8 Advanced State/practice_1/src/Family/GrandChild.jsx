import React, { useContext } from 'react';
import CountContext from './CountContext';
import GreatGrandChild from './GreatGrandChild';

function GrandChild() {
    const count = useContext(CountContext);
    return (
        <div style={{ border: '4px solid #39cccc', margin: '1rem'}}>
            <p>I'm the grandchild!</p>
            <p>Count = {count}</p>
            <GreatGrandChild />
        </div>
    )
}

export default GrandChild;