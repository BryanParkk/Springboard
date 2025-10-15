// src/context/AuthContext.jsx
import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import api from '../api/client';

const K_USER = 'flexfit:user';
const K_TOKEN = 'flexfit:token';

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
    if (user)  target.setItem(K_USER, JSON.stringify(user)); else target.removeItem(K_USER);
    if (token) target.setItem(K_TOKEN, token);               else target.removeItem(K_TOKEN);
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
  // 초기 값 로드(remember 소스 유지)
  const [{ value: initUser }] = [readJsonFromStorage(K_USER)];
  const [{ value: initToken, source: initSource }] = [readFromStorage(K_TOKEN)];

  const [user, setUser] = useState(initUser);
  const [token, setToken] = useState(initToken);
  const [remember, setRemember] = useState(() =>
    (initSource ? initSource === 'local' : detectRemember())
  );

  // 부팅 상태: 토큰 있으면 /auth/me 검증
  const [booting, setBooting] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        if (!token) return;
        // axios 인터셉터가 Authorization 붙여주면 이 호출로 유효성만 체크
        const me = await api.get('/api/auth/me');
        // 서버가 user를 내려주면 동기화(이름/이메일 갱신 등)
        const serverUser = me.data?.user || null;
        if (serverUser) setUser((prev) => ({ ...prev, ...serverUser }));
      } catch {
        // 토큰 무효 → 모두 정리
        setUser(null);
        setToken(null);
        clearAllSessions();
      } finally {
        setBooting(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  // 상태가 바뀌면 저장소 반영
  useEffect(() => {
    writeSession(user, token, remember);
  }, [user, token, remember]);

  // 로그인/로그아웃
  const login = (u, t, rememberMe = false) => {
    setRemember(!!rememberMe);
    setUser(u || null);
    setToken(t || null);
  };
  const logout = () => {
    setUser(null);
    setToken(null);
    setRemember(false);
    clearAllSessions();
  };

  const value = useMemo(() => ({
    user,
    token,
    remember,
    isAuthenticated: !!token,
    booting,
    login,
    logout,
    setRemember, // 필요하면 외부에서 remember 토글
  }), [user, token, remember, booting]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
