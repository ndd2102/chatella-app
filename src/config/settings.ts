import axios, { AxiosInstance } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
  }
  return config;
});
