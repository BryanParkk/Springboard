// ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../src/context/AuthContext.jsx';

export default function ProtectedRoute() {
  const { isAuthenticated, booting } = useAuth();
  const loc = useLocation();
  if (booting) return <div style={{padding:16}}>Loading…</div>;
  if (!isAuthenticated) {
    const back = encodeURIComponent(loc.pathname + loc.search);
    return <Navigate to={`/login?postLoginPath=${back}`} replace />;
  }
  return <Outlet />;
}