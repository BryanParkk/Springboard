import React from 'react';
import GrandGrandChild from './GrandGrandChild';

function GrandChild() {
    return (
        <div style={{ border: '4px solid #39cccc', margin: '1rem'}}>
            <p>I'm the grandchild!</p>
            <GrandGrandChild />
        </div>
    )
}

export default GrandChild;