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

// Vite: import.meta.env.VITE_API_URL 사용 (배포에서 세팅), 없으면 상대경로(로컬 프록시)
const baseURL = import.meta.env.VITE_API_URL || "/";
const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("flexfit:token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
