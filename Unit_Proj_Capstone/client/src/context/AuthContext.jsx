import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem('flexfit:user');
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const login = (email) => {
    const u = { email };
    setUser(u);
    localStorage.setItem('flexfit:user', JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('flexfit:user');
  };

  const value = useMemo(() => ({ user, isAuthenticated: !!user, login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}