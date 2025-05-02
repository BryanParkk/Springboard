import React from 'react';
import GreatGrandChild from './GreatGrandChild';

function GrandChild() {
    return (
        <div style={{ border: '4px solid #39cccc', margin: '1rem'}}>
            <p>I'm the grandchild!</p>
            <GreatGrandChild />
        </div>
    )
}

export default GrandChild;