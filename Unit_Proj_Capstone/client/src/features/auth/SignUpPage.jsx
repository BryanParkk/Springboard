import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import api from '../../api/client';
import { useAuth } from '../../context/AuthContext.jsx';
import '../../styles/layout/LoginPage.css';

export default function SignUpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const postLoginPath = searchParams.get('postLoginPath') || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 기본 유효성 검사
    if (!email || !password) return setError('Please fill all required fields.');
    if (password.length < 8) return setError('Password must be at least 8 characters.');
    if (password !== confirm) return setError('Passwords do not match.');

    try {
      setLoading(true);
      // 1) 가입
      await api.post('/api/auth/register', { email, password, name });
      // 2) 바로 로그인
      const res = await api.post('/api/auth/login', { email, password });
      login(res.data.user, res.data.token);
      navigate(postLoginPath, { replace: true });
    } catch (err) {
      const code = err?.response?.data?.error;
      if (code === 'EMAIL_TAKEN') setError('This email is already registered.');
      else if (code === 'MISSING_FIELDS') setError('Please fill all required fields.');
      else setError('Sign up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-title-group">
        <h1 className="login-title share-tech-regular">
          <span className="flex-text">Flex</span>
          <span className="fit-text">Fit</span>
        </h1>
        <p className="login-subtitle">Create your account</p>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="login-input"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
          placeholder="Password (min 8 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          className="login-input"
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <button className="login-button" type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create account'}
        </button>
      </form>

      {error && <p className="login-error">{error}</p>}

      <p className="signup-msg">
        Already have an account?{' '}
        <Link to={`/login?postLoginPath=${encodeURIComponent(postLoginPath)}`}>Log in</Link>
      </p>
    </div>
  );
}