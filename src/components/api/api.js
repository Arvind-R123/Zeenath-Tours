//export const BASE_API_URL = "http://localhost:8000/api";
export const BASE_API_URL = "https://ivmuat.seltentechnologies.com/api";
import { store } from "../../store";

import axios from "axios";

export const api = axios.create({
  baseURL: BASE_API_URL,
  // withCredentials: true, // Send cookies with requests
  // headers: {
  //   "Content-Type": "application/json",
  //   Accept: "application/json",
  // },
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth?.user?.token; // Get token from Redux
  // const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// export default api;
