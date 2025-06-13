import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/layout/LoginPage.css'

export default function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const searchParams = new URLSearchParams(location.search);
    const postLoginPath = searchParams.get('postLoginPath') || '/dashboard';
    
    const handleLogin = (e) => {
        e.preventDefault();

        const dummyEmail = 'test@flexfit.com';
        const dummyPassword = '1234!@#$';

        if (email === dummyEmail && password === dummyPassword) {
            navigate(postLoginPath);
        } else {
            setError('Email or password is incorrect.');
        }
    }

    return (
       <div className="login-container">
            <div className="login-title-group">
                <h1 className="login-title share-tech-regular">
                    <span className="flex-text">Flex</span>
                    <span className="fit-text">Fit</span>
                </h1>
                <p className="login-subtitle">Track. Improve. Repeat.</p>
            </div>
            <form className="login-form" onSubmit={handleLogin}>
                <input
                    className="login-input"
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className="login-input"
                    type="password"
                    placeholder="Pasword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button className="login-button" type="submit">
                    Let’s Go to Workout
                </button>
            </form>
            {error && <p className="login-error">{error}</p>}
       </div>
    )
}