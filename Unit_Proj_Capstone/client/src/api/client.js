// src/api/client.js
// import axios from "axios";
// const api = axios.create({ baseURL: "/" }); // Vite Proxy
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("flexfit:token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });
// export default api;

// src/api/client.js
import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/", // Vercel에서 반드시 절대 URL이 들어오게
});

const K_TOKEN = "flexfit:token";

api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem(K_TOKEN) || sessionStorage.getItem(K_TOKEN);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    const status = err?.response?.status;
    if (status === 401 && !location.pathname.startsWith("/login")) {
      try {
        localStorage.removeItem(K_TOKEN);
        sessionStorage.removeItem(K_TOKEN);
      } catch {}
      const back = encodeURIComponent(location.pathname + location.search);
      location.href = `/login?postLoginPath=${back}`;
    }
    return Promise.reject(err);
  }
);

export default api;
