import axios from 'axios';

console.log('VITE_API_URL =', import.meta.env.VITE_API_URL);

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/`,
});

// api.interceptors.request.use(config => {
//   config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
//   return config;
// });
