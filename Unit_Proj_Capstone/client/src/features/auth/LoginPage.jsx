// LoginPageFit.jsx
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import api from '../../api/client.js';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import '../../styles/layout/LoginPage.css';
import googleImg from '../../assets/google-black.svg'
import appleImg from '../../assets/apple-black.svg'
import logoImg from '../../assets/logo_big_flexfit.png';

export default function LoginPageFit() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchParams = new URLSearchParams(location.search);
  const postLoginPath = searchParams.get('postLoginPath') || '/dashboard';

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/api/auth/login', { email, password });
      login(res.data.user, res.data.token);
      navigate(postLoginPath, { replace: true });
    } catch (err) {
      if (err?.response?.status === 401) setError('Incorrect email or password.');
      else setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="loginFit">
      {/* floating brand */}
      <header className="fit-brand">
        <div className="logo">🏋️</div>
        <strong>FlexFit</strong>
      </header>

      <div className="fit-shell">
        {/* left: hero / right: form */}
        <aside className="fit-hero" aria-hidden>
          <div className="grid-overlay" />
            <img className="brand-mark" src={logoImg} alt="FlexFit" />
          <div className="hero-copy">
            <h1>Train. Track. Transform.</h1>
            <p>Build routines, log sets, and watch your progress climb.</p>
          </div>
        </aside>

        <main className="fit-card">
          <div className="fit-head">
            <h2>FlexFit — built for progress.</h2>
            <p>Sign in to continue your program.</p>
          </div>

          {error && <div className="fit-alert" role="alert">{error}</div>}

          <form className="fit-form" onSubmit={onSubmit}>
            <label className="fit-field">
              <input
                type="email"
                value={email}
                onChange={e=>setEmail(e.target.value)}
                placeholder=" "
                autoComplete="email"
                required
              />
              <span>Email</span>
            </label>

            <label className="fit-field">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e=>setPassword(e.target.value)}
                placeholder=" "
                autoComplete="current-password"
                required
              />
              <span>Password</span>
              <button
                type="button"
                className="pw-toggle"
                aria-label={showPw ? "Hide password" : "Show password"}
                onClick={()=>setShowPw(s=>!s)}
              >
                {showPw ? '🙈' : '👁️'}
              </button>
            </label>

            <div className="row between">
              <label className="fit-check">
                <input type="checkbox" />
                <i /><span>Remember me</span>
              </label>
              <a className="fit-link" href="#">Forgot password?</a>
            </div>

            <button className="fit-btn fit-btn--primary" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in'}
            </button>

            <div className="fit-or"><span>or</span></div>

            <div className="fit-social">
              <button type="button" className="fit-btn fit-btn--ghost" disabled={loading}>
                <img alt="Google" src={googleImg} />
                Continue with Google
              </button>
              <button type="button" className="fit-btn fit-btn--ghost" disabled={loading}>
                <img alt="Apple" src={appleImg} />
                Continue with Apple
              </button>
            </div>
          </form>

          <p className="fit-hint">
            Don’t have an account?{" "}
            <Link className="fit-link" to={`/signup?postLoginPath=${encodeURIComponent(postLoginPath)}`}>Sign up</Link>
          </p>
        </main>
      </div>
    </div>
  );
}