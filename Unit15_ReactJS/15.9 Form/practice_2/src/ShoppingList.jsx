import React, { useState } from 'react';
import Item from './Item'
import NewItemForm from './NewItemForm';
import { v4 as uuid } from 'uuid';

const ShoppingList = () => {
    const INITIAL_STATE = [
        { id: uuid(), name: 'Peanut Butter', qty: 2 },
        { id: uuid(), name: 'Whole Milk', qty: 3 }
    ]
    const [items, setItems] = useState(INITIAL_STATE);
    const addItem = (newItem) => {
        setItems(items => [...items, { ...newItem, id: uuid() }])
    }

    return (
        <div>
            <h3>Shopping List</h3>
            <NewItemForm addItem={addItem}></NewItemForm>
            <div>
                {items.map(({ id, name, qty}) => <Item id={id} name={name} qty={qty} key={id} />)}
            </div>
        </div>
    )
}

export default ShoppingList;