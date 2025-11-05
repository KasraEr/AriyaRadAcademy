import axios from "axios";
import { getToken } from "./tokenService";

let onUnauthorized = null;
export const setOnUnauthorized = (callback) => {
  onUnauthorized = callback;
};

const api = axios.create({
  baseURL: "https://api.ariyaradacademy.com",
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  } else {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        if (onUnauthorized) {
          onUnauthorized();
        }
      } else if (status === 403) {
        console.error("دسترسی غیرمجاز");
      } else if (status === 404) {
        console.error("منبع یافت نشد");
      } else if (status >= 500) {
        console.error("خطای سرور");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
