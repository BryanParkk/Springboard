import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../src/context/AuthContext.jsx';

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    const postLoginPath = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?postLoginPath=${postLoginPath}`} replace />;
  }
  return <Outlet />;
}