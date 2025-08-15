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

    if (!name || !email || !password || !confirm) {
      return setError('Please fill all required fields.');
    }
    if (password.length < 8) {
      return setError('Password must be at least 8 characters.');
    }
    if (password !== confirm) {
      return setError('Passwords do not match.');
    }

    try {
      setLoading(true);
      await api.post('/api/auth/register', { email, password, name });
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
    <div>
      <section className="hero">
        <div className="hero-inner">
          <span className="eyebrow">🚀 Ready to Transform?</span>
          <h1 className="headline">
            <span className="gradient-text">Create Account</span> & Join the Community
          </h1>
          <p className="sub">Your goals, our mission — start your journey today.</p>

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
              autoComplete="email"
            />
            <input
              className="login-input"
              type="password"
              placeholder="Password (min 8 chars)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
            <input
              className="login-input"
              type="password"
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              autoComplete="new-password"
            />

            <button className="login-button" type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create account'}
            </button>
          </form>

          {error && <p className="login-error">{error}</p>}

          <div className="cta-row" style={{ justifyContent: 'left', paddingLeft: '5px' }}>
            <p className="signup-msg" style={{ margin: 0 }}>
              Already have an account?{' '}
              <Link
                to={`/login?postLoginPath=${encodeURIComponent(postLoginPath)}`}
                className="btn btn-ghost"
                style={{ marginLeft: 6 }}
              >
                Log in
              </Link>
            </p>
          </div>

          <ul className="usp">
            <li><span className="badge">Personalized Plans</span></li>
            <li><span className="badge">Progress Tracker</span></li>
            <li><span className="badge">Community Challenges</span></li>
          </ul>
        </div>
      </section>
    </div>
  );
}