import axios from 'axios';

const prodBaseURL = '/api';
const devBaseURL = `${import.meta.env.VITE_API_URL}/api`;

const baseURL = import.meta.env.PROD ? prodBaseURL : devBaseURL;

export const api = axios.create({ baseURL });

// api.interceptors.request.use(config => {
//   config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
//   return config;
// });
