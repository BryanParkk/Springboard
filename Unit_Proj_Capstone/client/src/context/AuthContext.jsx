// src/context/AuthContext.jsx
import { createContext, useContext, useMemo, useState, useEffect } from 'react';

const K_USER = 'flexfit:user';
const K_TOKEN = 'flexfit:token';
// Helpers: read from either localStorage or sessionStorage safely
function readFromStorage(key) {
  try {
    const local = localStorage.getItem(key);
    if (local != null) return { value: local, source: 'local' };
    const session = sessionStorage.getItem(key);
    if (session != null) return { value: session, source: 'session' };
  } catch {}
  return { value: null, source: null };
}

function readJsonFromStorage(key) {
  const { value, source } = readFromStorage(key);
  if (!value) return { value: null, source };
  try { return { value: JSON.parse(value), source }; } catch { return { value: null, source }; }
}

function detectRemember() {
  try { return !!localStorage.getItem(K_TOKEN); } catch { return false; }
}

function writeSession(user, token, remember) {
  try {
    const target = remember ? localStorage : sessionStorage;
    const other  = remember ? sessionStorage : localStorage;
    if (user) target.setItem(K_USER, JSON.stringify(user)); else target.removeItem(K_USER);
    if (token) target.setItem(K_TOKEN, token); else target.removeItem(K_TOKEN);
    // Ensure no duplicates in the other storage
    other.removeItem(K_USER);
    other.removeItem(K_TOKEN);
  } catch {}
}

function clearAllSessions() {
  try {
    localStorage.removeItem(K_USER); localStorage.removeItem(K_TOKEN);
    sessionStorage.removeItem(K_USER); sessionStorage.removeItem(K_TOKEN);
  } catch {}
}
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [{ value: initUser }, ] = [readJsonFromStorage(K_USER)];
  const [{ value: initToken, source: initSource }] = [readFromStorage(K_TOKEN)];

  const [user, setUser] = useState(initUser);
  const [token, setToken] = useState(initToken);
  const [remember, setRemember] = useState(() => (initSource ? initSource === 'local' : detectRemember()));

  useEffect(() => {
    writeSession(user, token, remember);
  }, [user, token, remember]);

  const login = (u, t, rememberMe = false) => {
    setRemember(!!rememberMe);
    setUser(u);
    setToken(t);
  };
  const logout = () => {
    setUser(null);
    setToken(null);
    setRemember(false);
    clearAllSessions();
  };

  const value = useMemo(() => ({ user, token, remember, isAuthenticated: !!token, login, logout }), [user, token, remember]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}