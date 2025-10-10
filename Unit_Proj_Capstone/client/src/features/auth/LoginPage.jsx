// LoginPageFit.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import api from '../../api/client.js';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import '../../styles/layout/LoginPage.css';
import googleImg from '../../assets/google-black.svg'
import appleImg from '../../assets/apple-black.svg'
import bigLogoImg from '../../assets/logo_big_flexfit.png';
import smallLogoImg from "../../assets/profile_sample.png";
import loginMainImg from "../../assets/login_main.jpg";

// Persist preferred email when "Remember me" is checked
const K_PREF_EMAIL = 'ff_pref_email';

export default function LoginPageFit() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load saved email on first render
  useEffect(() => {
    try {
      const saved = localStorage.getItem(K_PREF_EMAIL);
      if (saved) {
        setEmail(saved);
        setRemember(true);
      }
    } catch {}
  }, []);

  const searchParams = new URLSearchParams(location.search);
  // const postLoginPath = searchParams.get('postLoginPath') || '/dashboard';
  const postLoginPath =  '/dashboard';

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/api/auth/login', { email, password });
      // Pass remember flag so AuthContext stores token in localStorage (remember) or sessionStorage
      login(res.data.user, res.data.token, remember);
      // Persist preferred email only on successful login
      try {
        if (remember) localStorage.setItem(K_PREF_EMAIL, email || '');
        else localStorage.removeItem(K_PREF_EMAIL);
      } catch {}
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
        <img className="logo" src={smallLogoImg} alt="FlexFit" />
      </header>

      <div className="fit-shell">
        {/* left: hero / right: form */}
        <aside className="fit-hero" aria-hidden>
          <div className="grid-overlay" />
            <img className="brand-mark" src={bigLogoImg} alt="FlexFit" />
          <div className="hero-copy">
            <h1>Train. Track. Transform.</h1>
            <p>Build routines, log sets, and watch your progress climb.</p>
          </div>
        </aside>

        <main className="fit-card">
          <div className="fit-head">
            <h2>FlexFit — Your Fitness. Your Flex.</h2>
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
                <input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)} />
                <i/><span>Remember me</span>
              </label>
              {/* <a className="fit-link" href="#">Forgot password?</a> */}
            </div>

            <button className="fit-btn fit-btn--primary" disabled={loading}>
              {loading ? 'Signing in…' : 'Start Training'}
            </button>

            {/* <div className="fit-or"><span>or</span></div>

            <div className="fit-social">
              <button type="button" className="fit-btn fit-btn--ghost" disabled={loading}>
                <img alt="Google" src="https://www.svgrepo.com/show/475656/google-color.svg" />
                Continue with Google
              </button>
              <button type="button" className="fit-btn fit-btn--ghost" disabled={loading}>
                <img alt="GitHub" src="https://www.svgrepo.com/show/512317/github-142.svg" />
                Continue with GitHub
              </button>
            </div> */}
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