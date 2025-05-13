import React, { useState } from 'react';
import Item from './Item'
import NewItemForm from './NewItemForm';

const ShoppingList = () => {
    const INITIAL_STATE = [
        {id: 1, name: 'Peanut Butter', qty: 2},
        {id: 2, name: 'Whole Milk', qty: 3}
    ]
    const [items, setItems] = useState(INITIAL_STATE);

    return (
        <div>
            <h3>Shopping List</h3>
            <NewItemForm></NewItemForm>
            <div>
                {items.map(({ id, name, qty}) => <Item id={id} name={name} qty={qty} key={id} />)}
            </div>
        </div>
    )
}

export default ShoppingList;