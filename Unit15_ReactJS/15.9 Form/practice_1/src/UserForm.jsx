import React, { useState } from 'react'

const UserForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const handleChange = (e) => {
        setUsername(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Created user, ${username} w/ email ${email}`)
        setUsername("");
        setEmail("");
    }

    
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input id="username" type="text" placeholder="Enter your username" value={username} onChange={handleChange} />
            <br></br>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="Your Email address here" value={email} onChange={handleEmailChange} />
            <button>Add me to list!!@</button>
        </form>
    )
}

export default UserForm;