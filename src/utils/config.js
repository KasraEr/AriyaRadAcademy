// import axios from "axios";
// import { getToken, removeToken } from "./tokenService";

// const api = axios.create({
//   baseURL: "https://api.ariyaradacademy.com",
// });

// const cache = new Map();

// api.interceptors.request.use((config) => {
//   const token = getToken();
//   if (token) {
//     config.headers["Authorization"] = `Bearer ${token}`;
//   }

//   if (config.data instanceof FormData) {
//     delete config.headers["Content-Type"];
//   } else {
//     config.headers["Content-Type"] = "application/json";
//   }

//   if (config.method === "get") {
//     const key = config.url + JSON.stringify(config.params || {});
//     if (cache.has(key)) {
//       return Promise.reject({ __fromCache: true, data: cache.get(key) });
//     }
//   }

//   return config;
// });

// api.interceptors.response.use(
//   (response) => {
//     if (response.config.method === "get") {
//       const key =
//         response.config.url + JSON.stringify(response.config.params || {});
//       cache.set(key, response.data);
//     }
//     return response;
//   },
//   (error) => {
//     if (error.__fromCache) {
//       return Promise.resolve({ data: error.data });
//     }

//     if (error.response) {
//       const status = error.response.status;
//       if (status === 401) {
//         removeToken();
//         window.location.href = "/auth";
//       } else if (status === 403) {
//         console.error("دسترسی غیرمجاز");
//       } else if (status === 404) {
//         console.error("منبع یافت نشد");
//       } else if (status >= 500) {
//         console.error("خطای سرور");
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;

import axios from "axios";
import { getToken } from "./tokenService";

let onUnauthorized = null;
export const setOnUnauthorized = (callback) => {
  onUnauthorized = callback;
};

const api = axios.create({
  baseURL: "https://api.ariyaradacademy.com",
});

const cache = new Map();

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

  if (config.method === "get") {
    const key = config.url + JSON.stringify(config.params || {});
    if (cache.has(key)) {
      return Promise.reject({ __fromCache: true, data: cache.get(key) });
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    if (response.config.method === "get") {
      const key =
        response.config.url + JSON.stringify(response.config.params || {});
      cache.set(key, response.data);
    }
    return response;
  },
  (error) => {
    if (error.__fromCache) {
      return Promise.resolve({ data: error.data });
    }

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
