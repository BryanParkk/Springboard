// src/context/AuthContext.jsx
import { createContext, useContext, useMemo, useState, useEffect } from 'react';

const K_USER = 'flexfit:user';
const K_TOKEN = 'flexfit:token';
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { const raw = localStorage.getItem(K_USER); return raw ? JSON.parse(raw) : null; } catch { return null; }
  });
  const [token, setToken] = useState(() => {
    try { return localStorage.getItem(K_TOKEN) || null; } catch { return null; }
  });

  useEffect(() => {
    try {
      user ? localStorage.setItem(K_USER, JSON.stringify(user)) : localStorage.removeItem(K_USER);
      token ? localStorage.setItem(K_TOKEN, token) : localStorage.removeItem(K_TOKEN);
    } catch {}
  }, [user, token]);

  const login = (u, t) => { setUser(u); setToken(t); };
  const logout = () => { setUser(null); setToken(null); };

  const value = useMemo(() => ({ user, token, isAuthenticated: !!token, login, logout }), [user, token]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}