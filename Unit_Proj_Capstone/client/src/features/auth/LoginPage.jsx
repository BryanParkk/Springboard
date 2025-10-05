import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import api from '../../api/client';
import { useNavigate, useLocation, Link } from 'react-router-dom';
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
    <div>
      <section className="hero">
      <div className="hero-inner">
        <span className="eyebrow">🚀 Ready to Transform?</span>
        <h1 className="headline"><span className="gradient-text">Join Now</span> <i>& Level Up Your Fitness</i></h1>
        <p className="sub">Your goals, our mission — start your journey today.</p>

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
          <button className="login-button" type="submit">Let’s Go to Workout
          </button>
        </form>

        {error && <p className="login-error">{error}</p>} 
        <div className="cta-row">
           <p className="signup-msg"> 
            <Link
              to={`/signup?postLoginPath=${encodeURIComponent(postLoginPath)}`}
              className="btn btn-primary"
            >
              Sign up and Start Your Journey Today!
            </Link>
          </p>
          {/* <a className="btn" href="#learn">Learn More</a> */}
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