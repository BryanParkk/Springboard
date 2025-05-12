import React, { useState } from 'react'

    const UserForm = () => {
        const initialState = {
            username: "",
            email: "",
            password: ""
        }
    const [formData, setFormData] = useState(initialState);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    }
    // const handleChange = (e) => {
    //     setUsername(e.target.value)
    // }

    // const handleEmailChange = (e) => {
    //     setEmail(e.target.value)
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { username, email, password } = formData;
        alert(`Created user, ${username} w/ email ${email} w/ password ${password}`) 
        setFormData(initialState);
    }

    
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username </label>
            <input 
                id="username" 
                type="text" 
                name="username"
                placeholder="Enter your username" 
                value={formData.username} 
                onChange={handleChange} />
            <br></br>

            <label htmlFor="email">Email </label>
            <input 
                id="email" 
                type="email"
                name="email"
                placeholder="Your Email address here" 
                value={formData.email} 
                onChange={handleChange} /> 
            <br></br>

            <label htmlFor="password">Password </label>
            <input 
                id="password" 
                type="password"
                name="password"
                placeholder="Your password here" 
                value={formData.password} 
                onChange={handleChange} /> 
            <button>Add me to list!!@</button>
        </form>
    )
}

export default UserForm;
