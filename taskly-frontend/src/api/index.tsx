import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL;

export const instance = axios.create({
  baseURL: API_BASE_URL,
});

instance.defaults.headers.common['Content-Type'] = 'application/json';
