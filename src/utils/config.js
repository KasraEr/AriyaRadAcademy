import axios from "axios";
import { getToken, removeToken } from "./tokenService";

const api = axios.create({
  baseURL: "https://ariyaradacademy.com",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      removeToken();
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);

export default api;
