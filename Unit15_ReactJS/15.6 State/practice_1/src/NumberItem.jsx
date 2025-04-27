import React from 'react';

const NumberItem = ( {number, remove}) => {
    const handleRemove = () => {
        remove(number)
    }

    return (
        <li>
            <button onClick={handleRemove}>{number}</button>
        </li>
    )
}

export default NumberItem;