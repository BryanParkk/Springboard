import React, { useState } from 'react'

    const UserForm = () => {
        const [username, setUsername] = useState("");
        const [email, setEmail] = useState("");
        const [formData, setFormData] = useState({
            username: "",
            email: ""
        })

    const handleChange = e => {
        console.log(e.target.name);
        console.log(e.target.value);
    }

    // const handleChange = (e) => {
    //     setUsername(e.target.value)
    // }

    // const handleEmailChange = (e) => {
    //     setEmail(e.target.value)
    // }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     alert(`Created user, ${username} w/ email ${email}`)
    //     setUsername("");
    //     setEmail("");
    // }

    
    return (
        // <form onSubmit={handleSubmit}>
        <form>
            <label htmlFor="username">Username</label>
            <input 
                id="username" 
                type="text" 
                name="username"
                placeholder="Enter your username" 
                value={formData.username} 
                onChange={handleChange} />
            <br></br>
            <label htmlFor="email">Email</label>
            <input 
                id="email" 
                type="email"
                name="email"
                placeholder="Your Email address here" 
                value={formData.email} 
                onChange={handleChange} />
            <button>Add me to list!!@</button>
        </form>
    )
}

export default UserForm;
