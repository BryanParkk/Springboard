// src/api/client.js
import axios from "axios";
const api = axios.create({ baseURL: "/" }); // Vite 프록시 사용
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("flexfit:token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export default api;
