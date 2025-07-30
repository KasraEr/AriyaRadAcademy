import axios from "axios";

const api = axios.create({ baseURL: "https://ariyaradacademy.com" });

api.interceptors.request.use(
  (request) => {
    request.headers.Authorization = "";
    return request;
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
    return Promise.reject(error);
  }
);

export default api;
