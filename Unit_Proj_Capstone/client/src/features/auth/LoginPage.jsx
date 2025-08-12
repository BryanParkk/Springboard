import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import api from '../../api/client';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/layout/LoginPage.css';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const searchParams = new URLSearchParams(location.search);
  const postLoginPath = searchParams.get('postLoginPath') || '/dashboard';

  // 1) async 추가
const handleLogin = async (e) => {
  e.preventDefault();
  setError('');

  try {
    const res = await api.post('/api/auth/login', { email, password });
    login(res.data.user, res.data.token);
    navigate(postLoginPath, { replace: true });
  } catch (err) {
    if (err.response?.status === 401) {
      setError('Incorrect account information'); 
    } else {
      setError('Something went wrong. Please try again.');
    }
  }
};

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
          placeholder="Password"
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
  );
}