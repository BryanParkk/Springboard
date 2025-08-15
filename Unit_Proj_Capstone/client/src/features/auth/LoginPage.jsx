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
    <div>
      <section class="hero">
      <div class="hero-inner">
        <span class="eyebrow">🚀 Ready to Transform?</span>
        <h1 class="headline"><span class="gradient-text">Join Now</span> <i>& Level Up Your Fitness</i></h1>
        <p class="sub">Your goals, our mission — start your journey today.</p>

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
        <div class="cta-row">
           <p className="signup-msg"> 
            <Link
              to={`/signup?postLoginPath=${encodeURIComponent(postLoginPath)}`}
              className="btn btn-primary"
            >
              Start Your Journey with FlexFit!
            </Link>
          </p>
          <a class="btn btn-ghost" href="#learn">Learn More</a>
        </div>

        <ul class="usp">
          <li><span class="badge">Personalized Plans</span></li>
          <li><span class="badge">Progress Tracker</span></li>
          <li><span class="badge">Community Challenges</span></li>
        </ul>
      </div>
    </section>
</div>
  );
}