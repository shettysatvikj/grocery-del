import axios from "axios";

const API = axios.create({
  baseURL: "https://grocery-del-backend1.onrender.com",
});

// ✅ Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
