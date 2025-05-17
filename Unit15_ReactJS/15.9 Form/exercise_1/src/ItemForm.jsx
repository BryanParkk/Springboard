import React, { useState } from 'react'

    const ItemForm = () => {
        const initialState = {
        name: "",
        quantity: "",
        purpose: ''
        }
    const [formData, setFormData] = useState(initialState);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    }

    const handleSubmit = e => {
        e.preventDefault();
        const { name, qty, purpose } = FormData;
        alert(`name: ${name}, qty: ${qty}, purpose: ${purpose}`);
        setFormData(initialState);
    }

    return (
        <div>
            <h3>Spacecraft Builder</h3>
            <p>Add an Item to the Inventory</p>
            <form onSubmit={handleSubmit}>
                <input className="input-text"
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange} />
                
                <input className="input-text"
                    id="quantity"
                    type="text"
                    name="quantity"
                    placeholder="Quantity"
                    value={formData.quantity}
                    onChange={handleChange} />
                
                <textarea className="input-text"
                    id="purpose"
                    name="purpose"
                    placeholder="Purpose"
                    value={formData.purpose}
                    onChange={handleChange} />
                
                <label className="label-agree">
                    <input
                        id="agreement"
                        type="checkbox"
                        name="agreement"
                        checked={formData.agreement || false}
                        onChange={handleChange} />
                    Agree to terms
                </label>
                
                <button>Add</button>
            </form>
            <h3>Inventory</h3>
        </div>
    )
    }

export default ItemForm;