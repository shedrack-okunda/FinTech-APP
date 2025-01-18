import axios from "axios";

export const axio = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_BASE_URL,
});
