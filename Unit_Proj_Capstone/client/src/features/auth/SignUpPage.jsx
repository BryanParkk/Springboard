import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import api from '../../api/client';
import { useAuth } from '../../context/AuthContext.jsx';
import '../../styles/layout/SignUpPage.css';
import bigLogoImg from '../../assets/logo_big_flexfit.png';
import smallLogoImg from "../../assets/profile_sample.png";

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
  // const postLoginPath = searchParams.get('postLoginPath') || '/dashboard';
  const postLoginPath =  '/dashboard';
  
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
    <div className="signupFit">
      {/* floating brand */}
      <header className="fit-brand">
        <img className="logo" src={smallLogoImg} />
      </header>

      <div className="fit-shell">
        {/* left: hero */}
        <aside className="fit-hero" aria-hidden>
          <div className="grid-overlay" />
            {/* <img className="brand-mark" src={bigLogoImg} alt="FlexFit" /> */}
          <div className="hero-copy">
            <h1>Start Strong. Stay Consistent.</h1>
            <p>Create your account and begin your transformation.</p>
          </div>
        </aside>

        {/* right: sign up card */}
        <main className="fit-card">
          <div className="fit-head">
            <h2>Create account</h2>
            <p>Join FlexFit and track every rep.</p>
          </div>

          {error && <div className="fit-alert" role="alert">{error}</div>}

          <form className="fit-form" onSubmit={handleSubmit}>
            <label className="fit-field">
              <input
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                placeholder=" "
                required
              />
              <span>Name</span>
            </label>

            <label className="fit-field">
              <input
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder=" "
                autoComplete="email"
                required
              />
              <span>Email</span>
            </label>

            <label className="fit-field">
              <input
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder=" "
                autoComplete="new-password"
                required
              />
              <span>Password (min 8 chars)</span>
            </label>

            <label className="fit-field">
              <input
                type="password"
                value={confirm}
                onChange={(e)=>setConfirm(e.target.value)}
                placeholder=" "
                autoComplete="new-password"
                required
              />
              <span>Confirm password</span>
            </label>

            <button className="fit-btn fit-btn--primary" disabled={loading}>
              {loading ? 'Creating…' : 'Create account'}
            </button>
          </form>

          <p className="fit-hint">
            Already have an account?{' '}
            <Link className="fit-link" to={`/login?postLoginPath=${encodeURIComponent(postLoginPath)}`}>
              Log in
            </Link>
          </p>
        </main>
      </div>
    </div>
  );
}
